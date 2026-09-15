# Portfolio2 — Build Plan

## What This Is

A complete rebuild of Paula Maged's cybersecurity portfolio. The old portfolio (Astro, single-page scroll, terminal aesthetic) scored 31/100 in a product audit. This rebuild addresses every structural, UX, and content gap.

## Source Materials

- `portfolio-improvement-ai-chat` — AI chat describing ideal structure, content hierarchy, page breakdown
- `portfolio-audit.md` — 31/100 audit with 10 structural problems, missing components, design system recommendations
- `projects/active/portfolio/src/data/projects.ts` — existing project data to migrate and improve
- `notes/github_portfolio.md` — existing GitHub README with project descriptions
- `projects/active/soar/documentation/` — SOAR project docs, screenshots, architecture reports

---

## Architecture

### Stack
- **Framework:** Astro 7 + TypeScript
- **Styling:** Tailwind CSS 3.4
- **Content:** Astro Content Collections (Markdown/MDX for blogs + investigation reports)
- **Data:** JSON files for structured data (projects, experience, skills, certifications)
- **Deployment:** GitHub Pages via GitHub Actions

### Page Structure (4 main pages + shared footer contact)

```
/ (Profile)
├── Hero: name, title, focus areas, 3 CTAs
├── Security Profile: focus, approach, how I think
├── Technical Stack: grouped by capability
├── Experience: work + internships
├── Certifications & Learning
└── Footer contact (all pages)

/projects
├── Featured project (large card)
├── All projects (filterable grid)
└── /projects/[slug] (case study page)

/investigations
├── Investigation list (filterable)
└── /investigations/[slug]
    ├── Overview tab (recruiter-friendly)
    └── Full Report tab (rendered Markdown)

/blog
├── Article list (filterable by category)
└── /blog/[slug] (article with code blocks)
```

### Navigation
```
[PM]    Profile    Projects    Investigations    Blog    [GitHub] [LinkedIn]
```

---

## What Needs To Change (from old portfolio)

### Remove
1. Rick and Morty reveal animation — first thing visitors see, undermines professionalism
2. Terminal typing boot sequence — char-by-char DOM insertion, accessibility nightmare
3. ASCII art "RICKOMENDER OMEN" logo
4. Scanline overlay (body::after) — creates moiré, degrades readability
5. "CLASSIFIED DOSSIER" / "ENCRYPTED PROFILE" framing
6. Fake severity labels on academic projects ("CRITICAL" on homework)
7. "END OF TRANSMISSION" footer
8. "0x0M" terminal logos
9. Single-page scroll architecture
10. Monospace font for all body text
11. Third-party Vercel metrics image dependency
12. CGPA displayed 4 times

### Add
1. Multi-page architecture (4 dedicated pages)
2. Blog section with Markdown content collections
3. Investigations section with Overview + Full Report tabs
4. Screenshots/diagrams on project pages
5. "How I Think" methodology section
6. Professional narrative About section
7. Sans-serif body font (Inter)
8. Resume/CV download link
9. Breadcrumbs on all subpages
10. Related content cross-linking
11. Formspree contact form (or simple footer CTA)
12. Sitemap generation

