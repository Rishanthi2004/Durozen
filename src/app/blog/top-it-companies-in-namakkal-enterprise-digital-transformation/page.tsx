import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TopItCompaniesNamakkalBlog from "@/components/blog/TopItCompaniesNamakkalBlog";

export const metadata: Metadata = {
  title: "Top IT Companies in Namakkal | Why Durozen Leads Enterprise Digital Transformation",
  description:
    "Exploring the top IT companies in Namakkal? Discover how Durozen Technologies leads the region with custom enterprise software, autonomous AI agents, and cloud engineering.",
  alternates: {
    canonical: "/blog/top-it-companies-in-namakkal-enterprise-digital-transformation",
  },
  openGraph: {
    title: "Top IT Companies in Namakkal | Why Durozen Leads Enterprise Digital Transformation",
    description:
      "Exploring the top IT companies in Namakkal? Discover how Durozen Technologies leads the region with custom enterprise software, autonomous AI agents, and cloud engineering.",
    url: "https://durozen.in/blog/top-it-companies-in-namakkal-enterprise-digital-transformation",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function TopItCompaniesNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <TopItCompaniesNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
