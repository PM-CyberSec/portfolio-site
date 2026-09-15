import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'portfolio-data');
const SRC_DATA = path.join(ROOT, 'src', 'data');

// Ensure directories exist
['projects', 'investigations', 'blogs'].forEach(dir => {
  fs.mkdirSync(path.join(DATA_DIR, dir), { recursive: true });
});

// Load existing data
const projects = JSON.parse(fs.readFileSync(path.join(SRC_DATA, 'projects.json'), 'utf8'));
const investigations = JSON.parse(fs.readFileSync(path.join(SRC_DATA, 'investigations.json'), 'utf8'));
const blogs = JSON.parse(fs.readFileSync(path.join(SRC_DATA, 'blog.json'), 'utf8'));

// Write per-project JSON files
projects.forEach(p => {
  const filePath = path.join(DATA_DIR, 'projects', `${p.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(p, null, 2));
  console.log(`Created: projects/${p.slug}.json`);
});

// Write per-investigation JSON files + placeholder report.md
investigations.forEach(inv => {
  const dir = path.join(DATA_DIR, 'investigations', inv.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(inv, null, 2));
  fs.writeFileSync(path.join(dir, 'report.md'), `# ${inv.title}\n\n## Executive Summary\n\n${inv.summary}\n\n## Investigation Objective\n\n${inv.objective}\n\n## Environment\n\n${inv.environment.map(e => `- ${e}`).join('\n')}\n\n## Key Findings\n\n${inv.keyFindings.map(f => `- ${f}`).join('\n')}\n\n## MITRE ATT&CK Mapping\n\n${inv.mitreTechniques.map(t => `- ${t}`).join('\n')}\n\n## Tools Used\n\n${inv.tools.map(t => `- ${t}`).join('\n')}\n\n## Outcome\n\n${inv.outcome}\n`);
  console.log(`Created: investigations/${inv.slug}/`);
});

// Write per-blog JSON files + placeholder post.md
blogs.forEach(b => {
  const dir = path.join(DATA_DIR, 'blogs', b.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(b, null, 2));
  fs.writeFileSync(path.join(dir, 'post.md'), `---\ntitle: "${b.title}"\ndescription: "${b.description}"\ndate: ${b.date}\ncategory: ${b.category}\ntags: [${b.tags.map(t => `"${t}"`).join(', ')}]\nreadingTime: ${b.readingTime}\n---\n\n# ${b.title}\n\n${b.description}\n\n> This is a placeholder article. Replace this content with your actual blog post.\n`);
  console.log(`Created: blogs/${b.slug}/`);
});

// Write profile.json
const profile = {
  name: "Paula Maged",
  title: "SOC Analyst",
  focus: ["Blue Team Operations", "Incident Response", "Detection Engineering", "Security Automation"],
  approach: "Observe → Correlate → Investigate → Map → Respond → Improve",
  education: "El Sewedy University of Technology (SUTech)",
  gpa: "4.1 / 4.3",
  languages: ["Arabic (Native)", "English (Technical)", "French (DELF B2)"],
  links: {
    github: "https://github.com/PM-CyberSec",
    linkedin: "https://linkedin.com/in/paula-maged-04a721249",
    email: "paulamagedcyber@gmail.com"
  }
};
fs.writeFileSync(path.join(DATA_DIR, 'profile.json'), JSON.stringify(profile, null, 2));
console.log('Created: profile.json');

// Write experience.json (copy from src/data)
fs.copyFileSync(path.join(SRC_DATA, 'experience.json'), path.join(DATA_DIR, 'experience.json'));
console.log('Copied: experience.json');

// Write skills.json (copy from src/data)
fs.copyFileSync(path.join(SRC_DATA, 'skills.json'), path.join(DATA_DIR, 'skills.json'));
console.log('Copied: skills.json');

// Write certifications.json (copy from src/data)
fs.copyFileSync(path.join(SRC_DATA, 'certifications.json'), path.join(DATA_DIR, 'certifications.json'));
console.log('Copied: certifications.json');

console.log('\nDone! Content reorganized into portfolio-data/');
