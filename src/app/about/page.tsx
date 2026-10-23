"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Target, Compass, ShieldCheck, Zap, Leaf, BrainCircuit } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";
import HumanInnovationAnimation from "@/components/animations/HumanInnovationAnimation";

export default function AboutPage() {
  const pillars = [
    {
      color: "#DE2F28",
      title: "Resilient Discipline",
      tag: "STABILITY",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      description:
        "We build fault-tolerant architectures that handle edge cases seamlessly and survive outages with zero data corruption.",
    },
    {
      color: "#F4A81E",
      title: "Agile Velocity",
      tag: "AUTONOMY",
      icon: <Zap className="w-5 h-5 text-white" />,
      description:
        "Fast feedback loops, transparent communication, and rapid iteration without compromising architectural hygiene.",
    },
    {
      color: "#549B31",
      title: "Sustainable Scale",
      tag: "EFFICIENCY",
      icon: <Leaf className="w-5 h-5 text-white" />,
      description:
        "Clean, optimized cloud architectures that scale gracefully under peak load while eliminating wasteful cloud expenditures.",
    },
    {
      color: "#24419E",
      title: "Cognitive Intelligence",
      tag: "INTELLIGENCE",
      icon: <BrainCircuit className="w-5 h-5 text-white" />,
      description:
        "Deterministic, sovereign AI systems grounded in verified facts, private data boundaries, and strict governance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Human Innovation Animation */}
          <div className="relative mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      ABOUT DUROZEN TECHNOLOGIES
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Crafting High-Performance Technology with{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Human Ingenuity.
                    </span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    Durozen Technologies Pvt. Ltd. is an engineering-first technology partner headquartered in{" "}
                    <a
                      href="https://www.google.com/maps/place/Durozen+Technologies+Private+Limited/@11.148956,78.215225,15z/data=!4m6!3m5!1s0x3babcbd8fe6408d7:0x70d17da5da2fc025!8m2!3d11.1489563!4d78.215225!16s%2Fg%2F11z69cpfgz?hl=en-US"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#DE2F28] transition-colors"
                    >
                      Namakkal, Tamil Nadu, India
                    </a>
                    . As Your Trusted Digital Transformation Partner, we collaborate with growing enterprises and institutions to architect custom software, cloud infrastructure, and intelligent automation systems.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Human Innovation Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <HumanInnovationAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Business Metrics Grid */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-24">
            <StaggerItem>
              <HoverCard accent="red" className="h-full bg-white p-6 sm:p-7 rounded-3xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#DE2F28] font-sans">
                  2+
                </span>
                <div className="mt-4">
                  <h3 className="font-bold text-sm text-[#121316]">
                    Years Experience
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Dedicated agile digital transformation delivery.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard accent="orange" className="h-full bg-white p-6 sm:p-7 rounded-3xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#121316] font-sans">
                  35+
                </span>
                <div className="mt-4">
                  <h3 className="font-bold text-sm text-[#121316]">
                    Projects Delivered
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    High-craft software deployed across domains.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard accent="green" className="h-full bg-white p-6 sm:p-7 rounded-3xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#549B31] font-sans">
                  10+
                </span>
                <div className="mt-4">
                  <h3 className="font-bold text-sm text-[#121316]">
                    Clients Served
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Long-term partnerships founded on trust.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard accent="blue" className="h-full bg-white p-6 sm:p-7 rounded-3xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#24419E] font-sans">
                  3
                </span>
                <div className="mt-4">
                  <h3 className="font-bold text-sm text-[#121316]">
                    Countries Reached
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    International client solutions footprint.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem className="col-span-2 md:col-span-1">
              <HoverCard accent="orange" className="h-full bg-white p-6 sm:p-7 rounded-3xl border border-black/[0.06] shadow-sm flex flex-col justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F4A81E] font-sans">
                  12+
                </span>
                <div className="mt-4">
                  <h3 className="font-bold text-sm text-[#121316]">
                    Engineers
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Specialized full-stack, cloud & AI team.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Mission & Vision Section */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <StaggerItem>
              <HoverCard accent="red" className="h-full bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-[#DE2F28] flex items-center justify-center text-white mb-6">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DE2F28]">
                  OUR MISSION
                </span>
                <h2 className="text-2xl font-bold text-[#121316] mt-1.5 tracking-tight">
                  Empowering Enterprises with Resilient Digital Leverage
                </h2>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-normal">
                  To build dependable software systems and intelligent data workflows that dismantle operational complexity, accelerate decision-making, and provide our partners with decisive technological advantages.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard accent="blue" className="h-full bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-[#24419E] flex items-center justify-center text-white mb-6">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#24419E]">
                  OUR VISION
                </span>
                <h2 className="text-2xl font-bold text-[#121316] mt-1.5 tracking-tight">
                  The Standard for Modern High-Craft Engineering
                </h2>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-normal">
                  To be the global benchmark for enterprise technology partnerships—where elegant product aesthetics, deep architectural rigor, and sovereign AI capabilities unite without compromise.
                </p>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>

          {/* The 4 Durozen Pillars (Red, Yellow, Green, Blue) */}
          <div className="mb-24">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                  OUR CORE FOUNDATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] mt-2 tracking-tight">
                  The Four Pillars of Durozen
                </h2>
                <p className="text-sm text-neutral-600 mt-3">
                  Each color in our identity symbolizes an unwavering pillar of our engineering discipline.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {pillars.map((pillar, idx) => (
                <StaggerItem key={pillar.title}>
                  <HoverCard
                    accent={pillar.color}
                    className="h-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-7 border border-black/[0.06] shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                        <div
                          style={{ backgroundColor: pillar.color }}
                          className="w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                        >
                          <div className="scale-75 md:scale-100 flex items-center justify-center">
                            {pillar.icon}
                          </div>
                        </div>
                        <span className="text-[9px] min-[380px]:text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-600 truncate max-w-[70px] min-[380px]:max-w-none text-right">
                          {pillar.tag}
                        </span>
                      </div>

                      <h3 className="font-bold text-xs min-[380px]:text-sm sm:text-base md:text-lg text-[#121316] tracking-tight leading-tight sm:leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-[10.5px] min-[380px]:text-[11px] sm:text-xs text-neutral-600 mt-1.5 sm:mt-2 md:mt-3 leading-snug sm:leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 md:mt-6 pt-2.5 sm:pt-3 md:pt-4 border-t border-black/[0.04] flex items-center justify-between">
                      <span className="text-[9px] min-[380px]:text-[10px] md:text-xs font-mono font-semibold text-neutral-500">
                        PILLAR // 0{idx + 1}
                      </span>
                      <span
                        style={{ backgroundColor: pillar.color }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0"
                      />
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Call to Action Card */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Want to learn how we can help your team?
                </h2>
                <p className="text-neutral-400 text-sm mt-1">
                  Speak directly with an engineering director.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#DE2F28] text-white font-semibold text-sm hover:bg-[#c6231d] transition-colors shrink-0"
              >
                Contact Durozen
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
