#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { syncToSrc } from './content-loader.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'portfolio-data');
const ARCH_DIR = path.join(DATA_DIR, 'architecture');
const SOURCES_FILE = path.join(__dirname, 'architecture-sources.json');

const args = process.argv.slice(2);
const valueOf = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};
const onlySlug = valueOf('--slug');
const dryRun = args.includes('--dry-run');
const depthOverride = valueOf('--depth') ? Number(valueOf('--depth')) : null;

const DEFAULT_EXCLUDE_DIRS = [
  '.*', 'node_modules', '__pycache__', '.venv', 'venv',
  '.pytest_cache', '.mypy_cache', '.ruff_cache', 'dist', 'build',
  '.next', '.vite', '.astro', 'target', '.idea', '.vscode', 'coverage',
  'logs', '.cache', '.turbo'
];
const DEFAULT_EXCLUDE_FILES = [
  '.env*', '*.whl', '*.pyc', '*.log', '*.swp', '*.swo', '.DS_Store',
  '*.pem', '*.key', '*.p12', '*.sqlite', '*.db', 'package-lock.json'
];
const KEY_FILE = /^(README|ARCHITECTURE|SECURITY|LICENSE|CHANGELOG|CONTRIBUTING|docker-compose|Dockerfile|Makefile|package\.json|requirements\.txt|pyproject\.toml|vite\.config|tsconfig|tailwind\.config)/i;

const normalize = (value = '') => value.replace(/^\/+|\/+$/g, '');

function globToRegex(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${escaped}$`);
}

const regexCache = new Map();
function matchesAny(value, patterns = []) {
  return patterns.some(pattern => {
    if (value === pattern) return true;
    if (!pattern.includes('*') && !pattern.includes('?')) return false;
    if (!regexCache.has(pattern)) regexCache.set(pattern, globToRegex(pattern));
    return regexCache.get(pattern).test(value);
  });
}

function isKeyFile(name) {
  return KEY_FILE.test(name);
}

function finalizePaths(paths, maxEntries) {
  const seen = new Set();
  const unique = [];
  for (const item of paths) {
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }

  unique.sort((a, b) => {
    const aDir = a.endsWith('/') ? 0 : 1;
    const bDir = b.endsWith('/') ? 0 : 1;
    if (aDir !== bDir) return aDir - bDir;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  return unique.slice(0, maxEntries);
}

function collectLocal(config) {
  const absoluteRoot = path.resolve(ROOT, config.path);
  if (!fs.existsSync(absoluteRoot)) {
    throw new Error(`Local source not found: ${absoluteRoot}`);
  }

  const maxDepth = depthOverride ?? config.maxDepth ?? 3;
  const maxEntries = config.maxEntries ?? 250;
  const mode = config.mode || 'dirs+key-files';
  const excludeDirs = config.excludeDirs ?? DEFAULT_EXCLUDE_DIRS;
  const excludeFiles = config.excludeFiles ?? DEFAULT_EXCLUDE_FILES;
  const includeFiles = new Set(config.includeFiles || []);
  const paths = [];

  const walk = (directory, relative, depth) => {
    if (paths.length >= maxEntries) return;

    let entries;
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch {
      return;
    }

    entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    for (const entry of entries) {
      if (paths.length >= maxEntries) break;
      if (entry.isSymbolicLink()) continue;

      const name = entry.name;
      const childRelative = relative ? `${relative}/${name}` : name;
      const childDepth = depth + 1;

      if (entry.isDirectory()) {
        if (matchesAny(name, excludeDirs)) continue;
        if (childDepth <= maxDepth) paths.push(`${childRelative}/`);
        if (childDepth < maxDepth) walk(path.join(directory, name), childRelative, childDepth);
      } else if (entry.isFile()) {
        if (mode === 'dirs') continue;
        if (matchesAny(name, excludeFiles)) continue;
        const allowed = includeFiles.has(childRelative) || (childDepth <= 1 && isKeyFile(name));
        if (allowed) paths.push(childRelative);
      }
    }
  };

  walk(absoluteRoot, '', 0);

  return {
    paths: finalizePaths(paths, maxEntries),
    root: config.rootLabel || `${path.basename(absoluteRoot)}/`,
    source: null
  };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'portfolio-architecture-sync',
      Accept: 'application/vnd.github+json'
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const request = https.get(url, { headers }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          fetchJson(response.headers.location).then(resolve, reject);
          return;
        }
        if (response.statusCode >= 400) {
          reject(new Error(`GitHub API ${response.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on('error', reject);
    request.setTimeout(20000, () => request.destroy(new Error('GitHub API request timed out')));
  });
}

