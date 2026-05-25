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
    tags: ['soar', 'siem', 'ai', 'orchestration', 'docker', 'blue-team'],
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
    tags: ['python', 'networking', 'forensics'],
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
    slug: 'online-purchase-system',
    title: 'Online Purchase System · Database Design',
    objective: 'Designed and implemented a relational database for an online shopping platform managing users, products, orders, and payments.',
    severity: 'medium' as const,
    timeline: 'Apr 2025',
    tags: ['database', 'sql', 'mysql', 'schema'],
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
    tags: ['python', 'json', 'planning', 'teamwork'],
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
    slug: 'cryptoflux',
    title: 'Cryptoflux · CLI Encoding Utility',
    objective: 'Developed a Python command-line utility for real-time encoding and decoding across binary, hexadecimal, ASCII, and integer formats.',
    severity: 'low' as const,
    timeline: 'Personal Project',
    tags: ['python', 'cryptography', 'cli', 'encoding'],
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
  {
    slug: 'sutech-labs',
    title: 'SUTech-courses-labs · Academic Lab Archive',
    objective: 'Comprehensive collection of university lab work, exercises, and practical projects completed during coursework at SUTech.',
    severity: 'medium' as const,
    timeline: '2024–2025',
    tags: ['academic', 'labs', 'full-stack', 'archive'],
    stack: ['PHP', 'Python', 'Laravel', 'Blade', 'JavaScript', 'Shell'],
    details: [
      'Archives lab implementations, experiments, and assignments across multiple courses',
      'Showcases practical experience in PHP, Python, JavaScript, and shell scripting',
      'Includes configuration files, documentation, and experiment results',
      'Serves as a portfolio of applied skills and continuous learning',
    ],
    github: 'https://github.com/PM-CyberSec/SUTech-courses-labs',
    branches: [
      { name: 'DigitalForensics', description: 'Laravel forensics lab app', files: ['app/', 'database/', 'routes/', 'detection-engine/', 'resources/'] },
      { name: 'NetworkOperations', description: 'Ansible automation & network ops', files: ['agent/', 'ansible/', 'monitoring/', 'snmp/', 'BRD.md'] },
      { name: 'WebSecurity', description: 'Laravel web security app', files: ['app/', 'database/', 'routes/', 'public/', 'resources/'] },
      { name: 'DBMS', description: 'SQL schema & Java GUI', files: ['ddl.sql', 'dml.sql', 'ERD.pdf', 'SQLQueryGUI.java', 'sampledata.sql'] },
      { name: 'WebProgramming', description: 'PHP/HTML/CSS exercises', files: ['index.html', 'portfolio.html', 'connect.php', 'submit.php', 'test.js'] },
      { name: 'AdvancedNetworks', description: 'Cisco IoT network project (.pkt)', files: ['iot network project final.pkt'] },
      { name: 'master', description: 'Repository root and course index' },
      { name: 'Linux&Shell', description: 'Template — content pending' },
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
        structure: { repo: 'PM-CyberSec/SUTech-courses-labs', branches: 11, active: 7 },
        domains: [
          { branch: 'DigitalForensics', tech: 'Laravel', focus: 'forensics lab app' },
          { branch: 'NetworkOperations', tech: 'Ansible', focus: 'network automation' },
          { branch: 'WebSecurity', tech: 'Laravel', focus: 'web security' },
          { branch: 'DBMS', tech: 'Java + SQL', focus: 'database design' },
          { branch: 'WebProgramming', tech: 'PHP/HTML/CSS', focus: 'web development' },
          { branch: 'AdvancedNetworks', tech: 'Cisco Packet Tracer', focus: 'IoT networking' },
          { branch: 'Linux&Shell', tech: 'Shell', focus: 'Linux administration' },
        ],
      },
      telemetry: {
        metrics: [
          '11 course branches spanning forensics, networking, security, DBMS, web, and OOP',
          'Tech stack: Laravel, Ansible, PHP, Java, Python, Shell, Cisco Packet Tracer',
          '7 actively populated branches with real lab implementations',
        ],
        repoUrl: 'https://github.com/PM-CyberSec/SUTech-courses-labs',
      },
    },
  },
  {
    slug: 'inventory-vault',
    title: 'Inventory Vault · Product Management Security',
    objective: 'Hardened asset management framework built with Laravel 11, integrating security controls into product lifecycle workflows.',
    severity: 'high' as const,
    timeline: 'Active Development',
    tags: ['laravel', 'php', 'security', 'product-management'],
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
];
