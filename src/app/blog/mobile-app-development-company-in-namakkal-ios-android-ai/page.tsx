import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileAppDevelopmentNamakkalBlog from "@/components/blog/MobileAppDevelopmentNamakkalBlog";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Namakkal | Android, iOS & AI Apps - Durozen",
  description:
    "Looking for a trusted mobile app development company in Namakkal? Durozen engineers high-speed Android, iOS, and AI-native cross-platform apps with React Native and Flutter.",
  alternates: {
    canonical: "/blog/mobile-app-development-company-in-namakkal-ios-android-ai",
  },
  openGraph: {
    title: "Mobile App Development Company in Namakkal | Android, iOS & AI Apps - Durozen",
    description:
      "Looking for a trusted mobile app development company in Namakkal? Durozen engineers high-speed Android, iOS, and AI-native cross-platform apps with React Native and Flutter.",
    url: "https://durozen.in/blog/mobile-app-development-company-in-namakkal-ios-android-ai",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function MobileAppDevelopmentNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <MobileAppDevelopmentNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
