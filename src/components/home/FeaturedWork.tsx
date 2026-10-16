"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";

export default function FeaturedWork() {
  const featured = projectsData.filter((p) => p.featured);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#549B31]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  PROVEN OUTCOMES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                Real Systems Delivered for{" "}
                <span className="font-editorial font-normal italic text-[1.15em] px-1">
                  Real Scale.
                </span>
              </h2>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#121316] hover:text-[#549B31] transition-colors pb-1"
            >
              <span>Explore All 35+ Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* Featured Projects Showcase List */}
        <div className="space-y-10">
          {featured.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.1}>
              <HoverCard
                accent={project.accentColor}
                className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 border border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.07)] relative overflow-hidden group"
              >
              {/* Subtle accent corner highlight */}
              <div
                style={{ backgroundColor: project.accentColor }}
                className="absolute top-0 right-0 w-32 h-1.5 opacity-80"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-[#FAF9F6] border border-black/[0.06] text-neutral-700">
                        {project.sector}
                      </span>
                      <span className="text-xs text-neutral-600 font-semibold">
                        • {project.client}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight leading-tight group-hover:text-neutral-900 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                      {project.summary}
                    </p>
                  </div>

                  {/* Impact Metrics Row */}
                  <div className="mt-8 pt-6 border-t border-black/[0.06] grid grid-cols-3 gap-2 sm:gap-4">
                    {project.impactMetrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-lg sm:text-2xl font-extrabold text-[#121316] tracking-tight">
                            {m.value}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-neutral-600 mt-0.5 font-medium leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#FAF9F6] text-neutral-600 border border-black/[0.04]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Architectural Visual Card */}
                <div className="lg:col-span-5 bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-black/[0.05] flex flex-col justify-between h-full min-h-[260px] relative">
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: project.accentColor }}
                        className="w-2.5 h-2.5 rounded-full"
                      />
                      <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
                        SYSTEM ARCHITECTURE
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600">
                      DELIVERED {project.year}
                    </span>
                  </div>

                  <div className="my-6 space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-black/[0.04] shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                        THE CHALLENGE
                      </span>
                      <p className="text-xs text-neutral-700 mt-1 line-clamp-2">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-black/[0.04] shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#24419E] block">
                        THE DUROZEN SOLUTION
                      </span>
                      <p className="text-xs text-neutral-700 mt-1 line-clamp-2">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-600">
                      Verified Client Outcome
                    </span>
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121316] hover:text-[#DE2F28] transition-colors"
                      >
                        <span>Live Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121316] group-hover:text-[#DE2F28] transition-colors"
                      >
                        <span>Case Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              </HoverCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
