export interface MobileAppItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  playStoreUrl: string;
  icon: string;
  screenshot: string;
  description: string;
  features: string[];
  accentColor: string;
  badge: string;
}

export const mobileAppsData: MobileAppItem[] = [
  {
    id: "brolier360",
    name: "Brolier360",
    tagline: "Powered by Duro POS",
    category: "Point of Sale & Retail",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.durozen.brolier360",
    icon: "/images/apps/brolier360-icon.png",
    screenshot: "/images/apps/brolier360-screen.png",
    description:
      "Mobile Point-of-Sale solution designed to streamline sales operations, track real-time inventory, and support lightning-fast checkout with automatic cloud synchronization.",
    features: [
      "Lightning-fast checkout & instant receipt printing",
      "Real-time inventory & stock level management",
      "Secure cloud backup with multi-device sync",
      "Built-in deep sales analytics and reporting",
    ],
    accentColor: "#DE2F28", // Durozen Red
    badge: "Live on Play Store",
  },
  {
    id: "durotracker",
    name: "DuroTracker",
    tagline: "B2B Delivery & Operations",
    category: "Logistics & Fleet Tracking",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.durozen.durotracker",
    icon: "/images/apps/durotracker-icon.png",
    screenshot: "/images/apps/durotracker-screen.png",
    description:
      "Comprehensive B2B inventory, billing, and delivery management system built for modern organizations. Empowers administrators and drivers with real-time tracking and debt collection.",
    features: [
      "Real-time delivery progress & route management",
      "Bluetooth ESC/POS thermal printer billing on the spot",
      "Multi-tenant architecture with strictly siloed data",
      "Secure role-based access for admins and drivers",
    ],
    accentColor: "#24419E", // Durozen Blue
    badge: "Live on Play Store",
  },
  {
    id: "traders-hub",
    name: "Trader's Hub",
    tagline: "Poultry Trading & Distribution",
    category: "Poultry Wholesale & Supply Chain",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.durozen.mmbroilers",
    icon: "/images/apps/mmbroilers-icon.png",
    screenshot: "/images/apps/mmbroilers-screen.png",
    description:
      "Mobile supply chain solution designed specifically for poultry wholesale distributors and delivery drivers, streamlining order dispatch, route delivery, and digital invoicing.",
    features: [
      "Daily order dispatch & live delivery progress tracking",
      "Digital invoicing & instant on-the-spot billing",
      "Seamless Bluetooth thermal receipt printing",
      "Warehouse stock synchronization without manual entry",
    ],
    accentColor: "#549B31", // Durozen Green
    badge: "Live on Play Store",
  },
];
