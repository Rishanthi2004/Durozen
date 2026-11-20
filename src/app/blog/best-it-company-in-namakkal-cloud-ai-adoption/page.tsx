import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BestItCompanyCloudAiNamakkalBlog from "@/components/blog/BestItCompanyCloudAiNamakkalBlog";

export const metadata: Metadata = {
  title: "How the Best IT Company in Namakkal Accelerates Enterprise Cloud & AI Adoption | Durozen",
  description:
    "Discover how Durozen Technologies, the best IT company in Namakkal, helps enterprises migrate legacy workloads to cloud-native infrastructure and deploy autonomous AI agents.",
  alternates: {
    canonical: "/blog/best-it-company-in-namakkal-cloud-ai-adoption",
  },
  openGraph: {
    title: "How the Best IT Company in Namakkal Accelerates Enterprise Cloud & AI Adoption | Durozen",
    description:
      "Discover how Durozen Technologies, the best IT company in Namakkal, helps enterprises migrate legacy workloads to cloud-native infrastructure and deploy autonomous AI agents.",
    url: "https://durozen.in/blog/best-it-company-in-namakkal-cloud-ai-adoption",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function BestItCompanyCloudAiNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <BestItCompanyCloudAiNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
