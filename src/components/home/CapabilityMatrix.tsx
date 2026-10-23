"use client";

import React, { useState, useRef } from "react";
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
  ChevronDown,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { FadeIn, getCardAccentClass } from "@/components/common/MotionTransitions";

export default function CapabilityMatrix() {
  const displayServices = servicesData.filter((s) => s.featured);
  const [activeTab, setActiveTab] = useState(displayServices[0]?.id || "custom-software");
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentService =
    displayServices.find((s) => s.id === activeTab) || displayServices[0];

  const iconMap: Record<string, React.ReactNode> = {
    "custom-software": <Code2 className="w-5 h-5 text-white" />,
    "cloud-engineering": <Cloud className="w-5 h-5 text-white" />,
    "ai-solutions": <Sparkles className="w-5 h-5 text-white" />,
    "product-development": <Layers className="w-5 h-5 text-white" />,
  };

  const handleCardClick = (serviceId: string) => {
    // For desktop: update active tab for right-side inspector panel
    setActiveTab(serviceId);

    // For mobile: toggle expandable accordion card
    setExpandedMobileId((prev) => {
      const next = prev === serviceId ? null : serviceId;
      if (next && typeof window !== "undefined" && window.innerWidth < 1024) {
        setTimeout(() => {
          const el = cardRefs.current[next];
          if (el) {
            const rect = el.getBoundingClientRect();
            const headerOffset = 80; // Account for fixed header
            if (rect.top < headerOffset || rect.top > window.innerHeight - 150) {
              const y = window.pageYOffset + rect.top - headerOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
        }, 200);
      }
      return next;
    });
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                Architected for Enterprise{" "}
                <span className="text-[#2647A5] px-1">
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

        {/* Dynamic Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Discipline Selector on Desktop / Compact Expandable List on Mobile */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3">
            {displayServices.map((service) => {
              const isActive = activeTab === service.id;
              const isMobileExpanded = expandedMobileId === service.id;

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[service.id] = el;
                  }}
                  onClick={() => handleCardClick(service.id)}
                  style={{
                    borderColor:
                      isMobileExpanded || isActive
                        ? `${service.color}55`
                        : undefined,
                  }}
                  className={`p-3.5 sm:p-4 lg:p-6 rounded-2xl cursor-pointer text-left relative overflow-hidden transition-all duration-300 ${getCardAccentClass(
                    service.color
                  )} ${
                    isMobileExpanded
                      ? "bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] border"
                      : isActive
                      ? "lg:bg-white lg:shadow-[0_16px_36px_rgba(0,0,0,0.06)] lg:border bg-[#F4F3EE]/70 hover:bg-[#F4F3EE] border border-transparent"
                      : "bg-[#F4F3EE]/60 hover:bg-[#F4F3EE] border border-transparent"
                  }`}
                >
                  {/* Subtle active ring (Desktop only) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{ borderColor: service.color }}
                      className="hidden lg:block absolute inset-0 rounded-2xl border-2 pointer-events-none opacity-40"
                    />
                  )}

                  {/* Header Row: Icon, Titles, Badge, Chevron */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div
                        style={{ backgroundColor: service.color }}
                        className="w-9 h-9 sm:w-10 sm:h-10 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <div className="scale-85 sm:scale-100 flex items-center justify-center">
                          {iconMap[service.id]}
                        </div>
                      </div>

                      <div className="min-w-0 flex flex-col">
                        <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate">
                          {service.badge}
                        </span>
                        <h3 className="font-bold text-sm min-[390px]:text-base lg:text-lg text-[#121316] tracking-tight truncate lg:whitespace-normal">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Mobile Chevron indicator: smoothly rotates when expanded */}
                      <motion.div
                        animate={{ rotate: isMobileExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center text-neutral-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>

                      {/* Desktop "Selected" indicator */}
                      {isActive && (
                        <span
                          style={{ color: service.color }}
                          className="hidden lg:flex text-xs font-bold items-center gap-1"
                        >
                          Selected <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop-only Static Short Description */}
                  <p className="hidden lg:block text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed ml-[52px]">
                    {service.description}
                  </p>

                  {/* Mobile Expandable Details (Smooth Height Transition) */}
                  <AnimatePresence initial={false}>
                    {isMobileExpanded && (
                      <motion.div
                        key={`mobile-details-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="pt-3.5 mt-3 border-t border-black/[0.06] flex flex-col">
                          {/* Headline */}
                          <h4 className="text-sm min-[390px]:text-base font-bold text-[#121316] tracking-tight leading-snug">
                            {service.headline}
                          </h4>

                          {/* Narrative Overview */}
                          <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed font-normal">
                            {service.detailedContent.overview}
                          </p>

                          {/* Key Deliverables & Architecture Points */}
                          <div className="mt-3.5 flex flex-col gap-2">
                            {service.capabilities.slice(0, 4).map((cap, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle2
                                  style={{ color: service.color }}
                                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                />
                                <span className="text-xs font-medium text-neutral-800 leading-tight">
                                  {cap}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Metrics Highlight Row */}
                          <div className="mt-3.5 pt-3 border-t border-black/[0.06] grid grid-cols-3 gap-2">
                            {service.metrics.map((m, idx) => (
                              <div key={idx} className="flex flex-col">
                                <span className="text-base min-[390px]:text-lg font-extrabold text-[#121316] tracking-tight leading-none">
                                  {m.value}
                                </span>
                                <span className="text-[10px] text-neutral-600 mt-1 font-medium leading-tight">
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack Chips */}
                          <div className="mt-3.5 pt-3 border-t border-black/[0.06] flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mr-1">
                              Tech:
                            </span>
                            {service.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10.5px] font-medium px-2.5 py-0.5 rounded-full bg-[#FAF9F6] text-neutral-700 border border-black/[0.06]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action Link to Full Specification */}
                          <div className="mt-4 pt-3 border-t border-black/[0.06] flex justify-end">
                            <Link
                              href={`/services/${service.slug}`}
                              style={{ backgroundColor: service.color }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold tracking-tight shadow-sm active:scale-95 transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Full Specification</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Architecture Inspector Panel (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-7">
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
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight">
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
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                  {currentService.capabilities.slice(0, 4).map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        style={{ color: currentService.color }}
                        className="w-4 h-4 shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-medium text-neutral-800 leading-snug">
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
                      <span className="text-xs sm:text-sm text-neutral-600 mt-0.5 font-medium leading-tight">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase font-semibold tracking-wider text-neutral-600 mr-2">
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
