import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import GalleryExperience from "@/components/gallery/GalleryExperience";

export const metadata: Metadata = {
  title: "Durozen | Enterprise Software & IT Services",
  description:
    "Explore our journey, modern facility, software engineering milestones, and team moments at Durozen Technologies Private Limited.",
  openGraph: {
    title: "Durozen | Enterprise Software & IT Services",
    description:
      "A closer look at our work, team, engineering achievements, and journey at Durozen Technologies.",
    url: "https://www.durozen.in/gallery",
    siteName: "Durozen Technologies",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col selection:bg-[#24419E] selection:text-white">
      {/* Standard Website Navbar */}
      <Navbar animateLogo={false} />

      {/* Main 3D Interactive Gallery Experience */}
      <main className="flex-1">
        <GalleryExperience />
      </main>

      {/* Standard Website Footer */}
      <Footer />
    </div>
  );
}
