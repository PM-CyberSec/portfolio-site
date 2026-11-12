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
├── architecture/
│   └── cybernest-soar.json   # Diagram layers/links + project tree
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

## Project Architecture Data

The project detail page reads an optional `portfolio-data/architecture/<slug>.json` file and renders it in the **Architecture** tab:

- `summary` — one-paragraph system overview
- `layers` + `links` — the system-flow diagram (no external diagram dependency)
- `tree` — GitHub-like project structure; `notes` annotate folders
- `image` — optional real diagram image (`{ "src": "images/projects/foo.svg", "alt": "...", "caption": "..." }`)

### Sync the tree from a real repo

Configure sources in `scripts/architecture-sources.json`:

```json
{
  "cybernest-soar": {
    "type": "local",
    "path": "../soar/CyberNest-Soar-private",
    "maxDepth": 3,
    "mode": "dirs+key-files",
    "includeFiles": ["backend/main.py", "playbooks/engine.py"],
    "excludeDirs": [".*", "node_modules", "__pycache__"],
    "excludeFiles": [".env*", "*.whl", "*.pyc"]
  }
}
```

```bash
npm run sync:architecture -- --slug cybernest-soar
npm run sync:architecture -- --slug cybernest-soar --dry-run
```

Public GitHub sources use `"type": "github"`, `"repo"`, `"branch"`, and optional `"path"`. The script only replaces `tree.paths`; your `summary`, `layers`, `links`, `notes`, and `image` are preserved. Committed snapshots mean the build never needs the local repo or network.

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

Project edit forms include a **Building Process** field (one bullet per line) shown in the project's **Process** tab, plus a collapsible **Architecture** section for the summary, layers, links, optional diagram image, and project tree. Saving the project writes `portfolio-data/architecture/<slug>.json` automatically (or removes it when the section is empty). The **Sync structure from source** button regenerates the tree using the project's entry in `scripts/architecture-sources.json`.

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
