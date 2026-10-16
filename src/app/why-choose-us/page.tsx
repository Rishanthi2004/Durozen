"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Users,
  Zap,
  ShieldCheck,
  Cloud,
  Sparkles,
  MessageSquare,
  Headphones,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";

export default function WhyChooseUsPage() {
  const benefits = [
    {
      title: "Experienced Engineers",
      summary: "Senior talent with deep domain mastery across full-stack and cloud.",
      description:
        "Our team of 12+ seasoned engineers brings multi-year expertise in distributed computing, enterprise application frameworks, and production generative AI.",
      color: "#DE2F28",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      title: "Agile Delivery",
      summary: "High-velocity two-week sprints with rapid feedback loops.",
      description:
        "We prioritize fast, incremental releases backed by continuous integration. You see tangible working software every two weeks rather than waiting months for a reveal.",
      color: "#F4A81E",
      icon: <Zap className="w-5 h-5 text-white" />,
    },
    {
      title: "Secure Development",
      summary: "Zero-trust principles, cryptographic safeguards & compliance.",
      description:
        "Security is engineered into our code from Day Zero. We implement static analysis, encrypted transit and rest vaults, role-based IAM, and strict audit compliance.",
      color: "#549B31",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
    },
    {
      title: "Cloud-Native Architecture",
      summary: "Kubernetes orchestration and multi-region high availability.",
      description:
        "We build scalable containerized microservices and automated infrastructure as code that survive regional cloud outages with zero downtime and sub-second failover.",
      color: "#24419E",
      icon: <Cloud className="w-5 h-5 text-white" />,
    },
    {
      title: "AI Integration",
      summary: "Deterministic, hallucination-resistant autonomous agent workflows.",
      description:
        "We embed practical, privacy-first artificial intelligence into existing enterprise operations, automating document parsing, inquiry triage, and transactional data sync.",
      color: "#DE2F28",
      icon: <Sparkles className="w-5 h-5 text-white" />,
    },
    {
      title: "Transparent Communication",
      summary: "Direct engineer access with daily burndown visibility.",
      description:
        "No opaque layers of account managers. You collaborate directly with principal architects and lead developers through real-time communication channels and open code repositories.",
      color: "#24419E",
      icon: <MessageSquare className="w-5 h-5 text-white" />,
    },
    {
      title: "Dedicated Support",
      summary: "SLA-backed response times and proactive operational care.",
      description:
        "Our engineering team provides dedicated maintenance, automated anomaly alerting, and rapid incident response to guarantee smooth day-to-day operations.",
      color: "#549B31",
      icon: <Headphones className="w-5 h-5 text-white" />,
    },
    {
      title: "Scalable Systems",
      summary: "Architectures engineered to handle exponential user growth.",
      description:
        "From database indexing and read replicas to distributed caching with Redis, we design software architectures ready to handle 10x traffic surges effortlessly.",
      color: "#F4A81E",
      icon: <Maximize2 className="w-5 h-5 text-white" />,
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
                <span className="w-2 h-2 rounded-full bg-[#549B31]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  THE DUROZEN ADVANTAGE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                Why Industry Leaders Choose{" "}
                <span className="font-editorial font-normal italic text-[1.14em] px-1">
                  Durozen
                </span>{" "}
                Technologies.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                We combine deep engineering craftsmanship, agile transparency, and uncompromising architectural standards to deliver lasting competitive advantage.
              </p>
            </div>
          </FadeIn>

          {/* Benefits Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((item, idx) => (
              <StaggerItem key={item.title}>
                <HoverCard
                  accent={item.color}
                  className="h-full bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden group"
                >
                  <div
                    style={{ backgroundColor: item.color }}
                    className="absolute top-0 left-0 right-0 h-1.5"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
                      >
                        {item.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg text-[#121316] tracking-tight mb-2">
                      {item.title}
                    </h2>

                    <p className="text-xs font-semibold text-neutral-800 mb-2 leading-snug">
                      {item.summary}
                    </p>

                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-2 text-xs font-semibold text-[#549B31]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Guaranteed Principle</span>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom Consultation CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Accelerate Your Digital Transformation?
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Partner with Durozen Technologies to build high-craft, dependable digital systems.
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
