"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/common/MotionTransitions";

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-3xl bg-[#121316] text-white p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle colored ambient auras */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#24419E]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DE2F28]/20 rounded-full blur-3xl pointer-events-none" />

          {/* 4 subtle color dots indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DE2F28]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4A81E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#549B31]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#24419E]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-2">
              START A CONVERSATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Engineer Your Next{" "}
                <span className="font-editorial font-normal italic text-[1.16em] text-white px-1">
                  Intelligent
                </span>{" "}
                Breakthrough?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                Connect with our senior engineering architects today. We will evaluate your technical landscape, discuss feasibility, and propose an executable roadmap.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#DE2F28] text-white font-bold text-xs sm:text-sm tracking-tight shadow-lg hover:bg-[#c8241e] hover:shadow-xl transition-all duration-200"
              >
                <span>SCHEDULE DISCOVERY CALL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/10"
              >
                <span>View Delivered Work</span>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);
}
