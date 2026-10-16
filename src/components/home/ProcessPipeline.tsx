"use client";

import React from "react";
import Link from "next/link";
import { Search, Terminal, Cpu, Gauge } from "lucide-react";
import { FadeIn, StaggerContainer, HoverCard, defaultItemVariants } from "@/components/common/MotionTransitions";

export default function ProcessPipeline() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      description:
        "Understand client requirements, business goals, define technical architecture, and establish a clear project roadmap.",
      icon: <Search className="w-5 h-5 text-white" />,
      color: "#E92B2B", // 1. Durozen Red
      tag: "PHASES 1-2",
    },
    {
      num: "02",
      title: "Planning & Design",
      description:
        "Organise scope, milestones, and resources while crafting user-friendly, accessible, and intuitive UI/UX interfaces.",
      icon: <Terminal className="w-5 h-5 text-white" />,
      color: "#F9A916", // 2. Durozen Yellow
      tag: "PHASES 3-4",
    },
    {
      num: "03",
      title: "Development & Testing",
      description:
        "Build reliable and scalable software with test-driven rigor, checking functionality, performance, and security gates.",
      icon: <Cpu className="w-5 h-5 text-white" />,
      color: "#4C9B35", // 3. Durozen Green
      tag: "PHASES 5-6",
    },
    {
      num: "04",
      title: "Deploy, Monitor & Improve",
      description:
        "Launch the solution with zero downtime, track real-time reliability and performance, and continuously improve.",
      icon: <Gauge className="w-5 h-5 text-white" />,
      color: "#2647A5", // 4. Durozen Blue
      tag: "PHASES 7-9",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F4F3EE]/60 border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
              Predictable Delivery.{" "}
              <span className="text-[#B45309] px-1">
                Uncompromising
              </span>{" "}
              Quality.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-[65ch] mx-auto">
              A 9-stage engineering workflow engineered to turn complex roadmaps into high-impact digital realities.
            </p>
            <div className="mt-4">
              <Link
                href="/process"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#DE2F28] hover:underline"
              >
                <span>Explore Complete 9-Stage Process</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* 4 Pipeline Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <HoverCard
              key={step.num}
              variants={defaultItemVariants}
              accent={step.color}
              className="h-full bg-white rounded-3xl p-7 border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    style={{ backgroundColor: step.color }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                  >
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-neutral-500 group-hover:text-[#121316] transition-colors">
                    {step.num}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  {step.tag}
                </span>

                <h3 className="font-bold text-lg text-[#121316] mt-1.5 tracking-tight leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.04]">
                <div className="w-full bg-[#FAF9F6] h-1.5 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${(idx + 1) * 25}%`,
                      backgroundColor: step.color,
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            </HoverCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
