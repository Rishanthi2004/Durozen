import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BestItCompanyNamakkalBlog from "@/components/blog/BestItCompanyNamakkalBlog";

export const metadata: Metadata = {
  title: "Best IT Company in Namakkal | Enterprise Software, AI & Cloud - Durozen",
  description:
    "Looking for the best IT company in Namakkal? Durozen Technologies delivers enterprise custom software, autonomous AI agents, cloud architecture, and web/mobile apps.",
  alternates: {
    canonical: "/blog/best-it-company-in-namakkal-enterprise-software-ai-cloud",
  },
  openGraph: {
    title: "Best IT Company in Namakkal | Enterprise Software, AI & Cloud - Durozen",
    description:
      "Looking for the best IT company in Namakkal? Durozen Technologies delivers enterprise custom software, autonomous AI agents, cloud architecture, and web/mobile apps.",
    url: "https://durozen.in/blog/best-it-company-in-namakkal-enterprise-software-ai-cloud",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function BestItCompanyNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <BestItCompanyNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
