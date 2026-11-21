import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WebsiteDesignCompanyNamakkalBlog from "@/components/blog/WebsiteDesignCompanyNamakkalBlog";

export const metadata: Metadata = {
  title: "Website Design Company in Namakkal | High-Speed UI/UX & SEO Websites - Durozen",
  description:
    "Looking for the best website design company in Namakkal? Durozen crafts bespoke UI/UX, responsive corporate websites, and SEO-first web platforms built for conversions.",
  alternates: {
    canonical: "/blog/website-design-company-in-namakkal-ui-ux-seo",
  },
  openGraph: {
    title: "Website Design Company in Namakkal | High-Speed UI/UX & SEO Websites - Durozen",
    description:
      "Looking for the best website design company in Namakkal? Durozen crafts bespoke UI/UX, responsive corporate websites, and SEO-first web platforms built for conversions.",
    url: "https://durozen.in/blog/website-design-company-in-namakkal-ui-ux-seo",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function WebsiteDesignCompanyNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <WebsiteDesignCompanyNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
