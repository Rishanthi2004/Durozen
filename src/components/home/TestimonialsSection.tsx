"use client";

import React from "react";
import { Star } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";

export default function TestimonialsSection() {
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

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#24419E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                CLIENT PARTNERSHIPS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
              Endorsed by Technical{" "}
              <span className="font-editorial font-normal italic text-[1.15em] px-1">
                Leaders
              </span>{" "}
              Who Value Precision.
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <HoverCard
                accent={t.color}
                className="h-full bg-white rounded-3xl p-8 border border-black/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-[#F4A81E] gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#F4A81E] text-[#F4A81E]"
                        />
                      ))}
                    </div>
                    <span
                      style={{ color: t.color }}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F6]"
                    >
                      {t.metric}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/[0.05] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#121316]">
                      {t.author}
                    </h4>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
