"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import CurvedPathway from "./CurvedPathway";

export default function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 overflow-hidden isolate">
      {/* Lightly Blurred Durozen Headquarters Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/home-bg.png"
          alt="Durozen Headquarters Building"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_80%] filter blur-[2px] scale-[1.02] opacity-75 -translate-y-12"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-[#FAF9F6]/35 to-[#FAF9F6]" />
      </div>

      {/* Semicircular Orbit anchored to the far right edge of the visible webpage */}
      <CurvedPathway />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[440px] sm:min-h-[500px]">
          {/* Left Column: Hero Editorial Content */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start z-20 pointer-events-auto">

            {/* 2. Main Headline with DM Sans + Cormorant Garamond Editorial Combination */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold text-[#121316] tracking-tight leading-[1.1] sm:leading-[1.08] text-left"
            >
              Engineering{" "}
              <span className="font-editorial font-normal italic text-[1.12em] text-[#121316] inline-block tracking-normal px-1">
                Intelligent
              </span>
              <br />
              Digital Experiences.
            </motion.h1>

            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl text-left font-normal"
            >
              Your Trusted Digital Transformation Partner. We build intelligent software, scalable applications, and cloud-powered solutions that help businesses move forward.
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary Contact Us Button */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-[#DE2F28] text-white font-semibold text-sm sm:text-base tracking-tight shadow-[0_8px_20px_rgba(222,47,40,0.25)] hover:bg-[#c9241e] hover:shadow-[0_12px_28px_rgba(222,47,40,0.35)] transition-all duration-200 active:scale-95"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Text Link */}
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#121316] hover:text-[#24419E] transition-colors py-2"
              >
                <span className="border-b border-black/20 group-hover:border-[#24419E] transition-colors">
                  Explore Our Services
                </span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Spacing placeholder for grid balance */}
          <div className="lg:col-span-5 xl:col-span-5 min-h-[340px] sm:min-h-[440px] lg:min-h-[460px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
