"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Layout, ArrowUpRight, TrendingUp, MousePointer2 } from "lucide-react";

export default function DigitalProductAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#DE2F28]/10 via-[#F4A81E]/10 to-[#24419E]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG Connecting Interface Tracks */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="productDataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DE2F28" />
            <stop offset="50%" stopColor="#F4A81E" />
            <stop offset="100%" stopColor="#24419E" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved Ribbon connecting Web & Mobile */}
        <path
          d="M 120 180 C 180 120, 260 280, 340 220"
          stroke="url(#productDataFlow)"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Orbiting data packet */}
        <motion.circle
          r="4"
          fill="#DE2F28"
          animate={{
            cx: [120, 180, 260, 340, 260, 180, 120],
            cy: [180, 140, 270, 220, 270, 140, 180],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* CARD 1: Miniature Web Dashboard Panel (Floating Center-Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: [-6, 6, -6] }}
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-[16%] left-[6%] z-20 pointer-events-auto"
      >
        <div className="w-[240px] sm:w-[260px] rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_16px_36px_rgba(0,0,0,0.06)] p-3.5 overflow-hidden">
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-black/[0.05]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
              <span className="w-2 h-2 rounded-full bg-[#F4A81E]" />
              <span className="w-2 h-2 rounded-full bg-[#549B31]" />
              <span className="text-xs font-mono text-neutral-500 ml-1">app.durozen.io</span>
            </div>
            <Layout className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          {/* Mini Sparkline Chart Mockup */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#121316]">Active Deployments</span>
              <span className="text-xs font-bold text-[#549B31] flex items-center">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> +28.4%
              </span>
            </div>
            {/* Visual Bars */}
            <div className="flex items-end gap-1.5 h-9 pt-1">
              {[40, 65, 50, 85, 70, 95, 80, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-sm ${
                    i === 7 ? "bg-[#DE2F28]" : i >= 5 ? "bg-[#24419E]" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CARD 2: Miniature Mobile Device Card (Floating Right) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: [6, -6, 6] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 },
          y: { duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute top-[28%] right-[8%] z-30 pointer-events-auto"
      >
        <div className="w-[170px] sm:w-[190px] rounded-3xl bg-white/95 backdrop-blur-md border border-black/[0.09] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-3 overflow-hidden">
          {/* Mobile Speaker & Camera Notch */}
          <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-2" />

          {/* Mobile UI Screen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#121316]">Fintech Portal</span>
              <Smartphone className="w-3.5 h-3.5 text-[#24419E]" />
            </div>

            <div className="p-2 rounded-xl bg-[#24419E]/8 border border-[#24419E]/10">
              <div className="text-xs text-neutral-500 uppercase font-semibold">Total Volume</div>
              <div className="text-xs font-bold text-[#24419E]">$4.8M USD</div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-600 font-medium px-1">
              <span>SLA Target</span>
              <span className="font-bold text-[#549B31]">99.98%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CARD 3: Production Release Pill (Bottom Center) */}
      <motion.div
        animate={{ y: [-4, 4, -4], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[14%] left-[16%] z-40 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121316] text-white shadow-lg text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#549B31]" />
          <span>Product Shipped to App Store & Web</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-300" />
        </div>
      </motion.div>

      {/* Floating Animated Cursor Indicator */}
      <motion.div
        animate={{
          x: [180, 240, 200, 180],
          y: [240, 190, 260, 240],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-50 pointer-events-none drop-shadow-md text-[#DE2F28]"
      >
        <MousePointer2 className="w-4 h-4 fill-current" />
      </motion.div>
    </div>
  );
}
