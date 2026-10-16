export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  cormorantWord: string;
  description: string;
  color: string;
  accentBg: string;
  badge: string;
  featured: boolean;
  keyBenefits: string[];
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  metrics: { value: string; label: string }[];
  ctaText: string;
  detailedContent: {
    overview: string;
    approach: string;
    architectureHighlights: string[];
    outcomes: string[];
  };
}

export const servicesData: ServiceItem[] = [
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    headline: "Engineered for Resilience, Scalability & Precision.",
    cormorantWord: "Resilience",
    description:
      "We design and build bespoke enterprise software, modern microservices, and distributed architectures tailored to complex business logic and high operational throughput.",
    color: "#E92B2B", // 1. Durozen Red
    accentBg: "bg-[#E92B2B]/10",
    badge: "CORE ENGINEERING",
    featured: true,
    keyBenefits: [
      "Tailored precisely to proprietary enterprise business workflows",
      "Eliminates licensing fees and limitations of off-the-shelf software",
      "High-throughput microservices architecture with zero single points of failure",
      "100% intellectual property ownership and clean codebase handoff",
    ],
    capabilities: [
      "Enterprise Web & Mobile Applications",
      "High-Throughput Microservice Architecture",
      "Legacy Core Modernization & Refactoring",
      "Event-Driven Real-Time Data Systems",
      "Resilient Distributed Backends (Go, Node, Python)",
    ],
    deliverables: [
      "Production-grade clean codebase with 90%+ test coverage",
      "CI/CD deployment automation and containerization",
      "Comprehensive OpenAPI specifications and architecture diagrams",
      "Monitoring, alerting, and observability instrumentation",
    ],
    technologies: [
      "TypeScript",
      "React / Next.js",
      "Node.js",
      "Go",
      "Python",
      "PostgreSQL",
      "Redis",
      "Kafka",
    ],
    metrics: [
      { value: "99.98%", label: "System Availability" },
      { value: "4.2x", label: "Throughput Acceleration" },
      { value: "100%", label: "Code Ownership & IP" },
    ],
    ctaText: "Consult Our Software Architects",
    detailedContent: {
      overview:
        "Off-the-shelf software inevitably creates bottlenecks when business models demand proprietary agility. Durozen engineers high-performance custom platforms that eliminate technical debt and scale seamlessly under peak enterprise loads.",
      approach:
        "We employ domain-driven design (DDD), modular component architectures, and rigorous automated testing from day zero. Our teams work as an extension of your engineering organization, establishing clean communication rhythms and transparent sprints.",
      architectureHighlights: [
        "Micro-frontend and decoupled backend modularity for agile team velocity",
        "CQRS and event sourcing patterns for absolute auditability in financial/operational data",
        "Stateless containerized service mesh ensuring horizontal autoscaling",
        "Strict static analysis, automated linting, and zero-compromise security posture",
      ],
      outcomes: [
        "Eliminated 65% of repetitive operational tasks across client workflows",
        "Decreased average API response times from 340ms to under 42ms",
        "Zero unscheduled downtime across multi-million user transactional loads",
      ],
    },
  },
  {
    id: "enterprise-applications",
    slug: "enterprise-applications",
    title: "Enterprise Application Development",
    shortTitle: "Enterprise Apps",
    headline: "Mission-Critical Systems Built for Multi-Tier Organizations.",
    cormorantWord: "Mission-Critical",
    description:
      "Large-scale software ecosystems engineered for security, high-concurrency workflows, transactional consistency, and enterprise governance.",
    color: "#2647A5", // Durozen Blue
    accentBg: "bg-[#2647A5]/10",
    badge: "ENTERPRISE SYSTEMS",
    featured: false,
    keyBenefits: [
      "Unified operational visibility across distributed corporate entities",
      "Role-based granular access control (RBAC) and audit trails",
      "Seamless integration with legacy ERP, CRM, and accounting engines",
      "High-availability clustering with zero-downtime rolling updates",
    ],
    capabilities: [
      "Multi-Tenant Enterprise SaaS Architecture",
      "Distributed Transaction Orchestration & Sagas",
      "Identity Management & SSO (SAML 2.0 / OAuth2 / OIDC)",
      "Automated Audit Logging & Compliance Enforcers",
      "High-Throughput Batch Processing Pipelines",
    ],
    deliverables: [
      "Scalable multi-tiered architecture blueprints",
      "Encrypted relational and document data storage vaults",
      "Granular role-based permissions matrix and admin dashboards",
      "Enterprise disaster recovery runbooks and automated backups",
    ],
    technologies: ["Java", "Spring Boot", "Go", "Next.js", "PostgreSQL", "Docker", "Kubernetes"],
    metrics: [
      { value: "99.99%", label: "Enterprise SLA" },
      { value: "SOC 2", label: "Compliance Ready" },
      { value: "Zero", label: "Data Inconsistency" },
    ],
    ctaText: "Engineer Your Enterprise Platform",
    detailedContent: {
      overview:
        "Enterprise organizations demand applications that withstand massive transaction surges, protect proprietary data assets, and integrate harmoniously with entrenched core databases.",
      approach:
        "We build with modularity and strict contractual boundaries, ensuring that each business domain operates independently while maintaining transactional integrity.",
      architectureHighlights: [
        "Distributed Saga orchestration for multi-database transactions",
        "Zero-trust credential isolation and encrypted secrets vaults",
        "Automated health probes, liveness checks, and self-healing pods",
      ],
      outcomes: [
        "Consolidated 4 disparate legacy portals into 1 unified enterprise hub",
        "Accelerated corporate cross-department approvals by 70%",
      ],
    },
  },
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Web Development",
    headline: "High-Performance Modern Web Platforms That Convert.",
    cormorantWord: "Convert",
    description:
      "Lightning-fast, search-engine-optimized, and visually stunning corporate websites built using modern Jamstack architectures, Next.js, and headless CMS frameworks.",
    color: "#4C9B35", // Durozen Green
    accentBg: "bg-[#4C9B35]/10",
    badge: "DIGITAL PRESENCE",
    featured: false,
    keyBenefits: [
      "Sub-second page load speeds delivering 95+ Google Lighthouse scores",
      "Comprehensive Technical SEO architecture for high organic visibility",
      "Intuitive headless CMS empowering marketing teams to publish effortlessly",
      "Fully responsive, accessible design across desktop, tablet, and mobile",
    ],
    capabilities: [
      "Headless CMS Integration (Sanity, Strapi, Contentful)",
      "Next.js Server-Side Rendering (SSR) & Static Generation (SSG)",
      "Interactive 3D Graphics & Micro-Animations",
      "Technical SEO & Structured Schema Markup",
      "Global CDN Edge Caching & Asset Optimization",
    ],
    deliverables: [
      "Custom responsive Next.js web application",
      "Configured Headless CMS with custom schemas",
      "Technical SEO audit and XML sitemap configuration",
      "Integrated web analytics and lead capture endpoints",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    metrics: [
      { value: "< 0.6s", label: "First Contentful Paint" },
      { value: "100", label: "Lighthouse Performance" },
      { value: "100%", label: "Mobile Responsive" },
    ],
    ctaText: "Launch Your Modern Website",
    detailedContent: {
      overview:
        "Your website is the frontline of your brand's technical credibility. We engineer web experiences that combine striking typography, fluid micro-interactions, and instant page response times.",
      approach:
        "Leveraging Next.js App Router and edge caching, we eliminate bloated page scripts and deliver ultra-lean HTML and CSS directly from regional CDN edges.",
      architectureHighlights: [
        "React Server Components for minimal client-side JavaScript payloads",
        "Automatic WebP/AVIF image transcoding and responsive resolution serving",
        "Edge middleware for instant geo-routing and localized content delivery",
      ],
      outcomes: [
        "Tripled client organic search conversions within 90 days of launch",
        "Reduced mobile bounce rates by 48% via sub-second loading",
      ],
    },
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    headline: "Fluid Native & Cross-Platform Experiences for iOS & Android.",
    cormorantWord: "Fluid",
    description:
      "Native and high-performance cross-platform mobile applications engineered with Flutter and React Native, featuring offline sync, biometric security, and push notifications.",
    color: "#E92B2B", // Durozen Red
    accentBg: "bg-[#E92B2B]/10",
    badge: "MOBILE ENGINEERING",
    featured: false,
    keyBenefits: [
      "Single unified codebase reducing development and maintenance overhead by 40%",
      "Smooth 60/120 FPS native gesture animations and fluid navigation",
      "Robust offline data persistence with automated background sync",
      "Comprehensive App Store and Google Play publication management",
    ],
    capabilities: [
      "Cross-Platform Flutter & React Native Engineering",
      "Native iOS (Swift) & Android (Kotlin) Module Bridges",
      "Biometric Authentication (FaceID / Fingerprint)",
      "Push Notifications via Firebase Cloud Messaging (FCM)",
      "Offline-First SQLite / WatermelonDB Persistence",
    ],
    deliverables: [
      "Compiled iOS and Android production application binaries",
      "Comprehensive mobile automated UI and unit test suites",
      "App Store & Google Play listing assets and metadata",
      "Over-the-Air (OTA) hot update configuration",
    ],
    technologies: ["Flutter", "React Native", "TypeScript", "Dart", "Firebase", "SQLite"],
    metrics: [
      { value: "60 FPS", label: "Smooth Animation Fidelity" },
      { value: "4.8+", label: "Target App Store Rating" },
      { value: "Offline", label: "Local Data Synchronization" },
    ],
    ctaText: "Build Your Mobile App",
    detailedContent: {
      overview:
        "Modern mobile users demand instantaneous response times and intuitive gestures. We engineer mobile solutions that feel native, respect battery life, and operate reliably even in intermittent network environments.",
      approach:
        "We prioritize offline-first data caching and strict state management patterns, ensuring apps remain interactive regardless of cellular connectivity drops.",
      architectureHighlights: [
        "Bi-directional local database reconciliation with backend conflict resolution",
        "Hardware-accelerated rendering pipelines delivering silky 60fps frame rates",
        "Strict background telemetry throttling for minimal battery drain",
      ],
      outcomes: [
        "Shipped institutional mobile app serving thousands of daily active students and faculty",
        "Zero crash rates recorded across 50,000+ app sessions",
      ],
    },
  },
  {
    id: "cloud-engineering",
    slug: "cloud-engineering",
    title: "Cloud Engineering",
    shortTitle: "Cloud Engineering",
    headline: "Architecting Cloud Infrastructure That Never Sleeps.",
    cormorantWord: "Never Sleeps",
    description:
      "Modernize infrastructure with cloud-native architectures, automated Kubernetes clusters, infrastructure as code, multi-region resilience, and elastic scalability.",
    color: "#F9A916", // 2. Durozen Yellow
    accentBg: "bg-[#F9A916]/10",
    badge: "INFRASTRUCTURE",
    featured: true,
    keyBenefits: [
      "99.99% high-availability SLA through multi-region automated failover",
      "Substantial 30-45% cloud infrastructure cost optimization and FinOps auditing",
      "Elimination of configuration drift through automated Infrastructure as Code",
      "Hardened cloud security posture aligned with international regulatory benchmarks",
    ],
    capabilities: [
      "Cloud Architecture (AWS, Google Cloud, Azure)",
      "Kubernetes & Container Orchestration",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Zero-Trust Cloud Security & Compliance",
      "Serverless & Edge Computing Deployment",
    ],
    deliverables: [
      "Modular, version-controlled Terraform / OpenTofu repositories",
      "Automated blue/green and canary deployment pipelines",
      "Multi-region disaster recovery runbooks with sub-minute RTO",
      "Granular cost-optimization and cloud waste reclamation strategy",
    ],
    technologies: [
      "AWS",
      "Google Cloud",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Helm",
      "Prometheus & Grafana",
      "Datadog",
    ],
    metrics: [
      { value: "38%", label: "Average Cloud Cost Reduction" },
      { value: "99.99%", label: "Multi-Region SLA" },
      { value: "< 2 min", label: "Automated Deploy Times" },
    ],
    ctaText: "Modernize Your Cloud Infrastructure",
    detailedContent: {
      overview:
        "Infrastructure shouldn't be a source of anxiety. We engineer resilient, auditable cloud environments that automate mundane operations, secure sensitive data, and scale elastically based on live demand spikes.",
      approach:
        "We treat infrastructure strictly as code. Every networking route, IAM policy, and Kubernetes manifest is versioned in Git, tested automatically, and deployed with zero manual touchpoints.",
      architectureHighlights: [
        "Immutable infrastructure instances with automated patch cycles",
        "Multi-cloud connectivity and isolated VPC topologies",
        "Centralized distributed tracing and automated anomaly alerting",
        "FinOps telemetry delivering line-item cost visibility per feature",
      ],
      outcomes: [
        "Migrated legacy monolithic workloads with zero client-visible downtime",
        "Reduced deploy cycle time from two weeks to continuous 15-minute releases",
        "Passed SOC2 Type II and HIPAA infrastructure audits without non-conformities",
      ],
    },
  },
  {
    id: "devops-services",
    slug: "devops-services",
    title: "DevOps Services",
    shortTitle: "DevOps Services",
    headline: "Automating Delivery Pipelines for Rapid, Fearless Releases.",
    cormorantWord: "Fearless",
    description:
      "Continuous integration, continuous deployment (CI/CD), GitOps workflows, automated testing gates, and proactive monitoring systems that accelerate developer velocity.",
    color: "#2647A5", // Durozen Blue
    accentBg: "bg-[#2647A5]/10",
    badge: "AUTOMATION & VELOCITY",
    featured: false,
    keyBenefits: [
      "Reduces deployment cycle times from weeks to minutes",
      "Eliminates human error through automated staging and production pipelines",
      "Instant automated rollback capabilities in the event of anomalies",
      "Proactive observability preventing outages before customers are impacted",
    ],
    capabilities: [
      "GitOps Continuous Deployment (GitHub Actions, GitLab CI, ArgoCD)",
      "Automated Testing & Security Quality Gates",
      "Centralized Log Aggregation & Distributed Tracing (ELK, OpenTelemetry)",
      "Configuration Management & Secrets Encryption (Vault, AWS Secrets Manager)",
      "Chaos Engineering & Disaster Recovery Drills",
    ],
    deliverables: [
      "Fully automated end-to-end CI/CD release pipelines",
      "Container registry and vulnerability scanning integrations",
      "Real-time alerting dashboards configured for Slack and PagerDuty",
      "Standardized local developer environment containers (Docker Compose)",
    ],
    technologies: ["GitHub Actions", "ArgoCD", "Docker", "Kubernetes", "HashiCorp Vault", "Grafana"],
    metrics: [
      { value: "10x", label: "Deployment Frequency" },
      { value: "90%", label: "Reduction in Change Failure Rate" },
      { value: "< 5 min", label: "Mean Time to Recovery" },
    ],
    ctaText: "Accelerate Your Release Pipeline",
    detailedContent: {
      overview:
        "DevOps is more than tooling; it is an organizational capability that transforms engineering velocity into business momentum.",
      approach:
        "We implement GitOps workflows where the Git repository serves as the single source of truth for declared infrastructure and application state.",
      architectureHighlights: [
        "Automated container build caching delivering sub-minute compilation",
        "Automated ephemeral staging environments spun up per pull request",
        "Zero-downtime blue/green deployment traffic shifting",
      ],
      outcomes: [
        "Enabled client engineering teams to ship multiple daily production updates with zero anxiety",
        "Decreased pull-request validation cycle time by 75%",
      ],
    },
  },
  {
    id: "ai-solutions",
    slug: "ai-solutions",
    title: "AI and Machine Learning Solutions",
    shortTitle: "AI & ML Solutions",
    headline: "Transforming Raw Data into Autonomous Intelligence.",
    cormorantWord: "Intelligence",
    description:
      "Harness customized Large Language Models, autonomous agentic workflows, predictive analytics, and computer vision systems built for production reliability and privacy.",
    color: "#4C9B35", // 3. Durozen Green
    accentBg: "bg-[#4C9B35]/10",
    badge: "COGNITIVE SYSTEMS",
    featured: true,
    keyBenefits: [
      "Automates repetitive manual document processing and data entry",
      "Private, air-gapped LLM deployments ensuring 100% data confidentiality",
      "Deterministic guardrails eliminating hallucinations and incorrect outputs",
      "Scales operational capacity without linear head-count expansion",
    ],
    capabilities: [
      "Enterprise LLM Fine-Tuning & Specialized RAG",
      "Autonomous Multi-Agent Process Automation",
      "Predictive Analytics & Forecasting Models",
      "Computer Vision & Document Intelligence",
      "High-Performance Vector Databases & Semantic Search",
    ],
    deliverables: [
      "Production-ready AI microservices with low-latency streaming APIs",
      "Secure private model hosting with zero corporate data leakage",
      "Automated evaluation benchmark suites for model accuracy and drift",
      "Human-in-the-loop review interfaces for edge-case oversight",
    ],
    technologies: [
      "PyTorch",
      "LangChain",
      "LlamaIndex",
      "OpenAI / Anthropic APIs",
      "Pinecone / Qdrant",
      "FastAPI",
      "Ollama",
    ],
    metrics: [
      { value: "85%", label: "Document Processing Speedup" },
      { value: "99.1%", label: "Semantic Search Precision" },
      { value: "10x", label: "Operational Throughput" },
    ],
    ctaText: "Deploy Production AI Systems",
    detailedContent: {
      overview:
        "Moving beyond experimental prototypes into dependable, enterprise-ready AI. Durozen architects deterministic, hallucination-resistant AI systems that integrate directly into your CRM, ERP, and communication channels.",
      approach:
        "We build layered architectures: combining deterministic business rules, curated vector embeddings, and tailored LLM reasoning. We ensure every AI action is grounded in verified source documents and strictly audited.",
      architectureHighlights: [
        "Hybrid RAG combining BM25 keyword search and dense semantic vector rankings",
        "Stateful agent loops with retry logic, fallback models, and circuit breakers",
        "Strict privacy filters preventing PII from reaching third-party foundation models",
        "Real-time token cost tracking and latency caching layers",
      ],
      outcomes: [
        "Automated 80,000+ monthly invoice and dispatch workflows with 99.4% accuracy",
        "Decreased human support response latency from 45 minutes to 4 seconds",
        "Delivered unified enterprise knowledge search spanning 15 disparate data silos",
      ],
    },
  },
  {
    id: "data-engineering",
    slug: "data-engineering",
    title: "Data Engineering",
    shortTitle: "Data Engineering",
    headline: "Robust Pipelines Transforming Data into Decision Advantage.",
    cormorantWord: "Decision",
    description:
      "Design and construction of scalable ETL/ELT pipelines, real-time data streaming architectures, modern data warehouses, and governed data mesh topologies.",
    color: "#F9A916", // Durozen Yellow
    accentBg: "bg-[#F9A916]/10",
    badge: "DATA PIPELINES",
    featured: false,
    keyBenefits: [
      "Breaks down enterprise data silos into unified, queryable repositories",
      "Real-time ingestion enabling instant executive decisions and live alerts",
      "Automated data quality validation and schema drift detection",
      "Cost-effective data lake storage paired with high-speed analytical engines",
    ],
    capabilities: [
      "Batch & Stream Processing (Apache Kafka, Spark, Flink)",
      "Modern Data Warehousing (Snowflake, BigQuery, ClickHouse)",
      "Automated Data Orchestration (Airflow, Dagster)",
      "Data Quality Testing & Governance (dbt, Great Expectations)",
      "CDC (Change Data Capture) Pipeline Construction (Debezium)",
    ],
    deliverables: [
      "Clean, modular dbt data transformation models",
      "Automated daily/hourly ETL extraction and loading pipelines",
      "Enterprise analytics warehouse schema design",
      "Data catalog and lineage documentation",
    ],
    technologies: ["Kafka", "Apache Spark", "ClickHouse", "PostgreSQL", "dbt", "Airflow", "Python"],
    metrics: [
      { value: "Sub-Second", label: "Query Execution Speed" },
      { value: "100M+", label: "Daily Processed Events" },
      { value: "99.99%", label: "Pipeline Reliability" },
    ],
    ctaText: "Architect Your Data Pipeline",
    detailedContent: {
      overview:
        "Modern enterprises generate vast volumes of operational telemetry. Without resilient data engineering pipelines, data remains trapped in transactional silos, unable to inform strategic decisions.",
      approach:
        "We construct decoupled data ingestion fabrics using Kafka and CDC, populating columnar analytical stores for sub-second aggregations.",
      architectureHighlights: [
        "Columnar ClickHouse and Snowflake storage for instant metric aggregations",
        "Automated schema validation preventing corrupt data from poisoning reporting tables",
        "Immutable audit logs guaranteeing absolute historical data lineage",
      ],
      outcomes: [
        "Reduced executive reporting generation time from 4 days to real-time dashboards",
        "Ingested over 100 million daily telemetry points with zero message drop",
      ],
    },
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    headline: "Human-Centered Aesthetics Engineered for Digital Clarity.",
    cormorantWord: "Clarity",
    description:
      "Crafting intuitive user interfaces, comprehensive design systems, wireframes, and interactive prototypes that elevate user delight and drive measurable product engagement.",
    color: "#E92B2B", // Durozen Red
    accentBg: "bg-[#E92B2B]/10",
    badge: "EXPERIENCE DESIGN",
    featured: false,
    keyBenefits: [
      "Significantly reduces user onboarding friction and support ticket volume",
      "Scalable design token system aligning engineering and design teams",
      "Accessibility-first design complying with WCAG 2.1 AA standards",
      "Boosts product adoption, conversion rates, and client retention",
    ],
    capabilities: [
      "Design Systems & Component Token Libraries in Figma",
      "User Journey Mapping & Information Architecture",
      "Interactive High-Fidelity Wireframes & Clickable Prototypes",
      "Enterprise Dashboard & Complex Data Visualization UX",
      "Usability Testing & Conversion Rate Optimization (CRO)",
    ],
    deliverables: [
      "Comprehensive Figma design system with tokens and variants",
      "Desktop, tablet, and mobile interface design specifications",
      "Interactive clickable prototypes for stakeholder demonstrations",
      "Design token export files synchronized with frontend Tailwind CSS",
    ],
    technologies: ["Figma", "Tailwind CSS", "Framer", "Adobe Creative Suite"],
    metrics: [
      { value: "WCAG AA", label: "Accessibility Compliance" },
      { value: "+45%", label: "User Task Completion Rate" },
      { value: "100%", label: "Design Token Synchrony" },
    ],
    ctaText: "Elevate Your Product UX",
    detailedContent: {
      overview:
        "Great design is not superficial decoration; it is the visual architecture that guides human focus. We craft interfaces that make complex enterprise software intuitive and enjoyable to use.",
      approach:
        "We ground our design in ethnographic user observation, identifying friction points in workflows before translating solutions into elegant, minimal visual components.",
      architectureHighlights: [
        "Atomic design methodology enabling instant component reusability",
        "Design tokens shared across Figma and React frontend codebases",
        "Strict contrast ratios and responsive typography scales",
      ],
      outcomes: [
        "Elevated mobile user completion rate by 45% in complex registration flows",
        "Reduced new employee software training time from 2 weeks to 2 days",
      ],
    },
  },
  {
    id: "product-development",
    slug: "product-development",
    title: "Product Development",
    shortTitle: "Product Development",
    headline: "From Visionary Concepts to Market-Defining Digital Products.",
    cormorantWord: "Market-Defining",
    description:
      "Full lifecycle product engineering combining human-centered UX design, rapid prototyping, agile delivery, and rock-solid production builds that delight users.",
    color: "#2647A5", // 4. Durozen Blue
    accentBg: "bg-[#2647A5]/10",
    badge: "PRODUCT LIFECYCLE",
    featured: true,
    keyBenefits: [
      "Rapid time-to-market with functional MVPs launched in 6-8 weeks",
      "Continuous user feedback integration during iterative two-week sprints",
      "Architecture engineered for horizontal scalability from Day One",
      "Predictable milestones, transparent burndown, and proactive risk mitigation",
    ],
    capabilities: [
      "Product Strategy & Technical Feasibility",
      "High-Fidelity UI/UX & Design Systems",
      "MVP Development & Accelerated Go-To-Market",
      "SaaS Multi-Tenant Architecture & Billing",
      "Cross-Platform Native & Progressive Web Apps",
    ],
    deliverables: [
      "Production Figma design library with interactive design tokens",
      "Responsive, accessible web and mobile application codebase",
      "Integrated analytics, customer feedback telemetry, and A/B tooling",
      "Comprehensive product roadmap and feature backlog documentation",
    ],
    technologies: [
      "Figma",
      "React Native",
      "Next.js",
      "Tailwind CSS",
      "Stripe",
      "Supabase",
      "PostHog",
      "Vercel",
    ],
    metrics: [
      { value: "6 Weeks", label: "Average MVP Launch Velocity" },
      { value: "4.9/5", label: "End-User Satisfaction Rating" },
      { value: "100%", label: "Responsive & Accessible (WCAG AA)" },
    ],
    ctaText: "Launch Your Digital Product",
    detailedContent: {
      overview:
        "Great products are the convergence of empathetic user experience and uncompromising engineering fidelity. We help founders and enterprise innovation leaders ship software that users genuinely love.",
      approach:
        "We work through iterative two-week discovery and delivery cycles. From wireframing to high-fidelity prototypes and final deployment, our product strategists and engineers collaborate as one unified team.",
      architectureHighlights: [
        "Unified design system tokens synchronized between Figma and Tailwind CSS",
        "Accessible, keyboard-navigable components adhering to WCAG 2.1 AA standards",
        "Optimized client bundles and server-side rendering for instant sub-second page loads",
        "Built-in product telemetry for funnel analysis and user drop-off reduction",
      ],
      outcomes: [
        "Enabled seed-stage venture to secure Series A funding following MVP launch",
        "Boosted user activation rate by 142% through streamlined onboarding UX",
        "Reduced customer churn by 35% through proactive workflow notifications",
      ],
    },
  },
  {
    id: "api-development",
    slug: "api-development",
    title: "API Development and Integration",
    shortTitle: "API Development",
    headline: "High-Throughput, Secure Connective Tissue for Modern Systems.",
    cormorantWord: "Connective",
    description:
      "Design and implementation of type-safe RESTful, GraphQL, and gRPC APIs, automated third-party webhooks, payment gateways, and enterprise integration buses.",
    color: "#4C9B35", // Durozen Green
    accentBg: "bg-[#4C9B35]/10",
    badge: "INTEGRATION FABRIC",
    featured: false,
    keyBenefits: [
      "Seamlessly connects disparate enterprise software, ERPs, and cloud tools",
      "Sub-20ms low-latency response times with Redis caching layers",
      "Strict rate limiting, DDoS mitigation, and API key token governance",
      "Comprehensive OpenAPI/Swagger documentation for instant developer adoption",
    ],
    capabilities: [
      "RESTful, GraphQL, and gRPC API Architecture",
      "Payment Gateway Integration (Stripe, Razorpay, PayPal)",
      "Third-Party CRM, TMS & ERP Webhook Synchronization",
      "API Gateway & Rate Limiting (Kong, Cloudflare, AWS API Gateway)",
      "Automated Contract Testing & OpenAPI Schema Generation",
    ],
    deliverables: [
      "High-performance API server microservices",
      "Interactive Swagger/OpenAPI documentation portal",
      "SDK libraries for frontend and mobile integration",
      "Rate-limiting and JWT authentication middleware",
    ],
    technologies: ["Go", "Node.js", "FastAPI", "GraphQL", "gRPC", "Redis", "PostgreSQL"],
    metrics: [
      { value: "< 20ms", label: "P99 API Response Latency" },
      { value: "100%", label: "OpenAPI Documentation Coverage" },
      { value: "Zero", label: "Integration Bottlenecks" },
    ],
    ctaText: "Integrate Your APIs",
    detailedContent: {
      overview:
        "Modern applications do not operate in isolation. We build the secure, resilient bridges that allow internal microservices and external partner platforms to exchange data with absolute speed and reliability.",
      approach:
        "We adopt a spec-first approach, generating strict OpenAPI definitions that drive automated contract tests, mock servers, and type-safe client SDKs.",
      architectureHighlights: [
        "gRPC protocol buffers for high-speed inter-service communications",
        "Redis edge caching reducing database read overhead by up to 80%",
        "Token bucket rate limiting preventing API abuse and resource exhaustion",
      ],
      outcomes: [
        "Connected payment, SMS, and cloud storage providers with 99.99% webhook delivery success",
        "Scaled transaction throughput to over 5,000 requests per second under peak loads",
      ],
    },
  },
  {
    id: "it-consulting",
    slug: "it-consulting",
    title: "IT Consulting and Digital Transformation",
    shortTitle: "IT Consulting",
    headline: "Strategic Architecture Guidance for Decisive Technological Leverage.",
    cormorantWord: "Strategic",
    description:
      "Technology audits, legacy system modernization roadmaps, cloud migration strategies, and technical advisory services that align technology investment with enterprise business objectives.",
    color: "#E92B2B", // Durozen Red
    accentBg: "bg-[#E92B2B]/10",
    badge: "STRATEGIC ADVISORY",
    featured: false,
    keyBenefits: [
      "Identifies hidden architectural risks, security vulnerabilities, and technical debt",
      "Provides clear, phased digital transformation roadmaps with measurable ROI",
      "Evaluates technology vendor choices objectively to prevent costly platform lock-in",
      "Aligns engineering velocity directly with top-line corporate business goals",
    ],
    capabilities: [
      "System Architecture & Codebase Health Audits",
      "Legacy Monolith Modernization Roadmaps",
      "Cloud Readiness & Cost Optimization Assessments",
      "Security & Regulatory Compliance Reviews",
      "Interim CTO & Technical Leadership Advisory",
    ],
    deliverables: [
      "Detailed architectural audit report with prioritized recommendations",
      "Phased 12-month digital transformation roadmap and budget estimate",
      "Vendor and technology evaluation matrix",
      "Security vulnerability and remediation action plan",
    ],
    technologies: ["Cloud Architecture", "System Audits", "Microservices", "Security Frameworks"],
    metrics: [
      { value: "100%", label: "Objective Vendor Neutrality" },
      { value: "35%+", label: "Average Waste Reclamation" },
      { value: "Actionable", label: "Executive Roadmap Delivery" },
    ],
    ctaText: "Schedule an Executive Consultation",
    detailedContent: {
      overview:
        "Technology decisions made today define an enterprise's operational agility for the next decade. Our senior architects provide seasoned, vendor-neutral guidance to navigate complex modernization choices.",
      approach:
        "We conduct deep-dive technical reviews into your codebase, database structures, and deployment pipelines, producing clear executive summaries alongside actionable engineering plans.",
      architectureHighlights: [
        "Strangler fig migration pattern for zero-downtime legacy core replacement",
        "Comprehensive total cost of ownership (TCO) financial modeling",
        "Security posture alignment with ISO 27001 and SOC 2 requirements",
      ],
      outcomes: [
        "Uncovered and eliminated $120,000 in annual recurring cloud infrastructure waste",
        "Guided enterprise transition from brittle legacy server to resilient container mesh",
      ],
    },
  },
  {
    id: "qa-test-automation",
    slug: "qa-test-automation",
    title: "Quality Assurance and Test Automation",
    shortTitle: "QA & Testing",
    headline: "Bulletproof Reliability Through Continuous Automated Verification.",
    cormorantWord: "Reliability",
    description:
      "End-to-end automated testing frameworks, performance load testing, regression test suites, and continuous security scanning that prevent regressions and protect client trust.",
    color: "#F9A916", // Durozen Yellow
    accentBg: "bg-[#F9A916]/10",
    badge: "QUALITY ENGINEERING",
    featured: false,
    keyBenefits: [
      "Eliminates costly production bugs and protects customer experience",
      "Accelerates release cycles by replacing manual testing with automated CI gates",
      "Simulates real-world extreme concurrency to verify load capacity before launch",
      "Ensures cross-browser and cross-device consistency across every build",
    ],
    capabilities: [
      "End-to-End Automated Testing (Playwright, Cypress)",
      "High-Concurrency Performance & Load Testing (k6, Locust)",
      "API Integration & Contract Testing (Jest, Postman, Newman)",
      "Automated Security & Vulnerability Scanning (SonarQube, OWASP ZAP)",
      "Mobile Test Automation (Appium, Detox)",
    ],
    deliverables: [
      "Automated test suites integrated into CI/CD pipelines",
      "Performance benchmarking and load test stress reports",
      "Comprehensive test matrix covering all key user journeys",
      "Automated regression test dashboards and notifications",
    ],
    technologies: ["Playwright", "Cypress", "k6", "Jest", "SonarQube", "OWASP ZAP", "GitHub Actions"],
    metrics: [
      { value: "95%+", label: "Automated Test Coverage" },
      { value: "0", label: "Critical Escaped Bugs" },
      { value: "10,000+", label: "Simulated Concurrent Users" },
    ],
    ctaText: "Strengthen Your Software Quality",
    detailedContent: {
      overview:
        "Software reliability is built through rigorous, automated discipline. We design test automation suites that run silently on every commit, verifying business logic, API contracts, and user interactions before code ever reaches production.",
      approach:
        "We follow the test pyramid philosophy: extensive unit test foundations, comprehensive API integration coverage, and focused end-to-end user journeys running against ephemeral test environments.",
      architectureHighlights: [
        "Parallelized test execution across distributed CI runner clusters",
        "Deterministic test fixtures with synthetic database seeding",
        "Real-time visual regression testing capturing pixel-level styling shifts",
      ],
      outcomes: [
        "Reduced manual QA cycle time from 4 days to 18 minutes of automated CI runs",
        "Achieved zero critical defect escapes across 12 consecutive production releases",
      ],
    },
  },
];
