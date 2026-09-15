# Portfolio Integrity Audit — Before vs After

## Profile

| Field | Before | After | Status |
|-------|--------|-------|--------|
| `title` | `"SOC Analyst"` | `"SOC Analyst"` | Unchanged in data (hero shows "Cybersecurity Student") |
| `tagline` | `"Building practical security systems..."` | Same | Unchanged |
| `bio` | `"Cybersecurity student specializing in..."` | Same | Unchanged |
| `focus` | `["Blue Team Operations", "Incident Response", "Detection Engineering", "Security Automation"]` | Same | Unchanged — "Detection Engineering" retained |
| `approach` | `"Observe → Correlate → Investigate → Map → Respond → Improve"` | Same | Unchanged |

**Note:** The profile hero in `index.astro` was changed from `"SOC Analyst · Blue Team · IR"` to `"Cybersecurity Student · Blue Team · SOC"` to match the resume's "Cybersecurity student" positioning. The `profile.json` data was reverted by the content-loader sync.

---

## Experience

| Entry | Before | After | Change |
|-------|--------|-------|--------|
| AlDahra | Title: `"Intern - IT Help Desk"`, Location: `"Heliopolis, Egypt"`, Highlights: `["asd", "asd", "asd"]` | Title: `"IT Intern"`, Location: `"Cairo, Egypt"`, Highlights: 3 resume-verified bullet points | **Fixed**: title, location, placeholders replaced with resume content, added `pic` field |
| Trios Cyber | Title: `"Intern — Security Operations"`, Timeline: `"2025"`, Highlights: 3 generic bullets | Title: `"SOC Intern"`, Timeline: `"Sep 2026 — Oct 2026"`, Highlights: 4 resume-verified bullets | **Fixed**: title, timeline, highlights matched to resume |
| Archon Vanguard | Title: `"Intern — Security Analytics"`, Timeline: `"2025"`, Highlights: 2 generic bullets | Title: `"SOC Intern"`, Timeline: `"Sep 2026 — Oct 2026"`, Highlights: 4 resume-verified bullets | **Fixed**: title, timeline, highlights matched to resume |
| Fortinet/NTI | Not present | Added by user: `"Fortinet Fortigate Intern"`, `"NTI"`, `"Sep 2026"` | **Added by user** (not on original resume) |
| CyberNest SOAR | Role: `"Cybersecurity Team Lead"`, Type: `"Academic Project"`, Highlights: generic SOAR claims | Role: `"SOAR Architect"`, Type: `"Academic Team Project"`, Highlights: verified contributions | **Fixed**: role matches README team table, type is honest |
| Education | Highlights: `["Specialization: Blue Team Operations..."]` | Highlights: `["Focus: Blue Team Operations..."]` | **Fixed**: "Specialization" → "Focus" (matching resume) |

### Removed Experience Entries
| Entry | Before | After | Reason |
|-------|--------|-------|--------|
| Fortinet/NTI-ITIDA | `"Intern — Fortinet/FortiGate"`, `"NTI-ITIDA"`, `"2025"` | Removed | Not on resume. User re-added separately later. |

---

## Certifications

| Before | After | Change |
|--------|-------|--------|
| `"CompTIA Security+"` — CompTIA, In Progress | Removed | **Not on resume** |
| `"Stanford Cryptography I"` — Stanford Online, In Progress | Removed | **Not on resume** |
| `"Cyber Security 101"` — TryHackMe, In Progress | Removed | **Not on resume** |
| `"Digital Forensics"` — SUTech, 2025, completed | Removed | **Not on resume** |
| `"New Certification A+"` — Comptia bla, completed | Removed | **Test/fake entry** |
| — | `"Cyber Threat Management"` — Cisco, 2025, completed | **Added** (from resume) |
| — | `"Networking Basics"` — Cisco, 2025, completed | **Added** (from resume) |
| — | Cert images added | `CyberThreatManagement.png-1.png`, `NetworkingBasics.png-1.png` |

---

## Projects

| Before | After | Change |
|--------|-------|--------|
| `"CyberNest SOAR"` — Role: `"Cybersecurity Team Lead"`, Desc: inflated AI/ML claims | Role: `"SOAR Architect"`, Desc: verified Milestone 1 only | **Fixed**: role matches README, removed unverified AI claims |
| `"DLDS Digital Forensics"` — Title: `"DLDS Digital Forensics"`, Featured: false | Title: `"AI-Assisted Network Forensics"`, Featured: true | **Fixed**: accurate title, marked as featured |
| `"Inventory Vault"` — Desc: generic, technologies: vague `["Full-Stack", "Security", "Database"]` | Desc: verified Laravel security features, technologies: specific | **Fixed**: accurate description with verified security controls |
| `"IoT Sensor Network"` — Metrics: `["10k events/day", "90% Detection accuracy"]` | Removed | **Removed**: fabricated metrics, not on resume |
| `"NeonNet Encrypted Messenger"` — Role: `"Security Architect & Lead Developer"`, Desc: generic | Role: `"Developer"`, Title: `"NeonNet CyberDeck"`, Desc: verified crypto details | **Fixed**: honest role, accurate technical description |
| `"Packet Sniffer"` — Results: `"blablabla"` | Removed | **Removed**: placeholder content, not on resume |
| — | `"AutoConfigLab"` (NetworkOperations) | **Added**: verified academic project |
| — | `"NeonNet CyberDeck"` (Linux&Shell) | **Added**: verified academic project |
| — | `"Inventory Vault"` (WebSecurity) | **Added**: verified academic project (re-added with accurate data) |

### Project Count
- **Before**: 6 projects (2 unverifiable, 1 with fake metrics, 1 with placeholder text)
- **After**: 5 projects (all verified from source material)

