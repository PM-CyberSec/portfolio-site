#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'portfolio-data');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function templateProject(data) {
  return {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle || '',
    description: data.description,
    role: data.role || '',
    timeline: data.timeline || '',
    status: data.status || 'active',
    featured: data.featured === 'yes',
    problem: data.problem || '',
    approach: data.approach || '',
    results: data.results || '',
    technologies: data.technologies ? data.technologies.split(',').map(s => s.trim()) : [],
    categories: data.categories ? data.categories.split(',').map(s => s.trim()) : [],
    github: data.github || '',
    screenshots: [],
    team: [],
    relatedInvestigations: [],
    relatedBlogs: []
  };
}

function templateInvestigation(data) {
  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    date: data.date || new Date().toISOString().split('T')[0],
    summary: data.summary,
    scenario: data.scenario || '',
    objective: data.objective || '',
    environment: data.environment ? data.environment.split(',').map(s => s.trim()) : [],
    keyFindings: data.findings ? data.findings.split(',').map(s => s.trim()) : [],
    mitreTechniques: data.mitre ? data.mitre.split(',').map(s => s.trim()) : [],
    tools: data.tools ? data.tools.split(',').map(s => s.trim()) : [],
    outcome: data.outcome || '',
    reportFile: 'report.md',
    relatedProjects: [],
    relatedBlogs: []
  };
}

function templateBlog(data) {
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category,
    tags: data.tags ? data.tags.split(',').map(s => s.trim()) : [],
    readingTime: parseInt(data.readingTime) || 5,
    relatedInvestigations: [],
    relatedProjects: []
  };
}

async function newProject() {
  console.log('\n--- New Project ---\n');
  const data = {};
  data.title = await ask('Title: ');
  data.slug = slugify(data.title);
  data.subtitle = await ask('Subtitle: ');
  data.description = await ask('Description (one paragraph): ');
  data.role = await ask('Your role: ');
  data.timeline = await ask('Timeline (e.g., Sep 2025 — Present): ');
  data.status = await ask('Status (active/completed): ') || 'active';
  data.featured = await ask('Featured? (yes/no): ') || 'no';
  data.problem = await ask('Problem statement: ');
  data.approach = await ask('Your approach: ');
  data.results = await ask('Results: ');
  data.technologies = await ask('Technologies (comma-separated): ');
  data.categories = await ask('Categories (comma-separated): ');
  data.github = await ask('GitHub URL (optional): ');

  const project = templateProject(data);
  const filePath = path.join(DATA_DIR, 'projects', `${project.slug}.json`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
  console.log(`\nCreated: portfolio-data/projects/${project.slug}.json`);
  console.log('Run `npm run build` to update the site.');
}

async function newInvestigation() {
  console.log('\n--- New Investigation ---\n');
  const data = {};
  data.title = await ask('Title: ');
  data.slug = slugify(data.title);
  data.category = await ask('Category (Windows/Linux/Network/Threat Hunting): ');
  data.date = await ask('Date (YYYY-MM-DD, default=today): ');
  data.summary = await ask('Summary (one paragraph): ');
  data.scenario = await ask('Scenario: ');
  data.objective = await ask('Objective: ');
  data.environment = await ask('Environment (comma-separated): ');
  data.findings = await ask('Key findings (comma-separated): ');
  data.mitre = await ask('MITRE techniques (comma-separated): ');
  data.tools = await ask('Tools used (comma-separated): ');
  data.outcome = await ask('Outcome: ');

  const inv = templateInvestigation(data);
  const dir = path.join(DATA_DIR, 'investigations', inv.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(inv, null, 2));

  // Create report template
  const report = `# ${inv.title}

## Executive Summary

${inv.summary}

## Investigation Objective

${inv.objective}

## Environment

${inv.environment.map(e => `- ${e}`).join('\n')}

## Timeline

| Time | Event | Source |
|------|-------|--------|
| | | |

## Key Findings

${inv.keyFindings.map(f => `- ${f}`).join('\n')}

## MITRE ATT&CK Mapping

${inv.mitreTechniques.map(t => `- ${t}`).join('\n')}

## Tools Used

${inv.tools.map(t => `- ${t}`).join('\n')}

## Outcome

${inv.outcome}

## Response Recommendations

- Add detection rules here
- Add mitigation steps here
`;
  fs.writeFileSync(path.join(dir, 'report.md'), report);
  console.log(`\nCreated: portfolio-data/investigations/${inv.slug}/`);
  console.log('Edit report.md to add your full investigation report.');
  console.log('Run `npm run build` to update the site.');
}

async function newBlog() {
  console.log('\n--- New Blog Post ---\n');
  const data = {};
  data.title = await ask('Title: ');
  data.slug = slugify(data.title);
  data.description = await ask('Description (one paragraph): ');
  data.date = await ask('Date (YYYY-MM-DD, default=today): ');
  data.category = await ask('Category (SOC/Detection/Networking/IR/Security Engineering): ');
  data.tags = await ask('Tags (comma-separated): ');
  data.readingTime = await ask('Estimated reading time (minutes): ');

  const blog = templateBlog(data);
  const dir = path.join(DATA_DIR, 'blogs', blog.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(blog, null, 2));

  const post = `---
title: "${blog.title}"
description: "${blog.description}"
date: ${blog.date}
category: ${blog.category}
tags: [${blog.tags.map(t => `"${t}"`).join(', ')}]
readingTime: ${blog.readingTime}
---

# ${blog.title}

${blog.description}

> Replace this with your actual article content.
`;
  fs.writeFileSync(path.join(dir, 'post.md'), post);
  console.log(`\nCreated: portfolio-data/blogs/${blog.slug}/`);
  console.log('Edit post.md to add your article content.');
  console.log('Run `npm run build` to update the site.');
}

async function listContent() {
  console.log('\n--- Portfolio Content ---\n');

  const projects = fs.readdirSync(path.join(DATA_DIR, 'projects')).filter(f => f.endsWith('.json'));
  console.log(`Projects: ${projects.length}`);
  projects.forEach(p => console.log(`  - ${p.replace('.json', '')}`));

  const invDirs = fs.readdirSync(path.join(DATA_DIR, 'investigations')).filter(d =>
    fs.statSync(path.join(DATA_DIR, 'investigations', d)).isDirectory()
  );
  console.log(`\nInvestigations: ${invDirs.length}`);
  invDirs.forEach(i => console.log(`  - ${i}`));

  const blogDirs = fs.readdirSync(path.join(DATA_DIR, 'blogs')).filter(d =>
    fs.statSync(path.join(DATA_DIR, 'blogs', d)).isDirectory()
  );
  console.log(`\nBlog posts: ${blogDirs.length}`);
  blogDirs.forEach(b => console.log(`  - ${b}`));
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'new':
        switch (args[1]) {
          case 'project': await newProject(); break;
          case 'investigation': await newInvestigation(); break;
          case 'blog': await newBlog(); break;
          default:
            console.log('Usage: portfolio new <project|investigation|blog>');
        }
        break;
      case 'list':
        await listContent();
        break;
      default:
        console.log(`
Portfolio Content Manager

Commands:
  portfolio new project         Create a new project
  portfolio new investigation   Create a new investigation
  portfolio new blog            Create a new blog post
  portfolio list                List all content
        `);
    }
  } finally {
    rl.close();
  }
}

main();
