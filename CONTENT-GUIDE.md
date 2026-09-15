# Portfolio2 — Content Management Guide

## Content Structure (`portfolio-data/`)

```
portfolio-data/
├── profile.json              # Name, focus, links
├── experience.json           # Work history
├── skills.json               # Technical stack
├── certifications.json       # Certs
├── projects/
│   ├── cybernest-soar.json   # One file per project
│   ├── packet-sniffer.json
│   └── ...
├── investigations/
│   ├── powershell-defense-evasion/
│   │   ├── meta.json         # Structured data
│   │   └── report.md         # Full Markdown report
│   └── ...
└── blogs/
    ├── detection-engineering-101/
    │   ├── meta.json
    │   └── post.md           # Full article
    └── ...
```

---

## How to Use

### CLI — create new content interactively

```bash
npm run portfolio new project
npm run portfolio new investigation
npm run portfolio new blog
npm run portfolio list
```

### Admin UI — browser-based editor

```bash
npm run dev:admin    # starts both Astro + API server
```

Then open `http://localhost:4321/portfolio-site/admin/`

You get a dashboard with stats, filterable content lists, and forms to create/edit/delete items. Changes write directly to `portfolio-data/`.

### Build — syncs content + generates site

```bash
npm run build   # auto-syncs portfolio-data/ → src/data/ → dist/
```

---

## Workflow

1. `npm run portfolio new investigation` (or use admin UI)
2. Edit the generated `report.md` / `post.md`
3. `npm run build` — content syncs automatically
4. Push to GitHub — deploys automatically
