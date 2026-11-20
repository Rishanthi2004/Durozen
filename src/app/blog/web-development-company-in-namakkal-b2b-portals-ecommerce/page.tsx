import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WebDevelopmentEcommercePortalsNamakkalBlog from "@/components/blog/WebDevelopmentEcommercePortalsNamakkalBlog";

export const metadata: Metadata = {
  title: "High-Converting B2B Portals & E-Commerce: Web Development Company in Namakkal | Durozen",
  description:
    "Partner with a premier web development company in Namakkal. Durozen builds custom B2B customer portals, high-speed e-commerce platforms, and SEO-first React web apps.",
  alternates: {
    canonical: "/blog/web-development-company-in-namakkal-b2b-portals-ecommerce",
  },
  openGraph: {
    title: "High-Converting B2B Portals & E-Commerce: Web Development Company in Namakkal | Durozen",
    description:
      "Partner with a premier web development company in Namakkal. Durozen builds custom B2B customer portals, high-speed e-commerce platforms, and SEO-first React web apps.",
    url: "https://durozen.in/blog/web-development-company-in-namakkal-b2b-portals-ecommerce",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function WebDevelopmentEcommercePortalsNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <WebDevelopmentEcommercePortalsNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
