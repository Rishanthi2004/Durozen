import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ApiIntegrationSoftwareModernizationNamakkalBlog from "@/components/blog/ApiIntegrationSoftwareModernizationNamakkalBlog";

export const metadata: Metadata = {
  title: "API Integration & Legacy Software Modernization Company in Namakkal | Durozen",
  description:
    "Partner with an expert API integration and software modernization company in Namakkal. Durozen connects ERPs, payment gateways, WhatsApp APIs, and modernizes legacy apps.",
  alternates: {
    canonical: "/blog/api-integration-software-modernization-company-in-namakkal",
  },
  openGraph: {
    title: "API Integration & Legacy Software Modernization Company in Namakkal | Durozen",
    description:
      "Partner with an expert API integration and software modernization company in Namakkal. Durozen connects ERPs, payment gateways, WhatsApp APIs, and modernizes legacy apps.",
    url: "https://durozen.in/blog/api-integration-software-modernization-company-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function ApiIntegrationSoftwareModernizationNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <ApiIntegrationSoftwareModernizationNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
