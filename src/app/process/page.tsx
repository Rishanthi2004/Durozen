"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Search,
  Compass,
  CalendarDays,
  Layout,
  Code2,
  ShieldCheck,
  Rocket,
  Activity,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";

export default function ProcessPage() {
  const steps = [
    {
      stepNumber: "01",
      title: "Discovery",
      summary: "Understand client requirements and business goals.",
      description:
        "We immerse ourselves in your domain, interviewing stakeholders, mapping operational workflows, and auditing current technical constraints to define clear project objectives.",
      icon: <Search className="w-5 h-5 text-white" />,
      color: "#DE2F28",
      accent: "bg-[#DE2F28]/10 text-[#DE2F28]",
    },
    {
      stepNumber: "02",
      title: "Strategy",
      summary: "Define the technical approach and project roadmap.",
      description:
        "Our software architects formulate the system design, choose optimal technology stacks, evaluate cloud topology, and structure an actionable timeline with clear deliverables.",
      icon: <Compass className="w-5 h-5 text-white" />,
      color: "#F4A81E",
      accent: "bg-[#F4A81E]/10 text-[#F4A81E]",
    },
    {
      stepNumber: "03",
      title: "Planning",
      summary: "Organise scope, resources, and milestones.",
      description:
        "We break the roadmap into high-cadence two-week sprint backlog items, allocate specialized engineering resources, and set unambiguous acceptance criteria for each milestone.",
      icon: <CalendarDays className="w-5 h-5 text-white" />,
      color: "#549B31",
      accent: "bg-[#549B31]/10 text-[#549B31]",
    },
    {
      stepNumber: "04",
      title: "Design",
      summary: "Create user-friendly and accessible interfaces.",
      description:
        "Crafting intuitive user journeys, interactive wireframes, and design systems in Figma adhering to WCAG 2.1 AA accessibility standards for seamless user experiences.",
      icon: <Layout className="w-5 h-5 text-white" />,
      color: "#24419E",
      accent: "bg-[#24419E]/10 text-[#24419E]",
    },
    {
      stepNumber: "05",
      title: "Development",
      summary: "Build reliable and scalable software.",
      description:
        "Our engineers construct clean, modular code with test-driven discipline, following domain-driven design, zero-trust security postures, and type-safe API boundaries.",
      icon: <Code2 className="w-5 h-5 text-white" />,
      color: "#DE2F28",
      accent: "bg-[#DE2F28]/10 text-[#DE2F28]",
    },
    {
      stepNumber: "06",
      title: "Testing",
      summary: "Check functionality, performance, and security.",
      description:
        "Rigorous verification across automated unit tests, integration gates, end-to-end user journeys, simulated concurrency load stress tests, and automated vulnerability scanning.",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: "#549B31",
      accent: "bg-[#549B31]/10 text-[#549B31]",
    },
    {
      stepNumber: "07",
      title: "Deployment",
      summary: "Launch the solution.",
      description:
        "Seamless production release executed via automated blue/green or canary CI/CD pipelines, containerized Kubernetes orchestration, and zero downtime for end users.",
      icon: <Rocket className="w-5 h-5 text-white" />,
      color: "#24419E",
      accent: "bg-[#24419E]/10 text-[#24419E]",
    },
    {
      stepNumber: "08",
      title: "Monitoring",
      summary: "Track reliability and performance.",
      description:
        "Continuous 24/7 observability with real-time distributed tracing, automated latency alerts, server health probes, and live uptime dashboards ensuring 99.99% availability.",
      icon: <Activity className="w-5 h-5 text-white" />,
      color: "#F4A81E",
      accent: "bg-[#F4A81E]/10 text-[#F4A81E]",
    },
    {
      stepNumber: "09",
      title: "Continuous Improvement",
      summary: "Maintain and improve the product.",
      description:
        "Proactive patch cycles, performance optimizations, feature enhancements based on user analytics, and ongoing architectural scaling as business volume grows.",
      icon: <RefreshCw className="w-5 h-5 text-white" />,
      color: "#DE2F28",
      accent: "bg-[#DE2F28]/10 text-[#DE2F28]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn>
            <div className="max-w-3xl mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#F4A81E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  ENGINEERING LIFECYCLE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                Our Complete 9-Stage{" "}
                <span className="font-editorial font-normal italic text-[1.14em] px-1">
                  Development
                </span>{" "}
                Workflow.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                A transparent, predictable engineering lifecycle engineered by Durozen Technologies to transform complex requirements into dependable, high-impact software.
              </p>
            </div>
          </FadeIn>

          {/* Process Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {steps.map((step) => (
              <StaggerItem key={step.stepNumber}>
                <HoverCard
                  accent={step.color}
                  className="h-full bg-white rounded-3xl p-8 border border-black/[0.07] shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden group"
                >
                  <div
                    style={{ backgroundColor: step.color }}
                    className="absolute top-0 left-0 right-0 h-1.5"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        style={{ backgroundColor: step.color }}
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
                      >
                        {step.icon}
                      </div>
                      <span className="text-2xl font-black tracking-tight text-neutral-300 group-hover:text-[#121316] transition-colors">
                        {step.stepNumber}
                      </span>
                    </div>

                    <span
                      style={{ color: step.color }}
                      className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                    >
                      PHASE {step.stepNumber}
                    </span>

                    <h2 className="text-xl font-bold text-[#121316] tracking-tight mb-2">
                      {step.title}
                    </h2>

                    <p className="text-xs font-semibold text-neutral-800 mb-3 leading-snug">
                      {step.summary}
                    </p>

                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-neutral-500">
                    <span>Durozen Standard</span>
                    <span style={{ color: step.color }}>✓ Active Gate</span>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom Consultation CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Begin Your Project Discovery?
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Schedule a preliminary session with our solutions architects to define your roadmap, scope, and technical strategy.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors"
                >
                  Book a Consultation
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
