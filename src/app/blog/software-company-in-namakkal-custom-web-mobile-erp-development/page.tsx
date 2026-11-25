import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SoftwareCompanyNamakkalBlog from "@/components/blog/SoftwareCompanyNamakkalBlog";

export const metadata: Metadata = {
  title: "Software Company in Namakkal | Custom Web, App & ERP Development - Durozen",
  description:
    "Partner with a top software company in Namakkal. Durozen builds custom web applications, mobile apps, SaaS platforms, and enterprise ERP software with modern tech stacks.",
  alternates: {
    canonical: "/blog/software-company-in-namakkal-custom-web-mobile-erp-development",
  },
  openGraph: {
    title: "Software Company in Namakkal | Custom Web, App & ERP Development - Durozen",
    description:
      "Partner with a top software company in Namakkal. Durozen builds custom web applications, mobile apps, SaaS platforms, and enterprise ERP software with modern tech stacks.",
    url: "https://durozen.in/blog/software-company-in-namakkal-custom-web-mobile-erp-development",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function SoftwareCompanyNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <SoftwareCompanyNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
