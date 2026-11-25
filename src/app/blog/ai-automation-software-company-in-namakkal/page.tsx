import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AiAutomationSoftwareCompanyNamakkalBlog from "@/components/blog/AiAutomationSoftwareCompanyNamakkalBlog";

export const metadata: Metadata = {
  title: "AI & Business Automation Software Company in Namakkal | Autonomous AI & CRM - Durozen",
  description:
    "Partner with a leading AI and business automation software company in Namakkal. Durozen builds autonomous AI agents, WhatsApp automation, and custom CRM/ERP workflows.",
  alternates: {
    canonical: "/blog/ai-automation-software-company-in-namakkal",
  },
  openGraph: {
    title: "AI & Business Automation Software Company in Namakkal | Autonomous AI & CRM - Durozen",
    description:
      "Partner with a leading AI and business automation software company in Namakkal. Durozen builds autonomous AI agents, WhatsApp automation, and custom CRM/ERP workflows.",
    url: "https://durozen.in/blog/ai-automation-software-company-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function AiAutomationSoftwareCompanyNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <AiAutomationSoftwareCompanyNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
