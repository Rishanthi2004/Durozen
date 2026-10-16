"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Cpu, Compass, HeartHandshake, Lightbulb } from "lucide-react";

export default function HumanInnovationAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Ambient background glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#DE2F28]/12 via-[#F4A81E]/10 to-[#24419E]/12 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG Kinetic Human Innovation Network */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="humanCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DE2F28" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F4A81E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#24419E" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="humanRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DE2F28" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#24419E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#549B31" stopOpacity="0.5" />
          </linearGradient>

          <filter id="humanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit Concentric Wave 1 */}
        <motion.circle
          cx="230"
          cy="210"
          r="160"
          stroke="#E2E1DA"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          strokeOpacity="0.7"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "230px 210px" }}
        />

        {/* Outer Orbit Concentric Wave 2 */}
        <motion.circle
          cx="230"
          cy="210"
          r="125"
          stroke="url(#humanRingGrad)"
          strokeWidth="1.5"
          strokeDasharray="40 180"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, 440] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle Interactive Polygon Track */}
        <polygon
          points="230,85 340,150 340,270 230,335 120,270 120,150"
          stroke="#D5D4CC"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          strokeOpacity="0.5"
        />

        {/* Constellation Connection Rays */}
        <line x1="230" y1="210" x2="140" y2="120" stroke="#DE2F28" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="230" y1="210" x2="320" y2="110" stroke="#24419E" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="230" y1="210" x2="340" y2="300" stroke="#549B31" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="3 3" />
        <line x1="230" y1="210" x2="120" y2="290" stroke="#F4A81E" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="3 3" />

        {/* Pulse packet traveling to top-left */}
        <motion.circle
          r="3"
          fill="#DE2F28"
          animate={{
            cx: [230, 140, 230],
            cy: [210, 120, 210],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Pulse packet traveling to top-right */}
        <motion.circle
          r="3.5"
          fill="#24419E"
          animate={{
            cx: [230, 320, 230],
            cy: [210, 110, 210],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Pulse packet traveling to bottom-right */}
        <motion.circle
          r="3"
          fill="#549B31"
          animate={{
            cx: [230, 340, 230],
            cy: [210, 300, 210],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />

        {/* Pulse packet traveling to bottom-left */}
        <motion.circle
          r="3"
          fill="#F4A81E"
          animate={{
            cx: [230, 120, 230],
            cy: [210, 290, 210],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
        />
      </svg>

      {/* Central Pulsing "Human Innovation Core" Card */}
      <motion.div
        animate={{ y: [-4, 4, -4], scale: [0.99, 1.01, 0.99] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-auto"
      >
        <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DE2F28] via-[#F4A81E] to-[#24419E] p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#DE2F28]" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-[#121316] tracking-tight">
              Human-Led Innovation
            </div>
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#549B31]" />
              Creative Intelligence
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite Node 1: Empathy & Teamwork (Top-Left) */}
      <motion.div
        animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[14%] left-[10%] z-20 pointer-events-auto group"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-7 h-7 rounded-lg bg-[#DE2F28]/10 text-[#DE2F28] flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Team Synergy</div>
            <div className="text-[8px] text-neutral-500">Agile Collaboration</div>
          </div>
        </div>
      </motion.div>

      {/* Satellite Node 2: Cognitive Thought (Top-Right) */}
      <motion.div
        animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-[12%] right-[10%] z-20 pointer-events-auto group"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-7 h-7 rounded-lg bg-[#24419E]/10 text-[#24419E] flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Deep Thinking</div>
            <div className="text-[8px] text-neutral-500">First-Principles</div>
          </div>
        </div>
      </motion.div>

      {/* Satellite Node 3: Engineering Craft (Bottom-Right) */}
      <motion.div
        animate={{ y: [-5, 5, -5], x: [2, -2, 2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-[14%] right-[8%] z-20 pointer-events-auto group"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-7 h-7 rounded-lg bg-[#549B31]/10 text-[#549B31] flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Precision Craft</div>
            <div className="text-[8px] text-neutral-500">Deterministic Code</div>
          </div>
        </div>
      </motion.div>

      {/* Satellite Node 4: Lasting Impact (Bottom-Left) */}
      <motion.div
        animate={{ y: [5, -5, 5], x: [-2, 2, -2] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        className="absolute bottom-[16%] left-[8%] z-20 pointer-events-auto group"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-7 h-7 rounded-lg bg-[#F4A81E]/15 text-[#F4A81E] flex items-center justify-center">
            <HeartHandshake className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Trusted Partner</div>
            <div className="text-[8px] text-neutral-500">Enduring Value</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