async function collectGitHub(config) {
  const { repo, branch } = config;
  if (!repo || !branch) throw new Error('GitHub source requires "repo" and "branch"');

  const maxDepth = depthOverride ?? config.maxDepth ?? 4;
  const maxEntries = config.maxEntries ?? 250;
  const mode = config.mode || 'dirs+key-files';
  const excludeDirs = config.excludeDirs ?? DEFAULT_EXCLUDE_DIRS;
  const excludeFiles = config.excludeFiles ?? DEFAULT_EXCLUDE_FILES;
  const includeFiles = new Set(config.includeFiles || []);
  const subPath = normalize(config.path || '');

  const tree = await fetchJson(
    `https://api.github.com/repos/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`
  );
  if (tree.truncated) {
    console.warn(`Warning: GitHub tree for ${repo} is truncated; snapshot may be incomplete.`);
  }

  const paths = [];

  for (const item of tree.tree || []) {
    let relative = item.path;
    if (subPath) {
      if (relative !== subPath && !relative.startsWith(`${subPath}/`)) continue;
      relative = relative.slice(subPath.length).replace(/^\/+/, '');
    }
    if (!relative) continue;

    const segments = relative.split('/');
    const depth = segments.length;
    if (depth > maxDepth) continue;
    const name = segments[segments.length - 1];

    if (segments.slice(0, -1).some(segment => matchesAny(segment, excludeDirs))) continue;

    if (item.type === 'tree') {
      if (matchesAny(name, excludeDirs)) continue;
      paths.push(`${relative}/`);
    } else if (item.type === 'blob') {
      if (mode === 'dirs') continue;
      if (matchesAny(name, excludeFiles)) continue;
      const allowed = includeFiles.has(relative) || (depth <= 1 && isKeyFile(name));
      if (allowed) paths.push(relative);
    }
  }

  return {
    paths: finalizePaths(paths, maxEntries),
    root: config.rootLabel || `${repo.split('/').pop()}/`,
    source: { repo, branch, path: subPath }
  };
}

function writeArchitecture(slug, result) {
  const file = path.join(ARCH_DIR, `${slug}.json`);
  let existing = {};

  if (fs.existsSync(file)) {
    try {
      existing = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      throw new Error(`Invalid existing architecture file: ${error.message}`);
    }
  }

  existing.slug = slug;
  existing.summary = existing.summary || '';
  existing.layers = Array.isArray(existing.layers) ? existing.layers : [];
  existing.links = Array.isArray(existing.links) ? existing.links : [];
  existing.tree = {
    ...(existing.tree || {}),
    root: result.root,
    paths: result.paths
  };

  if (result.source) {
    existing.tree.source = result.source;
  } else {
    delete existing.tree.source;
  }

  if (!('image' in existing)) existing.image = null;

  if (!dryRun) {
    fs.mkdirSync(ARCH_DIR, { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(existing, null, 2)}\n`);
  }

  return existing;
}

async function main() {
  if (!fs.existsSync(SOURCES_FILE)) {
    console.error(`Missing sources file: ${SOURCES_FILE}`);
    process.exit(1);
  }

  const sources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
  const targets = Object.entries(sources).filter(([slug]) => !onlySlug || slug === onlySlug);

  if (!targets.length) {
    console.error(onlySlug ? `No source configured for "${onlySlug}"` : 'No architecture sources configured');
    process.exit(1);
  }

  let succeeded = 0;
  let failed = 0;

  for (const [slug, config] of targets) {
    try {
      let result;
      if (config.type === 'local') {
        result = collectLocal(config);
      } else if (config.type === 'github') {
        result = await collectGitHub(config);
      } else {
        throw new Error(`Unknown source type "${config.type}"`);
      }

      writeArchitecture(slug, result);
      succeeded += 1;

      console.log(`${dryRun ? '[dry-run] ' : ''}${slug}: ${result.paths.length} paths`);
      if (dryRun) {
        console.log(result.paths.slice(0, 25).map(item => `  ${item}`).join('\n'));
      }
    } catch (error) {
      failed += 1;
      console.error(`Failed ${slug}: ${error.message}`);
    }
  }

  if (!dryRun && succeeded > 0) {
    syncToSrc();
  }

  if (failed > 0) process.exitCode = 1;
}

main();
