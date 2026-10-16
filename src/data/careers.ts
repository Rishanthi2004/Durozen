export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  color: string;
}

export const jobOpeningsData: JobOpening[] = [
  {
    id: "lead-ai-engineer",
    title: "Senior AI & Systems Engineer",
    department: "Cognitive Intelligence",
    location: "Remote / Hybrid (Bengaluru)",
    type: "Full-Time",
    experience: "5+ Years",
    description:
      "Architect and ship production-grade LLM pipelines, autonomous multi-agent systems, and specialized RAG architectures for enterprise customers.",
    responsibilities: [
      "Design deterministic evaluation suites and guardrail layers for generative AI workflows",
      "Optimize vector embeddings, similarity search, and hybrid ranking algorithms",
      "Deploy low-latency inference servers using FastAPI, vLLM, and Triton",
      "Collaborate directly with client CTOs to convert ambiguous business requirements into robust AI architectures",
    ],
    requirements: [
      "Deep practical experience with PyTorch, Python, LangChain/LlamaIndex, and vector databases",
      "Demonstrated history of deploying production models (not just notebooks or demos)",
      "Strong understanding of model quantization, token optimization, and cost governance",
      "Exceptional communication skills and self-directed problem-solving ability",
    ],
    color: "#24419E", // Blue
  },
  {
    id: "senior-cloud-architect",
    title: "Principal Cloud & DevOps Architect",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-Time",
    experience: "6+ Years",
    description:
      "Lead the design of resilient, multi-region Kubernetes architectures, automated CI/CD engines, and zero-trust security postures.",
    responsibilities: [
      "Author modular, reusable Terraform modules for AWS and GCP multi-account topologies",
      "Design disaster recovery strategies and live Chaos Engineering drills",
      "Partner with development teams to eliminate deployment friction and minimize build times",
      "Audit cloud security baselines against SOC2 Type II, ISO 27001, and CIS benchmarks",
    ],
    requirements: [
      "Expert-level mastery of Kubernetes, Docker, Helm, and Linux kernel internals",
      "Advanced hands-on experience with Terraform, GitHub Actions, and GitOps workflows (ArgoCD)",
      "Strong background in network routing, VPC peering, DNS, and TLS termination",
      "AWS Certified Solutions Architect Professional or equivalent credential preferred",
    ],
    color: "#549B31", // Green
  },
  {
    id: "senior-fullstack-dev",
    title: "Senior Full-Stack Engineer (Next.js / Node / Go)",
    department: "Core Engineering",
    location: "Remote / Bengaluru",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Craft high-performance web applications, fluid micro-interactions, and scalable distributed APIs with uncompromising code quality.",
    responsibilities: [
      "Develop responsive, accessible, and fast web applications using Next.js App Router and TypeScript",
      "Build high-throughput REST and GraphQL endpoints backed by PostgreSQL and Redis",
      "Participate in rigorous peer code reviews and architectural RFC discussions",
      "Champion web performance optimization (Core Web Vitals, server components, bundle splitting)",
    ],
    requirements: [
      "Fluency with React, Next.js, TypeScript, Tailwind CSS, and modern web standards",
      "Solid backend competencies with Node.js, Go, or Python and relational database design",
      "Strong appreciation for typography, visual hierarchy, and micro-animations",
      "Pragmatic approach to trade-offs between speed-to-market and architectural perfection",
    ],
    color: "#DE2F28", // Red
  },
  {
    id: "product-designer",
    title: "Principal UI/UX & Design Systems Lead",
    department: "Product Design",
    location: "Remote",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Define the visual aesthetic, user journeys, and component token libraries for next-generation enterprise software.",
    responsibilities: [
      "Craft comprehensive Figma design systems with atomic components and interactive variants",
      "Conduct user research interviews and turn feedback into intuitive workflows",
      "Collaborate tightly with engineers to ensure 100% design fidelity in production builds",
      "Produce interactive prototypes to test complex data visualization concepts",
    ],
    requirements: [
      "Stunning portfolio showcasing enterprise SaaS, dashboard UX, or high-craft product design",
      "Mastery of Figma, component libraries, typography, and responsive auto-layout",
      "Working familiarity with HTML/CSS and frontend implementation constraints",
      "A passion for editorial elegance, whitespace, and minimal modern design",
    ],
    color: "#F4A81E", // Yellow
  },
];