---

## Investigations

| Field | Before (AD Lateral Movement) | After | Change |
|-------|-----|-------|--------|
| `summary` | `"Mapped lateral movement paths... YES"` | `"Mapped lateral movement paths..."` | **Fixed**: removed "YES" placeholder |
| `scenario` | `"...domain controllers. YES"` | `"...domain controllers."` | **Fixed**: removed "YES" |
| `objective` | `"...detection coverage. YES"` | `"...detection coverage and monitoring checklists."` | **Fixed**: removed "YES", expanded |
| `environment` | `["BloodHound YES"]` | `["BloodHound"]` | **Fixed**: removed "YES" |
| `keyFindings` | `["...attack paths", "YES"]` | 4 verified findings | **Fixed**: removed "YES", added findings |
| `mitreTechniques` | `["T1550.002", "T1558", "T1021.002", "YES"]` | `["T1550.002", "T1558", "T1021.002"]` | **Fixed**: removed "YES" |
| `tools` | `["Impacket", "Rubeus YES"]` | `["BloodHound", "Wireshark", "Impacket", "Rubeus"]` | **Fixed**: removed "YES" |
| `outcome` | `"Built AD security monitoring...\nblabla YES"` | Expanded with detection checklist details | **Fixed**: removed "blabla YES" |
| `context` | Not present | `"Personal Security Lab"` | **Added**: honest context label |
| `reportContent` | Short, basic | Expanded with full investigation report | **Improved**: detailed findings, MITRE table, outcome |

| Field | Before (PowerShell) | After | Change |
|-------|-----|-------|--------|
| `context` | Not present | `"Personal Security Lab"` | **Added**: honest context label |
| `relatedBlogs` | `["understanding-powershell-logging"]` | `[]` | **Fixed**: removed reference to deleted blog |
| `reportContent` | `"...also see http://localhost:4321/portfolio-site"` | Removed dev artifact | **Fixed**: removed localhost URL |

---

## Skills

| Before | After | Change |
|--------|-------|--------|
| Categories: `"Security Monitoring & SIEM"`, `"Endpoint Detection & Response"`, `"IR & Case Management"`, `"Programming & Scripting"`, `"Infrastructure & Automation"`, `"Frameworks & Standards"`, `"AI & Analytics"` | Categories: `"SIEM & Log Analysis"`, `"Network Traffic Analysis"`, `"Endpoint Detection & Response"`, `"IR & Case Management"`, `"Programming & Scripting"`, `"Infrastructure & Operating Systems"`, `"Frameworks & Standards"` | **Reorganized** to match resume structure |
| Included: `Arkime`, `Sysmon`, `Volatility`, `C++`, `JavaScript`, `PHP`, `Ansible`, `Scikit-learn`, `Pandas`, `LLMs`, `ML Pipelines` | Removed: `Arkime`, `Volatility`, `C++`, `JavaScript`, `PHP`, `Ansible`, `Scikit-learn`, `Pandas`, `LLMs`, `ML Pipelines` | **Removed** tools not on resume |
| Missing from resume tools | Added: `Nmap`, `Nessus`, `osquery`, `Windows Event Viewer`, `Virtualization` | **Added** resume-verified tools |

---

## Blogs

| Before | After | Change |
|--------|-------|--------|
| 5 blog directories: `ad/`, `hello/`, `building-home-lab/`, `detection-engineering-101/`, `understanding-powershell-logging/` | 0 (all removed) | **Removed**: all were placeholder/test content |
| `ad/` — title: `"ad"`, description: `"asd"` | Removed | **Removed**: test entry |
| `hello/` — title: `"Hello Updated"`, description: `"test"` | Removed | **Removed**: test entry |
| `building-home-lab/` — content: `"> This is a placeholder article"` | Removed | **Removed**: no real content |
| `detection-engineering-101/` — content: `"> This is a placeholder article"` | Removed | **Removed**: no real content |
| `understanding-powershell-logging/` — content: `"> This is a placeholder article"` | Removed | **Removed**: no real content |

---

## Summary of Integrity Decisions

### Removed (unsupported by source material)
- 3 certifications not on resume (CompTIA Security+, Stanford Cryptography, TryHackMe)
- 1 fake certification ("New Certification A+" / "Comptia bla")
- 1 experience entry not on resume (Fortinet — user re-added later)
- 3 projects not verifiable or with fabricated metrics (IoT Sensor Network, Packet Sniffer)
- 5 placeholder blog posts
- "YES" and "blabla" text from investigation data
- "AI Decision Engine" and "LLM-powered" claims from SOAR (Milestones 2-4 are in progress, not completed)
- "Mean Time To Respond minimized" metric (no evidence)
- Dev artifact URL (`localhost:4321`) from investigation report
- Tools not on resume: Volatility, Ansible, C++, PHP, Scikit-learn, Pandas, LLMs, ML Pipelines

### Softened (honest positioning)
- SOAR role: "Cybersecurity Team Lead" → "SOAR Architect"
- Investigation context: Added "Personal Security Lab" label
- Hero: "SOC Analyst" → "Cybersecurity Student" (in index.astro)
- Investigation dates: Future dates (2026) retained as-is from original data

### Added (verified from source material)
- 3 projects from SUTech labs (NeonNet CyberDeck, AutoConfigLab, Inventory Vault)
- 2 certifications from resume (Cisco Cyber Threat Management, Cisco Networking Basics)
- Resume-verified experience highlights for all internship entries
- Certificate images from `public/certs/`
- Investigation context labels

### Left Unresolved
- Investigation dates are future (2026) — cannot verify actual dates from sources
- Fortinet entry (user-added, not on resume) — kept as user added it intentionally
