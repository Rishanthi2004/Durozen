"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cloud,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { FadeIn, getCardAccentClass } from "@/components/common/MotionTransitions";

export default function CapabilityMatrix() {
  const displayServices = servicesData.filter((s) => s.featured);
  const [activeTab, setActiveTab] = useState(displayServices[0]?.id || "custom-software");
  const currentService =
    displayServices.find((s) => s.id === activeTab) || displayServices[0];

  const iconMap: Record<string, React.ReactNode> = {
    "custom-software": <Code2 className="w-5 h-5 text-white" />,
    "cloud-engineering": <Cloud className="w-5 h-5 text-white" />,
    "ai-solutions": <Sparkles className="w-5 h-5 text-white" />,
    "product-development": <Layers className="w-5 h-5 text-white" />,
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2647A5]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  DISCIPLINE & CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                Architected for Enterprise{" "}
                <span className="font-editorial font-normal italic text-[1.15em] px-1">
                  Velocity
                </span>{" "}
                & Reliability.
              </h2>
            </div>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#121316] hover:text-[#2647A5] transition-colors pb-1"
            >
              <span>View All Engineering Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* Dynamic Editorial Split Layout (Not a generic card grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Discipline Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {displayServices.map((service, idx) => {
              const isActive = activeTab === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  style={{
                    borderColor: isActive ? `${service.color}45` : undefined,
                  }}
                  className={`p-6 rounded-2xl cursor-pointer text-left relative overflow-hidden transition-all duration-300 ${getCardAccentClass(service.color)} ${
                    isActive
                      ? "bg-white shadow-[0_16px_36px_rgba(0,0,0,0.06)] border"
                      : "bg-[#F4F3EE]/60 hover:bg-[#F4F3EE] border border-transparent"
                  }`}
                >
                  {/* Left Accent indicator stripe */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{ backgroundColor: service.color }}
                      className="absolute top-0 left-0 bottom-0 w-1.5"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      style={{ backgroundColor: service.color }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    >
                      {iconMap[service.id]}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600">
                          0{idx + 1} • {service.badge}
                        </span>
                        {isActive && (
                          <span
                            style={{ color: service.color }}
                            className="text-xs font-bold flex items-center gap-1"
                          >
                            Selected <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-[#121316] mt-1 tracking-tight">
                        {service.title}
                      </h3>

                      <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Architecture Inspector Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all duration-300 ${getCardAccentClass(currentService.color)}`}
                style={{
                  borderColor: `${currentService.color}35`,
                }}
              >
                {/* Header of Detail Panel */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
                  <div>
                    <span
                      style={{ color: currentService.color }}
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                    >
                      {currentService.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mt-1">
                      {currentService.headline}
                    </h3>
                  </div>

                  <Link
                    href={`/services/${currentService.slug}`}
                    style={{ backgroundColor: currentService.color }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-bold tracking-tight shadow-sm hover:opacity-95 transition-opacity"
                  >
                    <span>Full Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Narrative Overview */}
                <p className="mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  {currentService.detailedContent.overview}
                </p>

                {/* Key Deliverables & Architecture Points */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {currentService.capabilities.slice(0, 4).map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.04]"
                    >
                      <CheckCircle2
                        style={{ color: currentService.color }}
                        className="w-4 h-4 shrink-0 mt-0.5"
                      />
                      <span className="text-xs font-medium text-neutral-800 leading-snug">
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metrics Highlight Row */}
                <div className="mt-8 pt-6 border-t border-black/[0.06] grid grid-cols-3 gap-2 sm:gap-4">
                  {currentService.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#121316] tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-neutral-600 mt-0.5 font-medium leading-tight">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-600 mr-2">
                    Technologies:
                  </span>
                  {currentService.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-[#F4F3EE] text-neutral-700 border border-black/[0.04]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
