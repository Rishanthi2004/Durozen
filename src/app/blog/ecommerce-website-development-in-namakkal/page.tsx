import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import EcommerceWebsiteDevelopmentNamakkalBlog from "@/components/blog/EcommerceWebsiteDevelopmentNamakkalBlog";

export const metadata: Metadata = {
  title: "Ecommerce Website Development in Namakkal | Custom Online Stores & B2B Commerce - Durozen",
  description:
    "Looking for ecommerce website development in Namakkal? Durozen builds fast, scalable online stores with UPI/card checkout, inventory sync, and SEO-first storefronts.",
  alternates: {
    canonical: "/blog/ecommerce-website-development-in-namakkal",
  },
  openGraph: {
    title: "Ecommerce Website Development in Namakkal | Custom Online Stores & B2B Commerce - Durozen",
    description:
      "Looking for ecommerce website development in Namakkal? Durozen builds fast, scalable online stores with UPI/card checkout, inventory sync, and SEO-first storefronts.",
    url: "https://durozen.in/blog/ecommerce-website-development-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function EcommerceWebsiteDevelopmentNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <EcommerceWebsiteDevelopmentNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
