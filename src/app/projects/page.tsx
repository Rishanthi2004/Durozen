"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowUpRight, ExternalLink, ShieldCheck, Terminal, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { mobileAppsData } from "@/data/mobileProjects";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";
import DigitalProductAnimation from "@/components/animations/DigitalProductAnimation";

export default function ProjectsPage() {
  const [selectedSector, setSelectedSector] = useState("All");

  const sectors = [
    "All",
    "Education & Institutional Systems",
    "Construction & Real Estate",
    "Fintech & Financial Services",
    "Logistics & Global Trade",
    "Retail & Enterprise Operations",
  ];

  const filteredProjects =
    selectedSector === "All"
      ? projectsData
      : projectsData.filter((p) => p.sector === selectedSector);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Digital Product Animation */}
          <div className="relative mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Architectural Proof Across{" "}
                    <span className="text-[#24419E] px-1">
                      Mission-Critical
                    </span>{" "}
                    Domains.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    Explore real-world software, portals, and cloud solutions engineered by Durozen Technologies for educational institutions, financial funds, real estate, and global commerce.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Digital Product Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <DigitalProductAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Interactive Sector Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-black/[0.06]">
            {sectors.map((sector) => {
              const isSelected = selectedSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                    isSelected
                      ? "bg-[#121316] text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-black/[0.06] hover:bg-neutral-50"
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-24">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="h-full"
                >
                  <HoverCard
                    accent={project.accentColor}
                    className="h-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
                  >
                    {/* Brand color accent strip */}
                    <div
                      style={{ backgroundColor: project.accentColor }}
                      className="absolute top-0 left-0 right-0 h-1"
                    />

                    <div>
                      {/* Top: Actual Homepage Screenshot Container */}
                      <div className="mb-4 rounded-xl sm:rounded-2xl bg-[#EDEFF5]/60 p-2.5 sm:p-3 border border-black/[0.05]">
                        {project.image ? (
                          project.website ? (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Open ${project.title} live website`}
                              className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.07] bg-white shadow-sm cursor-pointer group/shot"
                            >
                              <Image
                                src={project.image}
                                alt={`${project.title} Live Homepage`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.02]"
                                priority={project.featured}
                              />
                              {/* Subtle hover overlay badge */}
                              <div className="absolute inset-0 bg-black/0 group-hover/shot:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover/shot:opacity-100">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-[#121316] text-xs font-bold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover/shot:translate-y-0 transition-all duration-200">
                                  <span>Open Live Site</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-[#24419E]" />
                                </span>
                              </div>
                            </a>
                          ) : (
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.07] bg-white shadow-sm">
                              <Image
                                src={project.image}
                                alt={`${project.title} Homepage`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-top"
                              />
                            </div>
                          )
                        ) : (
                          /* Authentic Internal Architecture Banner for Offline POS (No fake screenshot) */
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.07] bg-gradient-to-br from-[#121316] via-[#1a1c23] to-[#24419E] p-6 text-white flex flex-col justify-between shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                                <Terminal className="w-3 h-3 text-[#DE2F28]" />
                                <span>On-Premise Software</span>
                              </div>
                              <span className="text-[10px] font-mono text-white/60">
                                Offline-Ready
                              </span>
                            </div>

                            <div className="my-auto py-2">
                              <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                                High-Speed Retail POS & Inventory Sync
                              </h4>
                              <p className="mt-1 text-xs text-white/70 line-clamp-2">
                                Sub-second barcode checkout, SQLite local persistence, and automated cloud sync once network reconnects.
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-medium text-white/70">
                              <span>Hardware Thermal API</span>
                              <span className="inline-flex items-center gap-1 text-emerald-400">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Zero Downtime</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project Meta (Sector & Year) */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded bg-[#FAF9F6] text-neutral-600 border border-black/[0.04]">
                          {project.sector}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">
                          {project.year}
                        </span>
                      </div>

                      {/* Project Title (h2 for valid hierarchy under h1) */}
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#24419E] tracking-tight group-hover:text-[#121316] transition-colors leading-snug">
                        {project.title}
                      </h2>

                      {/* Short Project Description */}
                      <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {project.summary}
                      </p>

                      {/* Key Features List (Clean & Compact) */}
                      {project.features && (
                        <div className="mt-4 space-y-1.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                            KEY HIGHLIGHTS
                          </span>
                          <div className="space-y-1">
                            {project.features.slice(0, 3).map((feat, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-xs text-neutral-700"
                              >
                                <span
                                  style={{ backgroundColor: project.accentColor }}
                                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                                />
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom: Tech Stack Tags & View Live Website Button */}
                    <div className="mt-5 pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-2 py-0.5 rounded bg-[#FAF9F6] text-neutral-600 border border-black/[0.04]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Live Website Button / Link */}
                      {project.website ? (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#121316] text-white text-xs font-bold tracking-tight hover:bg-[#24419E] hover:shadow-sm transition-all duration-200 shrink-0"
                        >
                          <span>View Live Website</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-black/[0.06] text-neutral-500 text-[11px] font-semibold shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          <span>Internal System</span>
                        </div>
                      )}
                    </div>
                  </HoverCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Dedicated Mobile App Development Section */}
          <div className="mb-24 pt-8 border-t border-black/[0.06]">
            <FadeIn>
              <div className="mb-10 sm:mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] leading-tight">
                      Mobile App Development
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
                      Production-grade Android applications engineered by Durozen Technologies, published on the Google Play Store for mission-critical retail, logistics, and wholesale operations.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-black/[0.07] text-xs font-semibold text-neutral-600 shadow-sm self-start md:self-auto">
                    <Smartphone className="w-4 h-4 text-[#24419E]" />
                    <span>3 Apps on Google Play</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Mobile Apps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {mobileAppsData.map((app, idx) => (
                <FadeIn key={app.id} delay={idx * 0.1}>
                  <HoverCard
                    accent={app.accentColor}
                    className="h-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
                  >
                    {/* Brand color accent strip */}
                    <div
                      style={{ backgroundColor: app.accentColor }}
                      className="absolute top-0 left-0 right-0 h-1"
                    />

                    <div>
                      {/* Header: Real App Icon + Title & Category */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/[0.08] bg-[#FAF9F6] shadow-sm shrink-0">
                          <Image
                            src={app.icon}
                            alt={`${app.name} App Icon`}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-extrabold text-[#121316] tracking-tight group-hover:text-[#24419E] transition-colors truncate">
                            {app.name}
                          </h3>
                          <p className="text-xs text-neutral-500 font-medium truncate mt-0.5">
                            {app.tagline}
                          </p>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{app.badge}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Real Screenshot Preview */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.07] bg-[#EDEFF5]/60 mb-4 p-2 sm:p-2.5 shadow-sm group/screen">
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${app.name} on Google Play`}
                          className="block relative w-full h-full rounded-lg overflow-hidden border border-black/[0.06] bg-white"
                        >
                          <Image
                            src={app.screenshot}
                            alt={`${app.name} Screenshot`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-top transition-transform duration-500 group-hover/screen:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/screen:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover/screen:opacity-100">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#121316] text-xs font-bold shadow-lg backdrop-blur-sm">
                              <span>Preview on Store</span>
                              <ExternalLink className="w-3 h-3 text-[#24419E]" />
                            </span>
                          </div>
                        </a>
                      </div>

                      {/* Sector Pill */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded bg-[#FAF9F6] text-neutral-600 border border-black/[0.04]">
                          {app.category}
                        </span>
                        <span className="text-xs font-mono text-neutral-500">
                          Android App
                        </span>
                      </div>

                      {/* Short Description */}
                      <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {app.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 pt-3 border-t border-black/[0.05] space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                          CORE CAPABILITIES
                        </span>
                        {app.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-neutral-700"
                          >
                            <span
                              style={{ backgroundColor: app.accentColor }}
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                            />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Button: View on Google Play */}
                    <div className="mt-6 pt-4 border-t border-black/[0.06]">
                      <a
                        href={app.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-[#121316] text-white text-xs sm:text-sm font-bold tracking-tight hover:bg-[#24419E] hover:shadow-md transition-all duration-200 group/btn"
                      >
                        <svg
                          className="w-4 h-4 shrink-0 fill-current text-white group-hover/btn:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-.937V2.75c.16-.36.38-.68.61-.937zm11.254 11.254l2.457 2.457-11.45 6.467 8.993-8.924zm0-2.136L5.87 2.008l11.45 6.467-2.457 2.457zm1.485 1.068l3.418 1.928a1.2 1.2 0 0 1 0 2.086l-3.418 1.928-2.128-2.128 2.128-2.014z" />
                        </svg>
                        <span>View on Google Play</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 text-white/80 group-hover/btn:text-white" />
                      </a>
                    </div>
                  </HoverCard>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Bottom Custom Brief CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Have a Similar Architecture in Mind?
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto">
                Our engineering team can evaluate your technical requirements and construct a confidential proof-of-concept.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors"
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
