import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncToSrc } from './content-loader.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'portfolio-data');
const PORT = 4323;

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
  });
}

function json(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { return null; }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function listItems(type) {
  const dir = path.join(DATA_DIR, type === 'blogs' ? 'blogs' : type);
  if (!fs.existsSync(dir)) return [];
  if (type === 'projects') {
    return fs.readdirSync(dir).filter(f => f.endsWith('.json'))
      .map(f => readJSON(path.join(dir, f))).filter(Boolean);
  } else {
    return fs.readdirSync(dir).filter(d => { try { return fs.statSync(path.join(dir, d)).isDirectory(); } catch { return false; } })
      .map(d => readJSON(path.join(dir, d, 'meta.json'))).filter(Boolean);
  }
}

function getItem(type, slug) {
  if (type === 'projects') return readJSON(path.join(DATA_DIR, 'projects', `${slug}.json`));
  return readJSON(path.join(DATA_DIR, type, slug, 'meta.json'));
}

function getStats() {
  const p = listItems('projects'), i = listItems('investigations'), b = listItems('blogs');
  return { projects: p.length, investigations: i.length, blogs: b.length, total: p.length + i.length + b.length };
}

function saveItem(type, data) {
  const slug = data.slug || slugify(data.title);
  if (type === 'projects') {
    ensureDir(path.join(DATA_DIR, 'projects'));
    writeJSON(path.join(DATA_DIR, 'projects', `${slug}.json`), data);
  } else if (type === 'investigations') {
    const dir = path.join(DATA_DIR, 'investigations', slug);
    ensureDir(dir);
    writeJSON(path.join(dir, 'meta.json'), data);
    const rp = path.join(dir, 'report.md');
    if (!fs.existsSync(rp)) fs.writeFileSync(rp, `# ${data.title}\n\n## Executive Summary\n\n${data.summary||''}\n\n## Investigation Objective\n\n${data.objective||''}\n\n## Environment\n\n${(data.environment||[]).map(e=>'- '+e).join('\n')}\n\n## Key Findings\n\n${(data.keyFindings||[]).map(f=>'- '+f).join('\n')}\n\n## MITRE ATT&CK Mapping\n\n${(data.mitreTechniques||[]).map(t=>'- '+t).join('\n')}\n\n## Tools Used\n\n${(data.tools||[]).map(t=>'- '+t).join('\n')}\n\n## Outcome\n\n${data.outcome||''}\n`);
  } else if (type === 'blogs') {
    const dir = path.join(DATA_DIR, 'blogs', slug);
    ensureDir(dir);
    writeJSON(path.join(dir, 'meta.json'), data);
    const pp = path.join(dir, 'post.md');
    if (!fs.existsSync(pp)) fs.writeFileSync(pp, `---\ntitle: "${data.title}"\ndescription: "${data.description||''}"\ndate: ${data.date||new Date().toISOString().split('T')[0]}\ncategory: ${data.category||'SOC'}\ntags: [${(data.tags||[]).map(t=>`"${t}"`).join(', ')}]\nreadingTime: ${data.readingTime||5}\n---\n\n# ${data.title}\n\n${data.description||''}\n\n> Replace this with your actual article content.\n`);
  }
  syncToSrc();
  return { slug, created: true };
}

function deleteItem(type, slug) {
  if (type === 'projects') {
    const fp = path.join(DATA_DIR, 'projects', `${slug}.json`);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } else {
    const dir = path.join(DATA_DIR, type, slug);
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  }
  syncToSrc();
  return { deleted: true };
}

// Read/write separate data files
function getDataFile(name) {
  const fp = path.join(DATA_DIR, `${name}.json`);
  return readJSON(fp) || (name === 'skills' ? { groups: [] } : []);
}

function writeDataFile(name, data) {
  writeJSON(path.join(DATA_DIR, `${name}.json`), data);
  syncToSrc();
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname.split('/').filter(Boolean);

  // Stats
  if (req.method === 'GET' && p[0] === 'api' && p[1] === 'stats') return json(res, getStats());

  // Profile (main)
  if (p[0] === 'api' && p[1] === 'profile' && !p[2]) {
    if (req.method === 'GET') {
      const data = getDataFile('profile');
      return json(res, data);
    }
    if (req.method === 'PUT') {
      const body = JSON.parse(await readBody(req));
      writeDataFile('profile', body);
      return json(res, { updated: true });
    }
  }

  // Profile sub-sections: experience, skills, certifications
  if (p[0] === 'api' && p[1] === 'profile' && p[2]) {
    const field = p[2];
    if (req.method === 'GET') {
      return json(res, getDataFile(field));
    }
    if (req.method === 'PUT') {
      const body = JSON.parse(await readBody(req));
      writeDataFile(field, body);
      return json(res, { updated: true });
    }
    if (req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const data = getDataFile(field);
      if (field === 'skills') {
        data.groups = data.groups || [];
        data.groups.push(body);
      } else {
        data.push(body);
      }
      writeDataFile(field, data);
      return json(res, { created: true }, 201);
    }
    if (req.method === 'DELETE' && p[3] !== undefined) {
      const idx = parseInt(p[3]);
      const data = getDataFile(field);
      if (field === 'skills') {
        data.groups.splice(idx, 1);
      } else {
        data.splice(idx, 1);
      }
      writeDataFile(field, data);
      return json(res, { deleted: true });
    }
  }

  // List
  if (req.method === 'GET' && p[0] === 'api' && p[1] === 'list' && p[2]) return json(res, listItems(p[2]));

  // Content endpoints: GET/PUT blog post.md or investigation report.md (before generic CRUD)
  if (p[0] === 'api' && p[1] && p[2] && p[3] === 'content') {
    const type = p[1], slug = p[2];
    const file = type === 'blogs' ? path.join(DATA_DIR, 'blogs', slug, 'post.md') : path.join(DATA_DIR, 'investigations', slug, 'report.md');
    if (req.method === 'GET') {
      try { return json(res, { content: fs.readFileSync(file, 'utf8') }); } catch { return json(res, { content: '' }); }
    }
    if (req.method === 'PUT') {
      const body = JSON.parse(await readBody(req));
      ensureDir(path.dirname(file));
      fs.writeFileSync(file, body.content || '');
      syncToSrc();
      return json(res, { updated: true });
    }
  }

  // Get single item
  if (req.method === 'GET' && p[0] === 'api' && p[1] && p[2] && !['list','stats','profile'].includes(p[1])) {
    const item = getItem(p[1], p[2]);
    return item ? json(res, item) : json(res, { error: 'Not found' }, 404);
  }

  // Create
  if (req.method === 'POST' && p[0] === 'api' && p[1] && !['list','stats','profile'].includes(p[1])) {
    const body = JSON.parse(await readBody(req));
    return json(res, saveItem(p[1], body), 201);
  }

  // Update
  if (req.method === 'PUT' && p[0] === 'api' && p[1] && !['list','stats','profile'].includes(p[1])) {
    const body = JSON.parse(await readBody(req));
    return json(res, saveItem(p[1], body));
  }

  // Delete
  if (req.method === 'DELETE' && p[0] === 'api' && p[1] && p[2]) {
    return json(res, deleteItem(p[1], p[2]));
  }

  json(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => {
  console.log(`Portfolio API: http://localhost:${PORT}`);
  console.log(`Admin UI: http://localhost:4321/portfolio-site/admin/`);
});
