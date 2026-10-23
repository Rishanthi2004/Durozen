"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import {
  FadeIn,
  HoverCard,
  StaggerContainer,
  defaultItemVariants,
} from "@/components/common/MotionTransitions";

export default function FeaturedWork() {
  const featured = projectsData.filter((p) => p.featured);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>(".project-card");
    if (!cards.length) return;

    const scrollLeft = container.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>(".project-card");
    if (cards[index]) {
      const card = cards[index];
      const targetLeft = card.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                Real Systems Delivered for{" "}
                <span className="text-[#549B31] px-1">
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

        {/* Featured Projects Showcase: Horizontal swipe carousel on mobile with peek, vertical showcase on desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-smooth pb-4 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <StaggerContainer className="flex items-stretch lg:block gap-4 sm:gap-6 lg:gap-0 lg:space-y-10 min-w-full w-max lg:w-full">
            {featured.map((project) => (
              <HoverCard
                key={project.id}
                variants={defaultItemVariants}
                accent={project.accentColor}
                className="project-card w-[86vw] min-w-[280px] max-w-[360px] sm:max-w-[440px] lg:w-full lg:max-w-none shrink-0 snap-start lg:snap-align-none h-full bg-white rounded-3xl p-5 sm:p-8 lg:p-12 border border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.07)] relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Subtle accent corner highlight */}
                <div
                  style={{ backgroundColor: project.accentColor }}
                  className="absolute top-0 right-0 w-32 h-1.5 opacity-80"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left: Project Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] px-2.5 sm:px-3 py-1 rounded-full bg-[#FAF9F6] border border-black/[0.06] text-neutral-700">
                          {project.sector}
                        </span>
                        <span className="text-xs text-neutral-600 font-semibold">
                          • {project.client}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight leading-tight group-hover:text-neutral-900 transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                        {project.summary}
                      </p>
                    </div>

                    {/* Impact Metrics Row */}
                    <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-black/[0.06] grid grid-cols-3 gap-2 sm:gap-4">
                      {project.impactMetrics.map((m, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-lg sm:text-2xl font-extrabold text-[#121316] tracking-tight">
                              {m.value}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-neutral-600 mt-0.5 font-medium leading-tight">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Tags */}
                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
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

                  {/* Right: Architectural Specification Column */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-0 lg:min-h-[260px] pt-4 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-black/[0.06]">
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ backgroundColor: project.accentColor }}
                          className="w-2.5 h-2.5 rounded-full"
                        />
                        <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
                          System Architecture
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-600">
                        DELIVERED {project.year}
                      </span>
                    </div>

                    <div className="my-4 sm:my-6 space-y-3 sm:space-y-4">
                      <div className="border-l-2 border-neutral-300 pl-3.5 py-0.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                          The Challenge
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>

                      <div className="border-l-2 border-[#24419E] pl-3.5 py-0.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#24419E] block">
                          The Durozen Solution
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-black/[0.06] flex items-center justify-between">
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
            ))}
            {/* Trailing spacer to preserve right padding on mobile */}
            <div className="shrink-0 w-1 lg:hidden" aria-hidden="true" />
          </StaggerContainer>
        </div>

        {/* Mobile pagination indicator dots */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-6" aria-hidden="true">
          {featured.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              style={{
                backgroundColor: activeIndex === idx ? project.accentColor : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
