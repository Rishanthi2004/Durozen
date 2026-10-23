"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Code2,
  Building2,
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  Sparkles,
  Database,
  Layout,
  Layers,
  Network,
  Compass,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";
import SoftwareEngineeringAnimation from "@/components/animations/SoftwareEngineeringAnimation";

export default function ServicesPage() {
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>("custom-software");
  const mobileCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const iconMap: Record<string, React.ReactNode> = {
    "custom-software": <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "enterprise-applications": <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "website-development": <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "mobile-app-development": <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "cloud-engineering": <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "devops-services": <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "ai-solutions": <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "data-engineering": <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "ui-ux-design": <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "product-development": <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "api-development": <Network className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "it-consulting": <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    "qa-test-automation": <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  };

  const servicesPageOrder = [
    "custom-software",
    "website-development",
    "mobile-app-development",
    "ui-ux-design",
    "product-development",
    "api-development",
    "enterprise-applications",
  ];

  const brandColors = ["#E92B2B", "#F9A916", "#4C9B35", "#2647A5"];

  const displayedServices = servicesPageOrder
    .map((slug) => servicesData.find((s) => s.slug === slug || s.id === slug))
    .filter((s): s is (typeof servicesData)[number] => Boolean(s))
    .map((service, idx) => ({
      ...service,
      color: brandColors[idx % brandColors.length],
    }));

  const toggleMobileCard = (serviceId: string) => {
    setExpandedMobileId((prev) => {
      const next = prev === serviceId ? null : serviceId;
      if (next && typeof window !== "undefined" && window.innerWidth < 1024) {
        setTimeout(() => {
          const el = mobileCardRefs.current[next];
          if (el) {
            const rect = el.getBoundingClientRect();
            const headerOffset = 90;
            if (rect.top < headerOffset || rect.top > window.innerHeight - 120) {
              const y = window.pageYOffset + rect.top - headerOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
        }, 150);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-24 sm:pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Software Engineering Animation */}
          <div className="relative mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#549B31]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      DUROZEN PRACTICES
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Engineering Disciplines Built for{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Precision
                    </span>{" "}
                    & Scale.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    From bespoke software and web platforms to mobile apps, UI/UX design, and enterprise systems, Durozen Technologies provides specialized engineering practices designed to accelerate business transformation.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Software Engineering Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <SoftwareEngineeringAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MOBILE ACCORDION VIEW (< lg): Compact, Fast Browsing, Drastically Shorter
              ========================================================================= */}
          <div className="block lg:hidden space-y-3 mb-16">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 mb-2 px-1">
              Tap a practice to view capabilities
            </div>
            {displayedServices.map((service, index) => {
              const isExpanded = expandedMobileId === service.id;

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    mobileCardRefs.current[service.id] = el;
                  }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "bg-white border-black/15 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
                      : "bg-white border-black/[0.07] shadow-sm hover:border-black/15"
                  }`}
                >
                  {/* Collapsed Header / Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleMobileCard(service.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 select-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        style={{ backgroundColor: service.color }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      >
                        {iconMap[service.id] || <Code2 className="w-5 h-5 text-white" />}
                      </div>
                      <div className="min-w-0">
                        <span
                          style={{ color: service.color }}
                          className="text-[10px] font-bold uppercase tracking-[0.18em] block"
                        >
                          PRACTICE {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#121316] tracking-tight truncate">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isExpanded ? "rotate-180 bg-neutral-100" : "bg-[#FAF9F6]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-neutral-600" />
                      </span>
                    </div>
                  </button>

                  {/* Expandable Content with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 border-t border-black/[0.05] space-y-5">
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal pt-2">
                            {service.description}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-[#FAF9F6] border border-black/[0.04]">
                            {service.metrics.map((m, idx) => (
                              <div key={idx} className="flex flex-col text-center">
                                <span className="text-base sm:text-lg font-extrabold text-[#121316]">
                                  {m.value}
                                </span>
                                <span className="text-[9px] text-neutral-500 font-medium leading-tight mt-0.5">
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Key Benefits */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-2">
                              KEY BUSINESS BENEFITS
                            </h4>
                            <div className="space-y-1.5">
                              {service.keyBenefits.map((benefit, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-neutral-700 bg-[#FAF9F6] p-2.5 rounded-lg border border-black/[0.03]"
                                >
                                  <CheckCircle2
                                    style={{ color: service.color }}
                                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                  />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Core Capabilities */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-2">
                              CORE CAPABILITIES
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {service.capabilities.map((cap, i) => (
                                <div
                                  key={i}
                                  className="text-xs text-neutral-700 flex items-center gap-2 bg-[#FAF9F6] p-2 rounded-md border border-black/[0.03]"
                                >
                                  <span
                                    style={{ backgroundColor: service.color }}
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                  />
                                  <span>{cap}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-2">
                              TECHNOLOGY FRAMEWORKS
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#FAF9F6] text-neutral-700 border border-black/[0.04]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action CTAs */}
                          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                            <Link
                              href="/contact"
                              style={{ backgroundColor: service.color }}
                              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-xs shadow-sm hover:opacity-95 transition-opacity"
                            >
                              <span>{service.ctaText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-[#121316] bg-[#FAF9F6] border border-black/[0.07] hover:bg-neutral-100 transition-colors"
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

          {/* =========================================================================
              DESKTOP VIEW (lg:): Full 2-Column Detailed Showcase (100% Unchanged)
              ========================================================================= */}
          <div className="hidden lg:block space-y-16 mb-24">
            {displayedServices.map((service, index) => (
              <FadeIn key={service.id} delay={0.05}>
                <HoverCard
                  id={service.slug}
                  accent={service.color}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] relative overflow-hidden"
                >
                  {/* Brand top edge stripe */}
                  <div
                    style={{ backgroundColor: service.color }}
                    className="absolute top-0 left-0 right-0 h-1.5"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column: Overview and Link */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            style={{ backgroundColor: service.color }}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                          >
                            {iconMap[service.id] || <Code2 className="w-6 h-6 text-white" />}
                          </div>
                          <div>
                            <span
                              style={{ color: service.color }}
                              className="text-xs font-bold uppercase tracking-[0.18em]"
                            >
                              PRACTICE {index < 9 ? `0${index + 1}` : index + 1}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight">
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-6">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] mb-8">
                          {service.metrics.map((m, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-xl sm:text-2xl font-extrabold text-[#121316]">
                                {m.value}
                              </span>
                              <span className="text-[10px] text-neutral-600 mt-0.5 font-medium leading-tight">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href="/contact"
                          style={{ backgroundColor: service.color }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm tracking-tight shadow-sm hover:opacity-95 transition-opacity"
                        >
                          <span>{service.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#121316] bg-[#FAF9F6] border border-black/[0.07] hover:bg-neutral-100 transition-colors"
                        >
                          <span>Full Specification</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Architecture, Capabilities & Key Benefits */}
                    <div className="lg:col-span-7 bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-black/[0.05]">
                      {/* Key Benefits */}
                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-3">
                        KEY BUSINESS BENEFITS
                      </h3>
                      <div className="space-y-2 mb-6">
                        {service.keyBenefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/[0.04] text-xs font-medium text-neutral-800"
                          >
                            <CheckCircle2
                              style={{ color: service.color }}
                              className="w-4 h-4 shrink-0 mt-0.5"
                            />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-3 pt-4 border-t border-black/[0.06]">
                        CORE CAPABILITIES
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {service.capabilities.map((cap, i) => (
                          <div
                            key={i}
                            className="text-xs text-neutral-700 flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-black/[0.03]"
                          >
                            <span
                              style={{ backgroundColor: service.color }}
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                            />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-3 pt-4 border-t border-black/[0.06]">
                        TECHNOLOGY FRAMEWORKS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white text-neutral-700 border border-black/[0.05]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </FadeIn>
            ))}
          </div>

          {/* Bottom Consultation CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-6 sm:p-14 text-center max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Need a Custom Engineering Architecture?
              </h2>
              <p className="mt-3 text-neutral-300 text-xs sm:text-base max-w-xl mx-auto font-normal">
                Our engineering principals conduct structured technical reviews to architect solutions tailored directly to your operational requirements.
              </p>
              <div className="mt-6 sm:mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#DE2F28] text-white font-bold text-xs sm:text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors"
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