### Keep
1. Teal-on-dark color palette (#00FFCC on #0B1426)
2. SOC/HTB theme toggle (lightweight, on-brand)
3. Project data architecture (bottleneck/northStar)
4. Responsive breakpoints
5. SEO fundamentals (JSON-LD, OG tags)
6. Favicon (PM monogram)

---

## Data Layer Design

### Content directory structure
```
portfolio2/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content collection schemas
│   │   ├── projects/              # JSON files per project
│   │   ├── investigations/        # Folder per investigation
│   │   │   ├── *.json             # Metadata
│   │   │   └── report.md          # Full investigation report
│   │   └── blog/                  # MDX articles
│   │       └── *.mdx
│   ├── data/
│   │   ├── experience.json        # Work + education timeline
│   │   ├── skills.json            # Technical stack grouped by capability
│   │   └── certifications.json    # Certs + learning
│   ├── pages/
│   │   ├── index.astro            # Profile
│   │   ├── projects/
│   │   │   ├── index.astro        # Projects listing
│   │   │   └── [slug].astro       # Project detail
│   │   ├── investigations/
│   │   │   ├── index.astro        # Investigations listing
│   │   │   └── [slug].astro       # Investigation detail (overview + report tabs)
│   │   └── blog/
│   │       ├── index.astro        # Blog listing
│   │       └── [slug].astro       # Blog article
│   ├── components/
│   │   ├── Nav.astro              # Sticky navigation
│   │   ├── Footer.astro           # Contact + links (all pages)
│   │   ├── Hero.astro             # Profile hero
│   │   ├── HowIThink.astro        # Methodology section
│   │   ├── StackSection.astro     # Technical stack
│   │   ├── ProjectCard.astro      # Project card
│   │   ├── InvestigationCard.astro
│   │   ├── BlogCard.astro
│   │   ├── Badge.astro            # Reusable status badge
│   │   ├── FilterBar.astro        # Reusable filter/search
│   │   └── ThemeToggle.astro      # SOC/HTB toggle
│   └── layouts/
│       └── Layout.astro           # Base layout with nav + footer
├── public/
│   ├── images/                    # Screenshots, diagrams
│   ├── resume.pdf
│   ├── favicon.svg
│   └── ProfilePicture.jpeg
├── tailwind.config.mjs
├── astro.config.mjs
└── package.json
```

### Project data model (JSON)
```json
{
  "slug": "cybernest-soar",
  "title": "CyberNest SOAR",
  "subtitle": "AI-Enhanced Security Orchestration Platform",
  "description": "One paragraph summary",
  "role": "Cybersecurity Team Lead",
  "timeline": "Sep 2025 — Present",
  "status": "active",
  "featured": true,
  "problem": "What problem this solves",
  "approach": "How I approached it",
  "results": "What was achieved",
  "technologies": ["Python", "FastAPI", "Docker", "Wazuh"],
  "categories": ["SOAR", "SIEM", "AI"],
  "github": "https://github.com/...",
  "screenshots": ["dashboard.png", "architecture.png"],
  "team": [...],
  "relatedInvestigations": ["threat-hunt-1"],
  "relatedBlogs": ["detection-engineering-101"]
}
```

### Investigation data model
```json
{
  "slug": "powershell-defense-evasion",
  "title": "PowerShell Defense Evasion Investigation",
  "category": "Windows",
  "date": "2026-09-14",
  "summary": "Short recruiter-friendly summary",
  "scenario": "What happened",
  "objective": "What I investigated",
  "environment": ["Windows 10", "Sysmon", "Event Viewer"],
  "keyFindings": ["finding 1", "finding 2"],
  "mitreTechniques": ["T1059.001", "T1562.001"],
  "tools": ["Sysmon", "PowerShell", "MITRE ATT&CK"],
  "outcome": "What I concluded",
  "reportFile": "report.md",
  "relatedProjects": ["cybernest-soar"],
  "relatedBlogs": ["understanding-powershell-logging"]
}
```

### Blog data model (MDX frontmatter)
```yaml
---
title: "Understanding Windows Event ID 4625"
description: "What authentication failures tell a SOC analyst"
date: 2026-09-15
category: "SOC"
tags: ["Windows", "Authentication", "Detection"]
readingTime: 5
relatedInvestigations: ["powershell-defense-evasion"]
relatedProjects: ["cybernest-soar"]
---
```

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0B1426` | Page background |
| `--bg-card` | `#111827` | Card backgrounds |
| `--bg-elevated` | `#1F2937` | Nav, elevated surfaces |
| `--accent` | `#00FFCC` | Primary accent, CTAs, links |
| `--accent-dim` | `rgba(0,255,204,0.12)` | Hover backgrounds |
| `--text` | `#F9FAFB` | Primary text |
| `--text-muted` | `#9CA3AF` | Secondary text |
| `--text-dim` | `#6B7280` | Tertiary text |
| `--border` | `rgba(0,255,204,0.1)` | Default borders |
| `--border-strong` | `rgba(0,255,204,0.25)` | Emphasized borders |
| `--danger` | `#EF4444` | Error, critical |
| `--warning` | `#F59E0B` | Warning, in-progress |
| `--success` | `#10B981` | Success, verified |
| `--info` | `#3B82F6` | Info, primary blue |

### Typography
| Use | Font | Size | Weight |
|-----|------|------|--------|
| Body | Inter | 16px (1rem) | 400 |
| H1 | Inter | 2.25rem (36px) | 700 |
| H2 | Inter | 1.5rem (24px) | 600 |
| H3 | Inter | 1.125rem (18px) | 600 |
| Small/labels | Inter | 0.875rem (14px) | 500 |
| Code/data | JetBrains Mono | 0.875rem (14px) | 400 |

### Spacing
8px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### Border radius
- Cards: 12px
- Buttons: 8px
- Badges: 6px
- Inputs: 8px

### Shadows
- Default: `0 1px 3px rgba(0,0,0,0.3)`
- Hover: `0 4px 12px rgba(0,0,0,0.4)`
- Glow (one per page max): `0 0 20px rgba(0,255,204,0.15)`

### Animation
- Entrance: `opacity + translateY(8px)` 300ms ease-out
- Hover: `border-color + shadow` 200ms
- No continuous animations except pulse on status dot
- Respect `prefers-reduced-motion`

---

## Build Order

### Phase 1 — Scaffold (do first)
1. `npm create astro@latest portfolio2` with TypeScript + Tailwind
2. Set up `tailwind.config.mjs` with design tokens
3. Create `Layout.astro` with nav + footer + global styles
4. Create `Nav.astro` and `Footer.astro`
5. Create `ThemeToggle.astro` (SOC/HTB)

### Phase 2 — Data Layer
6. Create `src/data/experience.json`
7. Create `src/data/skills.json`
8. Create `src/data/certifications.json`
9. Create `src/data/projects.ts` (migrate from old portfolio, improve)
10. Create `src/data/investigations.ts` (seed with 1-2 entries)
11. Create `src/data/blog.ts` (seed with 1-2 entries)

### Phase 3 — Profile Page
12. Build `Hero.astro` component
13. Build `HowIThink.astro` component
14. Build `StackSection.astro` component
15. Build `ExperienceSection.astro` component
16. Build `index.astro` page assembling all sections

### Phase 4 — Projects Page
17. Build `ProjectCard.astro`
18. Build `FilterBar.astro`
19. Build `/projects/index.astro`
20. Build `/projects/[slug].astro` (case study with tabs)

### Phase 5 — Investigations
21. Build `InvestigationCard.astro`
22. Build `/investigations/index.astro`
23. Build `/investigations/[slug].astro` (overview + report tabs)

### Phase 6 — Blog
24. Build `BlogCard.astro`
25. Build `/blog/index.astro`
26. Build `/blog/[slug].astro`

### Phase 7 — Polish
27. Add OG image generation
28. Generate sitemap
29. Test responsive design
30. Test accessibility
31. Deploy to GitHub Pages

---

## Content Seeding

### Projects to include (from old portfolio)
1. **CyberNest SOAR** — featured, critical, team lead
2. **NeonNet Encrypted Messenger** — high, independent
3. **Packet Sniffer** — high, independent
4. **DLDS Digital Forensics** — medium, academic
5. **Inventory Vault** — medium, active development
6. **IoT Sensor Network** — medium, academic

Drop: Online Purchase System, E-Commerce Catalogue, Static Web UI, Cryptoflux, SUTech Labs (too academic/generic)

### Investigations to seed
1. Placeholder investigation template
2. (User will add real investigations later)

### Blog to seed
1. Placeholder blog post template
2. (User will add real posts later)
