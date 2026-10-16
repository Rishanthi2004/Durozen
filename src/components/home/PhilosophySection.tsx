"use client";

import React from "react";
import { ShieldCheck, Zap, Leaf, BrainCircuit } from "lucide-react";
import { FadeIn, StaggerContainer, HoverCard, defaultItemVariants } from "@/components/common/MotionTransitions";

export default function PhilosophySection() {
  const principles = [
    {
      title: "Resilient by Construction",
      description:
        "We build fault-tolerant systems with circuit breakers, idempotency, and automated healing that gracefully survive infrastructure outages.",
      color: "#E92B2B", // 1. Durozen Red
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      tag: "STABILITY",
    },
    {
      title: "Sovereignty & True IP Ownership",
      description:
        "Every line of source code, cloud template, and model artifact belongs 100% to your organization—never vendor locked or proprietary captive.",
      color: "#F9A916", // 2. Durozen Yellow
      icon: <Zap className="w-5 h-5 text-white" />,
      tag: "AUTONOMY",
    },
    {
      title: "Efficiency & Elastic Cloud Footprint",
      description:
        "Clean architectures reduce unnecessary compute costs. We optimize microservices, caches, and database schemas to eliminate cloud waste.",
      color: "#4C9B35", // 3. Durozen Green
      icon: <Leaf className="w-5 h-5 text-white" />,
      tag: "EFFICIENCY",
    },
    {
      title: "Deterministic, Grounded AI",
      description:
        "AI should solve business workflows deterministically. We design LLM agents with rigorous human-in-the-loop controls and zero hallucination tolerances.",
      color: "#2647A5", // 4. Durozen Blue
      icon: <BrainCircuit className="w-5 h-5 text-white" />,
      tag: "INTELLIGENCE",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F4F3EE]/80 relative overflow-hidden border-t border-black/[0.05]">
      {/* Decorative smooth curved background contour */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-white/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.14]">
              Software should be{" "}
              <span className="text-[#DE2F28] px-1">
                Quiet,
              </span>{" "}
              Dependable, and Intensely Powerful.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-[52ch] mx-auto">
              At Durozen Technologies Pvt. Ltd., Your Trusted Digital Transformation Partner, we reject bloated software architectures. We combine algorithmic rigor, clean code standards, and modern cloud design to deliver lasting competitive advantage.
            </p>
          </div>
        </FadeIn>

        {/* 4 Brand Pillars (Non-generic grid with custom staggered geometry) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, index) => (
            <HoverCard
              key={item.title}
              variants={defaultItemVariants}
              accent={item.color}
              className="h-full bg-white rounded-3xl p-7 border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#121316] tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-neutral-600">
                  PILLAR // 0{index + 1}
                </span>
                <span
                  style={{ backgroundColor: item.color }}
                  className="w-2 h-2 rounded-full"
                />
              </div>
            </HoverCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
