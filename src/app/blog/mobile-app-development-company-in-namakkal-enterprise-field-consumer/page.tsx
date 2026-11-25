import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileAppEnterpriseFieldConsumerNamakkalBlog from "@/components/blog/MobileAppEnterpriseFieldConsumerNamakkalBlog";

export const metadata: Metadata = {
  title: "Enterprise Field Apps & Consumer Mobile Products: Mobile App Development Company in Namakkal | Durozen",
  description:
    "Partner with a top mobile app development company in Namakkal. Durozen builds offline-first enterprise workforce apps and consumer Android/iOS products with React Native & Flutter.",
  alternates: {
    canonical: "/blog/mobile-app-development-company-in-namakkal-enterprise-field-consumer",
  },
  openGraph: {
    title: "Enterprise Field Apps & Consumer Mobile Products: Mobile App Development Company in Namakkal | Durozen",
    description:
      "Partner with a top mobile app development company in Namakkal. Durozen builds offline-first enterprise workforce apps and consumer Android/iOS products with React Native & Flutter.",
    url: "https://durozen.in/blog/mobile-app-development-company-in-namakkal-enterprise-field-consumer",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function MobileAppEnterpriseFieldConsumerNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <MobileAppEnterpriseFieldConsumerNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
