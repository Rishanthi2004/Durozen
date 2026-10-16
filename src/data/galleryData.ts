export type GalleryCategory =
  | "All"
  | "Company Events"
  | "Team and Workplace"
  | "Client Projects"
  | "Products and Solutions"
  | "Behind the Scenes";

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  description: string;
  src: string;
  date: string;
  accent: "red" | "orange" | "green" | "blue";
  tag: string;
}

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Team and Workplace",
  "Company Events",
  "Behind the Scenes",
  "Products and Solutions",
  "Client Projects",
];

// Authentic Durozen Technologies photographs
export const galleryItems: GalleryItem[] = [
  {
    id: "photo-01",
    title: "Official Corporate Reception & Four-Pillar Emblem",
    category: "Team and Workplace",
    description:
      "The official headquarters reception lobby at Durozen Technologies Pvt. Ltd., featuring dimensional gold brand lettering and the four core pillars: Stability, Autonomy, Efficiency, and Intelligence.",
    src: "/images/gallery/durozen-photo-1.jpg",
    date: "Corporate Reception",
    accent: "red",
    tag: "Brand Identity",
  },
  {
    id: "photo-02",
    title: "Welcome Front Desk & Executive Lobby",
    category: "Team and Workplace",
    description:
      "Modern welcome desk and executive lobby at Sumasan Complex, greeting enterprise clients, partners, and engineering associates.",
    src: "/images/gallery/durozen-photo-2.jpg",
    date: "Executive Lobby",
    accent: "orange",
    tag: "Front Office",
  },
  {
    id: "photo-03",
    title: "Headquarters Commercial Facade & Building Architecture",
    category: "Behind the Scenes",
    description:
      "Modern high-resolution exterior view of Durozen Technologies Private Limited and Way2Skills at Sumasan Complex, highlighting premium architectural panelling and executive glass facade.",
    src: "/images/gallery/durozen-commercial-building.png",
    date: "HQ Facade",
    accent: "green",
    tag: "Architecture",
  },
  {
    id: "photo-04",
    title: "Keynote Speaker Podium & Conference Seating",
    category: "Company Events",
    description:
      "Speaker podium and spacious seating layout configured for technical symposiums, quarterly engineering reviews, and town halls.",
    src: "/images/gallery/durozen-photo-11.jpg",
    date: "Conference Hall",
    accent: "blue",
    tag: "Keynotes",
  },
  {
    id: "photo-05",
    title: "Corporate Meeting Hall & Auditorium",
    category: "Company Events",
    description:
      "Expansive corporate auditorium hall equipped with tiered seating and acoustic treatment for company-wide presentations.",
    src: "/images/gallery/durozen-photo-10.jpg",
    date: "Auditorium",
    accent: "red",
    tag: "All-Hands",
  },
  {
    id: "photo-06",
    title: "Corporate Headquarters Facade — Sumasan Complex",
    category: "Behind the Scenes",
    description:
      "Modern architectural exterior of Durozen Technologies Private Limited located at Sumasan Complex, Namakkal, Tamil Nadu.",
    src: "/images/gallery/durozen-photo-22.jpg",
    date: "HQ Building",
    accent: "orange",
    tag: "Headquarters",
  },
  {
    id: "photo-07",
    title: "Executive Presentation Stage & Digital Display",
    category: "Company Events",
    description:
      "Keynote presentation stage with integrated ultra-HD presentation screen and podium for technical demonstrations.",
    src: "/images/gallery/durozen-photo-17.jpg",
    date: "Auditorium Stage",
    accent: "green",
    tag: "Tech Demos",
  },
  {
    id: "photo-08",
    title: "Collaborative Agile Pods & Glass Conference Suites",
    category: "Team and Workplace",
    description:
      "Acoustically isolated glass conference pods for cross-functional sprint planning, architecture reviews, and team pairing.",
    src: "/images/gallery/durozen-photo-14.jpg",
    date: "Meeting Suites",
    accent: "blue",
    tag: "Agile Culture",
  },
  {
    id: "photo-09",
    title: "Interactive Smart Board & Multi-Media Console",
    category: "Products and Solutions",
    description:
      "High-definition collaboration display and smart board setup utilized for client solution walkthroughs and live software demos.",
    src: "/images/gallery/durozen-photo-4.jpg",
    date: "Demo Center",
    accent: "red",
    tag: "Smart Display",
  },
  {
    id: "photo-10",
    title: "Corporate Headquarters Campus — Daylight View",
    category: "Behind the Scenes",
    description:
      "Exterior perspective showcasing the modern glass and panel facade housing Durozen's software labs and research pods.",
    src: "/images/gallery/durozen-photo-20.jpg",
    date: "HQ Exterior",
    accent: "orange",
    tag: "Facility",
  },
  {
    id: "photo-11",
    title: "Climate-Controlled Environmental Infrastructure",
    category: "Client Projects",
    description:
      "Advanced climate control and air purification engineering maintaining an optimal, dust-free development environment.",
    src: "/images/gallery/durozen-photo-13.jpg",
    date: "Facility Tech",
    accent: "green",
    tag: "Infrastructure",
  },
  {
    id: "photo-12",
    title: "Corporate Signage & Executive Entrance",
    category: "Behind the Scenes",
    description:
      "Official building exterior signage highlighting Durozen Technologies Private Limited at Sumasan Complex.",
    src: "/images/gallery/durozen-photo-23.jpg",
    date: "Corporate Entrance",
    accent: "blue",
    tag: "Branding",
  },
  {
    id: "photo-14",
    title: "Open Engineering Floor & Development Workstations",
    category: "Team and Workplace",
    description:
      "Spacious engineering floor at Durozen Technologies equipped with high-performance workstations, dual-monitor setups, and dedicated spaces for software teams.",
    src: "/images/gallery/img_6720.jpg",
    date: "Engineering Bay",
    accent: "orange",
    tag: "Workplace",
  },
  {
    id: "photo-15",
    title: "Dedicated Software Engineering Pod",
    category: "Team and Workplace",
    description:
      "Modern development workstation with multi-display setup and ergonomic design, configured for full-stack and cloud engineering workflows.",
    src: "/images/gallery/img_6721.jpg",
    date: "Development Pod",
    accent: "green",
    tag: "Engineering",
  },
  {
    id: "photo-16",
    title: "Modern Technical Infrastructure & Work Bays",
    category: "Team and Workplace",
    description:
      "Focused workspace cluster optimized for deep engineering focus, sprint planning, and secure software development operations.",
    src: "/images/gallery/img_6723.jpg",
    date: "Workstation Pod",
    accent: "blue",
    tag: "Infrastructure",
  },
  {
    id: "photo-17",
    title: "Panoramic Workspace & Innovation Center",
    category: "Team and Workplace",
    description:
      "High-angle view of the Durozen Technologies modern office floor featuring ambient architectural lighting, executive cabins, and engineering bays.",
    src: "/images/gallery/img_6724.jpg",
    date: "Innovation Floor",
    accent: "red",
    tag: "Office Floor",
  },
  {
    id: "photo-18",
    title: "Active Software Engineering & Team Sprint Bay",
    category: "Team and Workplace",
    description:
      "Durozen Technologies engineering squad actively developing enterprise web systems, mobile apps, and cloud APIs at their dedicated workstations.",
    src: "/images/gallery/img_6733.jpg",
    date: "Engineering Bay",
    accent: "orange",
    tag: "Team Sprint",
  },
  {
    id: "photo-19",
    title: "Panoramic Development Floor & Glass Conference Suites",
    category: "Team and Workplace",
    description:
      "Wide-angle perspective of the Durozen software development floor showing collaborative pods, acoustic glass cabins, and developer desk clusters.",
    src: "/images/gallery/img_6727.jpg",
    date: "Development Floor",
    accent: "green",
    tag: "Workplace",
  },
  {
    id: "photo-20",
    title: "Daylight Engineering Bay & Executive Cabins",
    category: "Team and Workplace",
    description:
      "Sunlit software development bay with ergonomic seating, privacy dividers, and background executive cabins for sprint architecture reviews.",
    src: "/images/gallery/img_6726.jpg",
    date: "Software Pod",
    accent: "blue",
    tag: "Engineering",
  },
  {
    id: "photo-21",
    title: "Dedicated Workstation Clusters & Modern Office Architecture",
    category: "Behind the Scenes",
    description:
      "Sleek office workstation layout at Durozen Technologies with suspended brand pendants, glass partitions, and focused coding bays.",
    src: "/images/gallery/img_6725.jpg",
    date: "Office Architecture",
    accent: "red",
    tag: "Office Space",
  },
  {
    id: "photo-22",
    title: "Collaborative Developer Clusters & Sprint Desks",
    category: "Team and Workplace",
    description:
      "Central engineering corridor featuring dual-sided collaborative workstations optimized for agile sprints and code reviews.",
    src: "/images/gallery/img_6729.jpg",
    date: "Developer Bay",
    accent: "orange",
    tag: "Collaboration",
  },
  {
    id: "photo-23",
    title: "Software Engineers in Active Development Session",
    category: "Team and Workplace",
    description:
      "Durozen frontend and backend engineers in active software development, testing user interfaces and backend services.",
    src: "/images/gallery/img_6730.jpg",
    date: "Active Coding",
    accent: "green",
    tag: "Development",
  },
  {
    id: "photo-24",
    title: "Ergonomic Software Engineering Workstations",
    category: "Team and Workplace",
    description:
      "Clean, air-conditioned developer workspace with acoustic privacy screens, ergonomic task chairs, and dedicated sprint desks.",
    src: "/images/gallery/img_6728.jpg",
    date: "Ergonomic Pod",
    accent: "blue",
    tag: "Workplace",
  },
  {
    id: "photo-25",
    title: "Full-Stack Development Squad & Pair Programming",
    category: "Team and Workplace",
    description:
      "Cross-functional engineering team collaborating on cloud architecture, mobile app builds, and client enterprise delivery.",
    src: "/images/gallery/img_6732.jpg",
    date: "Pair Programming",
    accent: "red",
    tag: "Engineering Squad",
  },
];
