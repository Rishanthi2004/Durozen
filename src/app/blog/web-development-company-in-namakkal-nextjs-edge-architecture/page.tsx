import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WebDevelopmentNamakkalBlog from "@/components/blog/WebDevelopmentNamakkalBlog";

export const metadata: Metadata = {
  title: "Web Development Company in Namakkal | Next.js, React & Cloud Apps - Durozen",
  description:
    "Searching for a high-performance web development company in Namakkal? Durozen builds sub-second React & Next.js web applications, SaaS portals, and enterprise platforms.",
  alternates: {
    canonical: "/blog/web-development-company-in-namakkal-nextjs-edge-architecture",
  },
  openGraph: {
    title: "Web Development Company in Namakkal | Next.js, React & Cloud Apps - Durozen",
    description:
      "Searching for a high-performance web development company in Namakkal? Durozen builds sub-second React & Next.js web applications, SaaS portals, and enterprise platforms.",
    url: "https://durozen.in/blog/web-development-company-in-namakkal-nextjs-edge-architecture",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function WebDevelopmentNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <WebDevelopmentNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
