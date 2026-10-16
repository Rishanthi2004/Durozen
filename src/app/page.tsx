import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/hero/HeroSection";
import CapabilityMatrix from "@/components/home/CapabilityMatrix";
import PhilosophySection from "@/components/home/PhilosophySection";
import FeaturedWork from "@/components/home/FeaturedWork";
import ProcessPipeline from "@/components/home/ProcessPipeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col selection:bg-[#24419E] selection:text-white">
      {/* Navigation with 4 falling circles bounce animation */}
      <Navbar animateLogo={true} />

      <main className="flex-1">
        {/* Main Hero Section with 3D Curved Pathway, floating icons, headline, metrics */}
        <HeroSection />

        {/* Strategic Capability Matrix (Custom Software, Cloud, AI, Product) */}
        <CapabilityMatrix />

        {/* Engineering Philosophy with Cormorant Garamond */}
        <PhilosophySection />

        {/* Featured Case Studies & Proven Metrics */}
        <FeaturedWork />

        {/* 4-Step Agile Delivery Pipeline */}
        <ProcessPipeline />

        {/* Technical Leadership Endorsements */}
        <TestimonialsSection />

        {/* Common Questions Accordion */}
        <FaqSection />

        {/* Conversion Action Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
