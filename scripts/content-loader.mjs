import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'portfolio-data');

// Sync portfolio-data/ back to src/data/ so Astro can read it
function syncToSrc() {
  const srcData = path.join(ROOT, 'src', 'data');
  fs.mkdirSync(srcData, { recursive: true });

  // Load all project JSONs
  const projectDir = path.join(DATA_DIR, 'projects');
  if (fs.existsSync(projectDir)) {
    const projects = fs.readdirSync(projectDir)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(projectDir, f), 'utf8')));
    fs.writeFileSync(path.join(srcData, 'projects.json'), JSON.stringify(projects, null, 2));
    console.log(`Synced ${projects.length} projects to src/data/projects.json`);
  }

  // Load all investigation metas + report content
  const invDir = path.join(DATA_DIR, 'investigations');
  if (fs.existsSync(invDir)) {
    const investigations = fs.readdirSync(invDir)
      .filter(d => fs.statSync(path.join(invDir, d)).isDirectory())
      .map(d => {
        const metaPath = path.join(invDir, d, 'meta.json');
        const reportPath = path.join(invDir, d, 'report.md');
        if (fs.existsSync(metaPath)) {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
          meta.reportContent = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, 'utf8') : '';
          return meta;
        }
        return null;
      })
      .filter(Boolean);
    fs.writeFileSync(path.join(srcData, 'investigations.json'), JSON.stringify(investigations, null, 2));
    console.log(`Synced ${investigations.length} investigations to src/data/investigations.json`);
  }

  // Load all blog metas + content
  const blogDir = path.join(DATA_DIR, 'blogs');
  if (fs.existsSync(blogDir)) {
    const blogs = fs.readdirSync(blogDir)
      .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory())
      .map(d => {
        const metaPath = path.join(blogDir, d, 'meta.json');
        const postPath = path.join(blogDir, d, 'post.md');
        if (metaPath && fs.existsSync(metaPath)) {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
          meta.content = fs.existsSync(postPath) ? fs.readFileSync(postPath, 'utf8') : '';
          return meta;
        }
        return null;
      })
      .filter(Boolean);
    fs.writeFileSync(path.join(srcData, 'blog.json'), JSON.stringify(blogs, null, 2));
    console.log(`Synced ${blogs.length} blogs to src/data/blog.json`);
  }

  // Copy other data files
  ['experience.json', 'skills.json', 'certifications.json', 'profile.json'].forEach(file => {
    const src = path.join(DATA_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(srcData, file));
      console.log(`Copied ${file}`);
    }
  });
}

// Load investigation report.md content for use in pages
function loadInvestigationReports() {
  const invDir = path.join(DATA_DIR, 'investigations');
  if (!fs.existsSync(invDir)) return {};

  const reports = {};
  fs.readdirSync(invDir)
    .filter(d => fs.statSync(path.join(invDir, d)).isDirectory())
    .forEach(d => {
      const reportPath = path.join(invDir, d, 'report.md');
      if (fs.existsSync(reportPath)) {
        reports[d] = fs.readFileSync(reportPath, 'utf8');
      }
    });
  return reports;
}

// Load blog post.md content
function loadBlogPosts() {
  const blogDir = path.join(DATA_DIR, 'blogs');
  if (!fs.existsSync(blogDir)) return {};

  const posts = {};
  fs.readdirSync(blogDir)
    .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory())
    .forEach(d => {
      const postPath = path.join(blogDir, d, 'post.md');
      if (fs.existsSync(postPath)) {
        posts[d] = fs.readFileSync(postPath, 'utf8');
      }
    });
  return posts;
}

export { syncToSrc, loadInvestigationReports, loadBlogPosts };

// Run if called directly
if (process.argv[1] && process.argv[1].includes('content-loader')) {
  syncToSrc();
}
