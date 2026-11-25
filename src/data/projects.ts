export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: { value: string; label: string }[];
  tags: string[];
  accentColor: string;
  featured: boolean;
  website?: string;
  features?: string[];
  image?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "rams-construct",
    slug: "rams-construct",
    title: "RAMS Construct",
    client: "RAMS Construction Group",
    sector: "Construction & Real Estate",
    year: "2024",
    summary:
      "Interactive 3D property experience platform with spatial site exploration, instant quotation generation, and automated CRM pipelines.",
    challenge:
      "Static brochures failed to convey spatial scale, causing slow sales cycles and low lead qualification.",
    solution:
      "Built a Three.js 3D visualization platform with dynamic plan configurators, headless CMS, and instant quote generation.",
    impactMetrics: [
      { value: "3D", label: "Spatial Walkthroughs" },
      { value: "Real-Time", label: "Instant Quotes" },
      { value: "Omnichannel", label: "Automated CRM" },
    ],
    features: [
      "Interactive 3D architectural walkthroughs",
      "Dynamic site plan and floor map explorers",
      "Automated instant quote generation",
      "Integrated CRM marketing & lead capture",
      "Headless CMS dynamic project portfolios",
    ],
    tags: ["Three.js", "Tailwind CSS", "TypeScript", "Headless CMS"],
    accentColor: "#549B31", // Durozen Green
    featured: true,
    website: "https://ramsconstruct.co.uk/",
    image: "/images/projects/rams-construct.png",
  },
  {
    id: "elavarasan-chits",
    slug: "elavarasan-chits",
    title: "Elavarasan & Co Chits",
    client: "Elavarasan & Co Chits Pvt. Ltd.",
    sector: "Fintech & Financial Services",
    year: "2024",
    summary:
      "Regulated fintech platform supporting real-time digital auctions, automated dividend distribution, and compliant ledger accounting.",
    challenge:
      "Paper ledgers and physical auctions limited subscriber reach and created substantial audit overhead.",
    solution:
      "Engineered secure microservices with real-time bidding, automated dividend math, and compliance reporting.",
    impactMetrics: [
      { value: "Live", label: "Digital Auctions" },
      { value: "100%", label: "Dividend Accuracy" },
      { value: "Statutory", label: "Full Compliance" },
    ],
    features: [
      "Live digital bidding auctions with instant updates",
      "Automated dividend calculation and distribution",
      "Subscriber ledger accounting & statement exports",
      "Regulatory compliance & audit logging",
      "Secure containerized microservices topology",
    ],
    tags: ["Spring Boot", "PostgreSQL", "Docker", "Microservices"],
    accentColor: "#24419E", // Durozen Blue
    featured: true,
    website: "https://www.elavarasandncchits.in/",
    image: "/images/projects/elavarasan-chits.png",
  },
  {
    id: "gurudev-impex",
    slug: "gurudev-impex",
    title: "Gurudev Impex",
    client: "Gurudev Impex International",
    sector: "Logistics & Global Trade",
    year: "2023",
    summary:
      "Global freight and logistics platform featuring live container tracking, automated customs clearance, and instant quotation engines.",
    challenge:
      "Carrier coordination across borders suffered from tracking blackouts and slow manual customs paperwork.",
    solution:
      "Architected an event-driven telemetry platform with automated shipping docs and AWS cloud resilience.",
    impactMetrics: [
      { value: "24/7", label: "Live Tracking" },
      { value: "Automated", label: "Customs Clearance" },
      { value: "Global", label: "Freight Precision" },
    ],
    features: [
      "Live international container tracking telemetry",
      "Instant freight quotation & rate calculators",
      "Automated customs & shipping documentation",
      "Supplier & regulatory compliance tracking",
      "High-throughput event streaming architecture",
    ],
    tags: ["Go", "Python", "Next.js", "Kafka", "AWS"],
    accentColor: "#F4A81E", // Durozen Yellow
    featured: true,
    website: "https://gurudevimpex.in/",
    image: "/images/projects/gurudev-impex.png",
  },
  {
    id: "knp-bharathi",
    slug: "knp-bharathi",
    title: "KNP Bharathi Educational System",
    client: "KNP Bharathi Matric Higher Secondary School",
    sector: "Education & Institutional Systems",
    year: "2023",
    summary:
      "Mobile-first school administration platform managing student records, biometric attendance tracking, grading & report cards, fee collection, and real-time parent push notifications.",
    challenge:
      "Fragmented communication between administration, teachers, and parents created delays in attendance reporting and school notice distribution.",
    solution:
      "Developed a cross-platform Flutter mobile app paired with a Node.js and MongoDB backend, integrated with biometric devices and Firebase Cloud Messaging for instant updates.",
    impactMetrics: [
      { value: "Biometric", label: "Automated Attendance Integration" },
      { value: "Real-Time", label: "Parent Notification Dispatch" },
      { value: "Unified", label: "Centralized Student Records" },
    ],
    features: [
      "Centralized student academic records & profiles",
      "Biometric hardware attendance synchronization",
      "Automated grade evaluation & report card generation",
      "Digital fee collection & receipt ledger",
      "Push notifications via Firebase Cloud Messaging",
    ],
    tags: ["Flutter", "Node.js", "MongoDB", "Firebase Cloud Messaging"],
    accentColor: "#549B31", // Durozen Green
    featured: false,
    website: "https://knp-bharathimhss.com/",
    image: "/images/projects/knp-bharathi.png",
  },
  {
    id: "sri-ganesh-plywoods",
    slug: "sri-ganesh-plywoods",
    title: "Sri Ganesh Plywoods & Hardwares",
    client: "Sri Ganesh Plywoods & Hardwares (SGPH)",
    sector: "Retail & Enterprise Operations",
    year: "2024",
    summary:
      "Enterprise digital catalog and materials showroom platform delivering interactive technical timber specifications, brand authorizations, and automated quotation dispatch.",
    challenge:
      "Managing offline catalogs of 600+ laminate finishes and technical wood grades caused delays for architects and contractors requesting custom material estimates.",
    solution:
      "Architected a Next.js digital catalog with structured technical specifications, bilingual localization, and instant omnichannel inquiry routing.",
    impactMetrics: [
      { value: "600+", label: "Laminates & Timber Catalog" },
      { value: "IS:710", label: "Certified Marine Specs" },
      { value: "Instant", label: "Omnichannel Quotations" },
    ],
    features: [
      "Interactive material catalog & technical specification explorer",
      "Authorized dealership showcase (Greenply, Asian Paints, Godrej)",
      "Direct project estimation & instant WhatsApp quotation dispatch",
      "Bilingual interface architecture for regional trade accessibility",
      "Responsive layout optimized for on-site contractor mobile devices",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accentColor: "#24419E", // Durozen Blue
    featured: false,
    website: "https://www.sriganeshplywoods.in/",
    image: "/images/projects/sri-ganesh-plywoods.png",
  },
  {
    id: "sri-krishna-traders",
    slug: "sri-krishna-traders",
    title: "Sri Krishna Traders",
    client: "Sri Krishna Traders",
    sector: "Retail & Enterprise Operations",
    year: "2024",
    summary:
      "Modern building materials and hardware distribution portal unifying tier-1 electrical, sanitary, plumbing inventories, and on-site delivery coordination.",
    challenge:
      "Fragmented physical inventory inquiries across plumbing, electrical, and hardware product lines created dispatch bottlenecks for construction contractors.",
    solution:
      "Built a unified commercial web portal with comprehensive brand directory integration, real-time inventory discovery, and direct project desk communication.",
    impactMetrics: [
      { value: "Tier-1", label: "Authorized Brands (Havells, Finolex)" },
      { value: "On-Site", label: "Contractor Delivery Support" },
      { value: "Full-Spectrum", label: "Hardware & Electrical Catalog" },
    ],
    features: [
      "Comprehensive multi-brand catalog (Havells, Crompton, Finolex, V-Guard)",
      "Dedicated Contractor Project Desk & fast enquiry pipeline",
      "Categorized exploration for electricals, plumbing, and sanitary goods",
      "On-site site delivery logistics & dispatch coordination",
      "Mobile-optimized high-performance portal architecture",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    accentColor: "#DE2F28", // Durozen Red
    featured: false,
    website: "https://www.srikrishnatraders.com/",
    image: "/images/projects/sri-krishna-traders.png",
  },
];
