export interface Branch {
  name: string;
  description: string;
  files?: string[];
}

export interface TabData {
  brief: {
    bottleneck: string;
    northStar: string;
  };
  architecture: Record<string, unknown>;
  telemetry: {
    metrics: string[];
    repoUrl?: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  objective: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timeline: string;
  tags: string[];
  stack: string[];
  details: string[];
  github?: string;
  branches?: Branch[];
  fullDescription?: string;
  team?: { name: string; role: string; responsibilities: string }[];
  links?: { label: string; url: string }[];
  tabs?: TabData;
}

export const projects: Project[] = [
  {
    slug: 'cybernest-soar',
    title: 'CyberNest Soar · AI-Enhanced SOAR Platform',
    objective: 'Unified Security Orchestration, Automation, and AI-driven Response Platform — a full-time, tireless SOC Analyst powered by Docker, Wazuh, TheHive, and a neural AI core.',
    severity: 'critical' as const,
    timeline: '2025',
    tags: ['soar', 'siem', 'ai', 'orchestration', 'docker', 'blue-team', 'incident-response', 'fastapi', 'wazuh', 'thehive', 'automation', 'security', 'python'],
    stack: ['Python', 'FastAPI', 'Docker', 'Wazuh', 'TheHive', 'Cortex', 'Zeek', 'Suricata', 'Velociraptor', 'Arkime', 'React', 'PostgreSQL', 'Redis'],
    details: [
      'Full SOAR pipeline integrating Wazuh, Suricata, Zeek, Velociraptor, and Arkime telemetry',
      'AI-driven severity scoring and phishing detection with scikit-learn and LLM classifiers',
      'Automated incident response playbooks for isolation, blacklisting, and enrichment',
      'Docker Compose deployment with 15+ containerised services across 7 repositories',
      'Real-time dashboard with React frontend and FastAPI orchestration backend',
    ],
    github: 'https://github.com/CyberNest-SOAR/CyberNest-Soar',
    branches: [
      { name: 'cyber', description: 'Active dev — SOAR pipeline integrations', files: ['backend/', 'infra/', 'Integration_Stack/', 'playbooks/', 'docker-compose.yml'] },
      { name: 'main', description: 'Stable release branch', files: ['backend/', 'docs/', 'sensors/', 'samples/', 'docker-compose.yml'] },
      { name: 'backend', description: 'FastAPI enrichment & orchestration', files: ['enrichment/', 'models/', 'alerts/', 'playbooks/'] },
      { name: 'frontend', description: 'React dashboard & visualisation', files: ['src/', 'components/', 'dashboard/'] },
      { name: 'temp-testing-cyber-branch', description: 'Integration testing environment' },
      { name: 'test_backend', description: 'Backend API testing' },
      { name: 'temporary', description: 'Experimental features' },
    ],
    fullDescription: 'CyberNestSoar executes the complete defensive cycle: detection (aggregates telemetry across distributed environments), enrichment (injects threat intelligence via CVSS/EPSS API hooks), triage (AI-driven priority scoring), response (automated IR playbooks), and learning (feedback loops). The system includes phishing sentinel AI, predictive scoring ML models, LLM log classifiers, and tactical orchestration. Built as a vendor-agnostic Docker Compose framework deployable on-prem, cloud, or hybrid.',
    team: [
      { name: 'Paula', role: 'SOAR Architect', responsibilities: 'Root orchestration, pipeline integration, IR playbook design, orchestration logic, architecture' },
      { name: 'Hanaa', role: 'NDR Lead', responsibilities: 'Suricata and Zeek deployment, rule engineering, governance, compliance' },
      { name: 'Amir', role: 'SIEM Analyst', responsibilities: 'Wazuh node deployment, telemetry config, threat hunting' },
      { name: 'Ahmed', role: 'EDR & Infra Engineer', responsibilities: 'Velociraptor deployment, vulnerability assessment, incident mitigation' },
      { name: 'Momen', role: 'AI Team Leader', responsibilities: 'Neural architecture, severity scoring, LLM implementation' },
      { name: 'Pavlly', role: 'Database Engineer', responsibilities: 'PostgreSQL and Redis schema design, SQL orchestration' },
      { name: 'Nayra', role: 'AI Model Developer', responsibilities: 'NLP pipeline, feature engineering, model optimisation' },
      { name: 'Steven', role: 'Backend Developer', responsibilities: 'FastAPI service development, API orchestration, system interfacing' },
      { name: 'Habiba', role: 'Frontend Developer', responsibilities: 'React tactical dashboard, UX design, real-time threat visualisation' },
    ],
    tabs: {
      brief: {
        bottleneck: 'SOC analysts overwhelmed by multi-source telemetry, manual triage, and slow incident response — no unified orchestration layer exists across SIEM, EDR, and NDR tools.',
        northStar: 'Mean time to respond (MTTR) reduction: target < 2 min from alert ingestion to automated containment.',
      },
      architecture: {
        pipeline: 'Wazuh (SIEM) → Kafka → FastAPI enrichment → Cortex analysis → TheHive case mgmt → Velociraptor (EDR) response',
        containers: { services: 15, orchestrator: 'Docker Compose', repos: 7 },
        dataFlow: [
          { stage: 'ingest', source: 'Wazuh/Suricata/Zeek', transform: 'normalisation', sink: 'Kafka' },
          { stage: 'enrich', source: 'Kafka', transform: 'CVSS/EPSS scoring + AI classifier', sink: 'PostgreSQL' },
          { stage: 'respond', source: 'PostgreSQL', transform: 'playbook engine', sink: 'Velociraptor/API' },
        ],
        apiSpec: { POST_ALERT: '/api/alert', GET_CASES: '/api/cases', POST_RESPOND: '/api/respond' },
      },
      telemetry: {
        metrics: [
          '15+ containerised services across 7 coordinated repositories',
          'AI severity classifier: scikit-learn + LLM ensemble',
          'CVSS/EPSS/SSVC multi-source vulnerability enrichment pipeline',
          'Real-time React dashboard with live telemetry feed',
        ],
        repoUrl: 'https://github.com/CyberNest-SOAR/CyberNest-Soar',
      },
    },
  },
  {
    slug: 'packet-sniffer',
    title: 'Packet Sniffer · Network Traffic Analyser',
    objective: 'Developed a packet sniffer using Python to capture and analyse network traffic, displaying source/destination IPs, protocols, ports, and payload data.',
    severity: 'high' as const,
    timeline: 'Apr 2025',
    tags: ['python', 'networking', 'forensics', 'packet-capture', 'scapy', 'tkinter', 'wireshark', 'traffic-analysis', 'protocol'],
    stack: ['Python', 'Scapy', 'Tkinter', 'Wireshark'],
    details: [
      'Built real-time packet capture and display system with GUI',
      'Implemented protocol-specific filtering logic',
      'Validated results through controlled network testing against Wireshark',
      'Studied RFCs for protocol standard compliance',
    ],
    tabs: {
      brief: {
        bottleneck: 'No lightweight, scriptable packet sniffer available for rapid protocol-level traffic inspection and educational analysis.',
        northStar: 'Packet capture accuracy vs Wireshark baseline: target 100% protocol match on TCP/UDP/ICMP.',
      },
      architecture: {
        captureEngine: { library: 'Scapy', mode: 'promiscuous', filter: 'BPF syntax' },
        gui: { framework: 'Tkinter', components: ['live capture view', 'protocol filter', 'payload hex dump'] },
        validation: { tool: 'Wireshark', method: 'side-by-side packet comparison' },
        dataFlow: ['NIC → Scapy capture → protocol parser → GUI render'],
      },
      telemetry: {
        metrics: [
          'Real-time capture with protocol filtering (TCP/UDP/ICMP)',
          'Payload inspection with hex dump output',
          'Validated against Wireshark for accuracy',
        ],
      },
    },
  },
  {
    slug: 'inventory-vault',
    title: 'Inventory Vault · Product Management Security',
    objective: 'Hardened asset management framework built with Laravel 11, integrating security controls into product lifecycle workflows.',
    severity: 'high' as const,
    timeline: 'Active Development',
    tags: ['laravel', 'php', 'security', 'product-management', 'blade', 'inventory', 'crud', 'authentication', 'web-security'],
    stack: ['Laravel 11', 'PHP', 'Blade', 'CSS', 'JavaScript'],
    details: [
      'Built on Laravel 11 with Blade templating and responsive UI',
      'Integrates security controls into product management workflows',
      'Implements inventory tracking with hardened access controls',
      'Deployed in staging environment for continuous testing and iteration',
    ],
    github: 'https://github.com/PM-CyberSec/WebSec240102688',
    branches: [
      { name: 'master', description: 'Main branch — Laravel 11 app scaffold' },
      { name: 'Midterm25', description: 'Midterm 2025 — product CRUD & auth' },
      { name: 'project', description: 'Feature development — inventory workflows' },
    ],
    tabs: {
      brief: {
        bottleneck: 'Asset management systems often lack integrated security controls — inventory tracking without access hardening leaves systems exposed.',
        northStar: 'Zero unauthenticated inventory operations: enforce ACL checks on every CRUD endpoint.',
      },
      architecture: {
        framework: { name: 'Laravel 11', templating: 'Blade', frontend: 'CSS + JavaScript' },
        security: ['middleware auth gates', 'role-based inventory access', 'CSRF + XSS protection'],
        dataModel: { entities: ['products', 'categories', 'users', 'inventory_logs'] },
        deployment: { environment: 'staging', cycle: 'continuous iteration' },
      },
      telemetry: {
        metrics: [
          'Laravel 11 scaffold with Blade templating and responsive CSS',
          'Hardened access controls on all inventory CRUD operations',
          'Staging deployment with continuous iteration pipeline',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/WebSec240102688',
      },
    },
  },
  {
    slug: 'neonnet-secure-messenger',
    title: 'NeonNet · End-to-End Encrypted Messenger',
    objective: 'End-to-end encrypted messaging and file transfer system over TCP relay with RSA-4096 + AES-256-GCM hybrid encryption. Server sees only ciphertext — zero knowledge, absolute privacy.',
    severity: 'high' as const,
    timeline: 'May 2026',
    tags: ['bash', 'cryptography', 'encryption', 'networking', 'linux', 'shell', 'secure-comms', 'end-to-end', 'rsa', 'aes', 'openssl', 'messaging', 'tcp'],
    stack: ['Bash', 'Python', 'OpenSSL', 'TCP', 'Curses'],
    details: [
      'Hybrid encryption pipeline: RSA-4096 OAEP key exchange + AES-256-GCM message encryption',
      'Digital signatures via RSA-PSS-SHA256 for message authenticity',
      'TCP socket relay with Python AsyncIO multiplexing for multi-client support',
      'Terminal UI with Bash Curses framework for real-time chat interface',
      'Secure file transfer with 25 MB limit, encrypted end-to-end',
      'Private key protection with chmod 600 and local-only storage',
      'Automated key generation, distribution, and rotation via OpenSSL CLI',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/Linux%26Shell',
    branches: [
      { name: 'master', description: 'Repository root and course index' },
      { name: 'Linux%26Shell', description: 'NeonNet encrypted messenger — Bash + Python + OpenSSL' },
    ],
    tabs: {
      brief: {
        bottleneck: 'Traditional messaging systems rely on centralized trust exposing plaintext at the server layer. No lightweight, terminal-native, end-to-end encrypted solution exists for cybersecurity education.',
        northStar: 'Zero plaintext exposure: server processes ciphertext only. End-to-end encryption with RSA-4096 + AES-256-GCM for every message and file.',
      },
      architecture: {
        encryption: { keyExchange: 'RSA-4096 OAEP', messageCipher: 'AES-256-GCM', signatures: 'RSA-PSS-SHA256' },
        network: { protocol: 'TCP relay', transport: 'Python AsyncIO', ui: 'Bash Curses TUI' },
        modules: {
          launcher: 'ciphershell.sh — project orchestrator',
          crypto: 'Bash wrappers calling Python cipher engine (RSA + AES)',
          server: 'TCP relay server (start/stop/status/foreground)',
          client: 'CLI node with key management and chat interface',
          config: 'Environment-based configuration loader',
          lib: 'Shared common library for all Bash modules',
        },
        dataFlow: ['Client A → encrypt (RSA pub + AES) → TCP relay → decrypt (RSA priv) → Client B'],
      },
      telemetry: {
        metrics: [
          '90% Bash / 10% Python — cryptography and socket orchestration',
          'RSA-4096 OAEP key exchange + AES-256-GCM hybrid encryption',
          'TCP relay supporting multiple concurrent encrypted sessions',
          'File transfer with end-to-end encryption up to 25 MB',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/Linux%26Shell',
      },
    },
  },
  {
    slug: 'online-purchase-system',
    title: 'Online Purchase System · Database Design',
    objective: 'Designed and implemented a relational database for an online shopping platform managing users, products, orders, and payments.',
    severity: 'medium' as const,
    timeline: 'Apr 2025',
    tags: ['database', 'sql', 'mysql', 'schema', 'normalization', '3nf', 'erd', 'relational', 'e-commerce', 'db-design'],
    stack: ['MySQL', 'SQL', 'dbdiagram.io', 'MySQL Workbench'],
    details: [
      'Built a fully normalised database in 3rd Normal Form (3NF)',
      'Authored a complete relational schema with ERD visualisation',
      'Developed sample data and complex SQL queries for testing',
      'Prepared comprehensive presentation showcasing full database lifecycle',
    ],
    tabs: {
      brief: {
        bottleneck: 'E-commerce platforms often lack clean, normalised relational schemas — leading to data redundancy, update anomalies, and slow queries.',
        northStar: 'Schema normalisation: achieve 3rd Normal Form (3NF) with zero update anomalies across 6+ entity relationships.',
      },
      architecture: {
        schema: { tables: ['users', 'products', 'orders', 'order_items', 'payments', 'categories'], normalForm: '3NF' },
        erd: { tool: 'dbdiagram.io', format: 'PDF + interactive web view' },
        queries: ['JOIN aggregations', 'subqueries for reporting', 'indexed search optimisation'],
      },
      telemetry: {
        metrics: [
          '6 relational tables fully normalised to 3NF',
          'Complex SQL queries: JOINs, subqueries, aggregations',
          'Complete ERD with visualisation and presentation',
        ],
      },
    },
  },
  {
    slug: 'e-commerce-catalogue',
    title: 'E-Commerce · Product Catalogue System',
    objective: 'Built a system to manage a product catalogue for an online store with team coordination and planning.',
    severity: 'medium' as const,
    timeline: 'Dec 2024',
    tags: ['python', 'json', 'planning', 'teamwork', 'product-catalogue', 'mermaid', 'e-commerce', 'inventory'],
    stack: ['Python', 'JSON', 'Mermaid'],
    details: [
      'Developed a scalable product management system',
      'Led project planning, problem-solving, and team coordination',
      'Used Mermaid for system architecture visualisation',
      'Mentored team members on technical concepts and implementation',
    ],
    tabs: {
      brief: {
        bottleneck: 'Small teams lack structured product catalogue management — manual tracking leads to inventory drift and planning inefficiencies.',
        northStar: 'Team velocity: reduce product entry time by 60% through structured JSON-driven workflows.',
      },
      architecture: {
        dataLayer: { format: 'JSON', schema: 'product catalogue with categories, variants, SKU' },
        visualization: { tool: 'Mermaid', diagrams: ['system architecture', 'data flow', 'team workflow'] },
        management: ['agile planning', 'sprint-based delivery', 'peer mentoring'],
      },
      telemetry: {
        metrics: [
          'JSON-driven product catalogue with structured schema',
          'Mermaid architecture diagrams for system visualisation',
          'Team mentoring and sprint-based delivery workflow',
        ],
      },
    },
  },
  {
    slug: 'sutech-labs',
    title: 'SUTech-courses-labs · Academic Lab Archive',
    objective: 'Comprehensive collection of university lab work, exercises, and practical projects completed during coursework at SUTech.',
    severity: 'medium' as const,
    timeline: '2024–2025',
    tags: ['academic', 'labs', 'full-stack', 'archive', 'university', 'coursework', 'laravel', 'ansible', 'forensics', 'networking'],
    stack: ['PHP', 'Python', 'Laravel', 'Blade', 'JavaScript', 'Shell'],
    details: [
      'Archives lab implementations, experiments, and assignments across multiple courses',
      'Showcases practical experience in PHP, Python, JavaScript, and shell scripting',
      'Includes configuration files, documentation, and experiment results',
      'Serves as a portfolio of applied skills and continuous learning',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs',
    branches: [
      { name: 'DigitalForensics', description: 'Laravel forensics lab app (→ DLDS)', files: ['app/', 'database/', 'routes/', 'detection-engine/', 'resources/'] },
      { name: 'NetworkOperations', description: 'Ansible automation & network ops (→ AutoConfigLab)', files: ['agent/', 'ansible/', 'monitoring/', 'snmp/', 'BRD.md'] },
      { name: 'WebSecurity', description: 'Laravel web security app (→ Inventory Vault)', files: ['app/', 'database/', 'routes/', 'public/', 'resources/'] },
      { name: 'DBMS', description: 'SQL schema & Java GUI (→ Online Purchase System)', files: ['ddl.sql', 'dml.sql', 'ERD.pdf', 'SQLQueryGUI.java', 'sampledata.sql'] },
      { name: 'WebProgramming', description: 'PHP/HTML/CSS exercises (→ Static Web UI)', files: ['index.html', 'portfolio.html', 'connect.php', 'submit.php', 'test.js'] },
      { name: 'AdvancedNetworks', description: 'Cisco IoT network project (→ IoT Sensor Network)', files: ['iot network project final.pkt'] },
      { name: 'master', description: 'Repository root and course index' },
      { name: 'Linux&Shell', description: 'NeonNet encrypted messenger (→ NeonNet)', files: ['ciphershell.sh', 'server/', 'client/', 'crypto/', 'config/', 'lib/', 'scripts/', 'tests/'] },
      { name: 'NetworkingBasics', description: 'Template — content pending' },
      { name: 'OOP-JAVA', description: 'Template — content pending' },
      { name: 'Python', description: 'Template — content pending' },
    ],
    tabs: {
      brief: {
        bottleneck: 'University lab work scattered across disconnected branches with no unified view of academic progress and applied skills.',
        northStar: 'Branch coverage across 11 lab domains: target 100% populated content in all course categories.',
      },
      architecture: {
        structure: { repo: 'PM-CyberSec/SUTech-courses-labs', branches: 11, active: 8 },
        domains: [
          { branch: 'DigitalForensics', tech: 'Laravel', focus: 'forensics lab app' },
          { branch: 'NetworkOperations', tech: 'Ansible', focus: 'network automation (AutoConfigLab)' },
          { branch: 'WebSecurity', tech: 'Laravel', focus: 'web security (Inventory Vault)' },
          { branch: 'DBMS', tech: 'Java + SQL', focus: 'database design (Online Purchase)' },
          { branch: 'WebProgramming', tech: 'PHP/HTML/CSS', focus: 'web development (Static Web UI)' },
          { branch: 'AdvancedNetworks', tech: 'Cisco Packet Tracer', focus: 'IoT networking (Sensor Network)' },
          { branch: 'Linux&Shell', tech: 'Shell', focus: 'Linux administration (NeonNet)' },
        ],
      },
      telemetry: {
        metrics: [
          '11 course branches spanning forensics, networking, security, DBMS, web, and OOP',
          'Tech stack: Laravel, Ansible, PHP, Java, Python, Shell, Cisco Packet Tracer',
          '8 actively populated branches — most featured as standalone portfolio projects',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs',
      },
    },
  },
  {
    slug: 'dlds-forensics',
    title: 'DLDS · Digital Forensics & Detection System',
    objective: 'Comprehensive digital forensics and threat detection platform with real-time event monitoring, network analysis, process tracking, and alert correlation.',
    severity: 'medium' as const,
    timeline: 'May 2026',
    tags: ['digital-forensics', 'laravel', 'detection', 'python', 'security', 'threat-detection', 'ai', 'forensics', 'zeek', 'suricata', 'react', 'monitoring'],
    stack: ['Laravel', 'React', 'Python', 'MySQL', 'Zeek', 'Suricata'],
    details: [
      'Agent-based monitoring architecture with real-time event correlation',
      'Network traffic analysis pipeline using Zeek and Suricata telemetry',
      'Process tracking and alert correlation engine in Python',
      'Laravel + React dashboard for forensic case management',
      'Automated evidence collection and chain-of-custody logging',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/DigitalForensics',
    branches: [
      { name: 'DigitalForensics', description: 'DLDS — Laravel + React + Python forensics engine' },
    ],
    tabs: {
      brief: {
        bottleneck: 'Digital forensics investigations rely on manual evidence collection across disparate tools — no unified platform for real-time monitoring, detection, and case management.',
        northStar: 'Sub-minute alert correlation: aggregate Zeek, Suricata, and process telemetry into actionable forensic cases.',
      },
      architecture: {
        detectionEngine: { framework: 'Laravel + React', agents: 'Python-based endpoint collectors', telemetry: ['Zeek (network)', 'Suricata (IDS)', 'process tracking'] },
        dataFlow: ['Endpoints → Python agents → Laravel API → React dashboard'],
        caseManagement: { evidence: 'automated chain-of-custody', alerts: 'real-time correlation engine' },
      },
      telemetry: {
        metrics: [
          'Agent-based monitoring with Python telemetry collectors',
          'Zeek + Suricata network analysis pipeline',
          'Laravel + React forensic case management dashboard',
          'Real-time alert correlation and evidence logging',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/DigitalForensics',
      },
    },
  },
  {
    slug: 'iot-sensor-network',
    title: 'IoT Sensor Network · Secure Enterprise Topology',
    objective: 'Enterprise-style IoT and sensor network simulation using VLAN segmentation, inter-VLAN routing, and centralized monitoring on Cisco Packet Tracer.',
    severity: 'medium' as const,
    timeline: 'May 2026',
    tags: ['networking', 'cisco', 'iot', 'vlan', 'packet-tracer', 'security', 'switching', 'topology', 'stp', 'snmp', 'enterprise'],
    stack: ['Cisco Packet Tracer', 'VLAN', 'Multilayer Switching'],
    details: [
      'Hierarchical enterprise topology with multilayer switch (3560) core',
      'VLAN segmentation for IoT, sensor, and management traffic isolation',
      'Inter-VLAN routing with access control lists for security',
      'Centralized monitoring and SNMP configuration for network telemetry',
      'STP, EtherChannel, and HSRP for high-availability design',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/AdvancedNetworks',
    branches: [
      { name: 'AdvancedNetworks', description: 'IoT sensor network — Cisco Packet Tracer topology', files: ['iot network project final.pkt'] },
    ],
    tabs: {
      brief: {
        bottleneck: 'IoT devices are often deployed on flat networks with no isolation — a single compromised sensor can lead to lateral movement across the entire infrastructure.',
        northStar: 'Zero lateral movement: VLAN segmentation enforces device isolation; inter-VLAN ACLs permit only authorized traffic flows.',
      },
      architecture: {
        topology: { core: 'Multilayer Switch 3560', distribution: 'Layer 3 switching', access: 'VLAN-tagged IoT segments' },
        vlans: [
          { id: 10, name: 'Management', devices: 'admins, monitoring' },
          { id: 20, name: 'IoT_Sensors', devices: 'temperature, humidity, motion' },
          { id: 30, name: 'Cameras', devices: 'IP surveillance' },
        ],
        protocols: ['VTP', 'STP', 'EtherChannel', 'HSRP', 'SNMP', 'ACLs'],
      },
      telemetry: {
        metrics: [
          'Hierarchical enterprise topology with multilayer switching',
          '3 VLAN segments for IoT/sensor/management isolation',
          'Inter-VLAN routing with ACL-based traffic control',
          'STP + EtherChannel + HSRP for high availability',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/AdvancedNetworks',
      },
    },
  },
  {
    slug: 'static-web-ui',
    title: 'Static Web UI · Web Programming Lab',
    objective: 'Collection of static web pages and scripts demonstrating frontend design with HTML/CSS and backend logic with PHP.',
    severity: 'low' as const,
    timeline: 'May 2026',
    tags: ['web-development', 'html', 'css', 'javascript', 'php', 'frontend', 'backend', 'static-site', 'responsive'],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
    details: [
      'Multi-page static website with responsive CSS layout',
      'PHP backend for form handling and server-side logic',
      'JavaScript interactivity for dynamic UI elements',
      'Portfolio-style presentation page included as a showcase',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/WebProgramming',
    branches: [
      { name: 'WebProgramming', description: 'Static web UI — HTML/CSS/JS/PHP lab exercises' },
    ],
    tabs: {
      brief: {
        bottleneck: 'Web programming fundamentals are often taught in isolation — this lab bridges frontend design (HTML/CSS) with backend logic (PHP) in a cohesive multi-page project.',
        northStar: 'Full request-to-response cycle: from static HTML pages to PHP form processing with JavaScript-enhanced interactivity.',
      },
      architecture: {
        pages: ['index.html (landing)', 'portfolio.html (showcase)', 'connect.php (form handler)', 'submit.php (POST processor)'],
        stack: ['HTML5 semantic markup', 'CSS3 responsive layout', 'JavaScript DOM manipulation', 'PHP server-side processing'],
        dataFlow: ['Browser → HTML/CSS render → JS interactivity → PHP form → server response'],
      },
      telemetry: {
        metrics: [
          '4-page static site with PHP backend integration',
          'Responsive CSS layout with semantic HTML5',
          'JavaScript-powered dynamic UI elements',
          'Complete form submission cycle: client → PHP → response',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs/tree/WebProgramming',
      },
    },
  },
  {
    slug: 'cryptoflux',
    title: 'Cryptoflux · CLI Encoding Utility',
    objective: 'Developed a Python command-line utility for real-time encoding and decoding across binary, hexadecimal, ASCII, and integer formats.',
    severity: 'low' as const,
    timeline: 'Personal Project',
    tags: ['python', 'cryptography', 'cli', 'encoding', 'binary', 'hex', 'ascii', 'conversion', 'ctf', 'terminal'],
    stack: ['Python', 'colorama', 'argparse'],
    details: [
      'Interactive CLI with support for multiple number base conversions',
      'Real-time encoding/decoding across binary, hex, ASCII, and integers',
      'Built with colorama for enhanced terminal UI',
      'Custom logic for advanced conversion functionality',
    ],
    tabs: {
      brief: {
        bottleneck: 'No simple CLI utility exists for rapid ad-hoc encoding conversions across binary, hex, ASCII, and integer formats during CTF/forensics work.',
        northStar: 'Conversion throughput: process 100+ encoding operations per session with zero errors.',
      },
      architecture: {
        modes: ['binary', 'hexadecimal', 'ASCII', 'integer'],
        cli: { framework: 'argparse', ui: 'colorama terminal styling' },
        pipeline: 'input → format detection → base conversion → formatted output',
        sample: { input: '48656C6C6F', from: 'hex', to: 'ascii', result: 'Hello' },
      },
      telemetry: {
        metrics: [
          '4 encoding modes: binary, hex, ASCII, integer',
          'Real-time conversion with interactive CLI',
          'Colorama-enhanced terminal user interface',
        ],
      },
    },
  },
];
