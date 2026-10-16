"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Layers,
  Workflow,
  Users,
  Sparkles,
  BarChart3,
  Code2,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";
import EnterpriseArchitectureAnimation from "@/components/animations/EnterpriseArchitectureAnimation";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "ERP Systems",
      category: "Operations Backbone",
      color: "#E92B2B", // 1. Red
      icon: <Layers className="w-6 h-6 text-white" />,
      description:
        "Centralize finance, inventory, supply chain, and human resources into a single dependable operational hub.",
      benefit: "Unifies data & eliminates departmental delays",
    },
    {
      title: "Business Automation",
      category: "Workflow Engine",
      color: "#F9A916", // 2. Yellow
      icon: <Workflow className="w-6 h-6 text-white" />,
      description:
        "Connect your software tools and automate repetitive tasks across finance, sales, and operations without errors.",
      benefit: "Saves hundreds of manual hours every month",
    },
    {
      title: "CRM Systems",
      category: "Customer Relations",
      color: "#4C9B35", // 3. Green
      icon: <Users className="w-6 h-6 text-white" />,
      description:
        "Track client inquiries, automate sales follow-ups, and build lasting customer relationships with visual pipeline tracking.",
      benefit: "Accelerates lead conversion & client retention",
    },
    {
      title: "AI-Powered Solutions",
      category: "Smart Automation",
      color: "#2647A5", // 4. Blue
      icon: <Sparkles className="w-6 h-6 text-white" />,
      description:
        "Deploy intelligent AI agents that extract document data, automate reviews, and assist decision-making with high accuracy.",
      benefit: "Cuts document processing time by up to 85%",
    },
    {
      title: "Business Intelligence",
      category: "Analytics & Insights",
      color: "#E92B2B", // 5. Red (Repeats sequence)
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      description:
        "Turn raw data into interactive real-time visual dashboards to monitor KPIs and make confident, evidence-backed decisions.",
      benefit: "Real-time visibility across all business metrics",
    },
    {
      title: "Custom Software",
      category: "Tailored Engineering",
      color: "#F9A916", // 6. Yellow (Repeats sequence)
      icon: <Code2 className="w-6 h-6 text-white" />,
      description:
        "Custom-built web apps, customer portals, and scalable cloud systems engineered specifically for your business model.",
      benefit: "Built exactly for your unique workflows",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Headline, Benefits, and Architecture Animation */}
          <div className="relative mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#2647A5]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      BUSINESS SOLUTIONS
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Smart Digital Solutions for{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Growing
                    </span>{" "}
                    Businesses.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    Durozen Technologies engineers dependable digital solutions designed to help businesses improve efficiency, automate complex workflows, and scale sustainably through intelligent technology.
                  </p>

                  {/* Customer Benefits Badges: Red -> Yellow -> Green -> Blue */}
                  <div className="flex flex-wrap items-center gap-2.5 mt-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm text-xs font-semibold text-neutral-700">
                      <Clock className="w-3.5 h-3.5 text-[#E92B2B]" />
                      Save Time
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm text-xs font-semibold text-neutral-700">
                      <Workflow className="w-3.5 h-3.5 text-[#F9A916]" />
                      Reduce Manual Work
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm text-xs font-semibold text-neutral-700">
                      <TrendingUp className="w-3.5 h-3.5 text-[#4C9B35]" />
                      Improve Productivity
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-sm text-xs font-semibold text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2647A5]" />
                      Make Better Decisions
                    </span>
                  </div>

                  {/* Primary Call-To-Action Button */}
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#121316] text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-sm group"
                    >
                      <span>Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FadeIn>
              </div>

              {/* Right-Side Enterprise Architecture Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <EnterpriseArchitectureAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Clean Modern Solutions Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {solutions.map((sol) => (
              <StaggerItem key={sol.title}>
                <HoverCard
                  accent={sol.color}
                  className="h-full bg-white rounded-3xl p-7 sm:p-8 border shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
                  style={{
                    borderColor: `${sol.color}35`,
                  }}
                >
                  <div
                    style={{ backgroundColor: sol.color }}
                    className="absolute top-0 left-0 right-0 h-1.5"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        style={{ backgroundColor: sol.color }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                      >
                        {sol.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {sol.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#121316] tracking-tight mb-2">
                      {sol.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 font-normal">
                      {sol.description}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-black/[0.05] text-[11px] font-semibold text-neutral-700 mb-6">
                      <CheckCircle2 style={{ color: sol.color }} className="w-3.5 h-3.5 shrink-0" />
                      <span>{sol.benefit}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-neutral-400">Tailored Architecture</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#121316] group-hover:text-[#2647A5] transition-colors"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom Consultation CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Implement a Tailored Solution?
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Our engineering principals conduct structured technical reviews to architect solutions aligned with your growth requirements.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-[#E92B2B] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#d62424] transition-colors"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
