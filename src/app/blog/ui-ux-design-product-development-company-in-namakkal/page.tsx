import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import UiUxDesignProductDevelopmentNamakkalBlog from "@/components/blog/UiUxDesignProductDevelopmentNamakkalBlog";

export const metadata: Metadata = {
  title: "UI/UX Design & Digital Product Development Company in Namakkal | Durozen",
  description:
    "Partner with a top UI/UX design and digital product development company in Namakkal. Durozen crafts interactive prototypes, 3D web experiences, and scalable SaaS MVPs.",
  alternates: {
    canonical: "/blog/ui-ux-design-product-development-company-in-namakkal",
  },
  openGraph: {
    title: "UI/UX Design & Digital Product Development Company in Namakkal | Durozen",
    description:
      "Partner with a top UI/UX design and digital product development company in Namakkal. Durozen crafts interactive prototypes, 3D web experiences, and scalable SaaS MVPs.",
    url: "https://durozen.in/blog/ui-ux-design-product-development-company-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function UiUxDesignProductDevelopmentNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <UiUxDesignProductDevelopmentNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
