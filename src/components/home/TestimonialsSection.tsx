"use client";

import React, { useRef, useState } from "react";
import { Star } from "lucide-react";
import { FadeIn, StaggerContainer, HoverCard, defaultItemVariants } from "@/components/common/MotionTransitions";

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Durozen engineered our autonomous freight intelligence engine in under 12 weeks. Their architectural maturity, code craftsmanship, and proactive communication set a new benchmark for software partners.",
      author: "Marcus Vance",
      role: "VP of Engineering",
      company: "Aura Logistics Group",
      metric: "85% data entry reduction",
      color: "#DE2F28",
    },
    {
      quote:
        "Migrating our core financial transaction mesh to multi-region Kubernetes with zero customer downtime seemed impossible. Durozen planned and executed the entire migration flawlessly.",
      author: "Priya Sundaram",
      role: "Chief Technology Officer",
      company: "Apex Financial Partners",
      metric: "99.999% uptime SLA",
      color: "#549B31",
    },
    {
      quote:
        "The difference with Durozen is they think like engineering leaders, not ticket-takers. They challenged our assumptions, simplified our data pipelines, and shipped a phenomenal product.",
      author: "David Chen",
      role: "Founder & CEO",
      company: "Lumina Digital Commerce",
      metric: "38% mobile conversion gain",
      color: "#24419E",
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>(".review-card");
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
    const cards = container.querySelectorAll<HTMLElement>(".review-card");
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
    <section className="py-24 sm:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
              Endorsed by Technical{" "}
              <span className="text-[#24419E] px-1">
                Leaders
              </span>{" "}
              Who Value Precision.
            </h2>
          </div>
        </FadeIn>

        {/* Horizontal scroll on mobile with peek, standard 3-column grid on desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <StaggerContainer className="flex items-stretch md:grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 min-w-full w-max md:w-full">
            {testimonials.map((t) => (
              <HoverCard
                key={t.author}
                variants={defaultItemVariants}
                accent={t.color}
                className="review-card w-[84vw] min-w-[280px] max-w-[340px] md:w-auto md:max-w-none shrink-0 snap-start md:snap-align-none h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
              >
                <div className="flex-1 flex flex-col justify-start">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-[#F4A81E] gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#F4A81E] text-[#F4A81E]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF9F6] text-neutral-700 border border-black/[0.04]">
                      {t.metric}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/[0.05] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#121316]">
                      {t.author}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {t.role} • {t.company}
                    </p>
                  </div>
                  <div
                    style={{ backgroundColor: t.color }}
                    className="w-2 h-2 rounded-full"
                  />
                </div>
              </HoverCard>
            ))}
            {/* Trailing spacer to preserve right padding on mobile */}
            <div className="shrink-0 w-1 md:hidden" aria-hidden="true" />
          </StaggerContainer>
        </div>

        {/* Mobile pagination indicator dots */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6" aria-hidden="true">
          {testimonials.map((t, idx) => (
            <button
              key={t.author}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-[#24419E]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
