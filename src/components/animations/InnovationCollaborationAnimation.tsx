"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users2, Rocket, Award, Heart, Sparkles, TrendingUp } from "lucide-react";

export default function InnovationCollaborationAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#F4A81E]/14 via-[#549B31]/10 to-[#24419E]/14 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG Growth Spiral & Collaborative Network Track */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="careerGrowthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4A81E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#549B31" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#24419E" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Career Growth Ascending Trajectory */}
        <path
          d="M 100 320 C 180 320, 160 180, 230 180 C 300 180, 280 90, 360 80"
          stroke="url(#careerGrowthGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
        />

        {/* Orbiting Career Ascension Particle */}
        <motion.circle
          r="4.5"
          fill="#F4A81E"
          animate={{
            cx: [100, 180, 230, 300, 360],
            cy: [320, 240, 180, 130, 80],
            opacity: [0.3, 1, 1, 1, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connecting Support Struts */}
        <line x1="120" y1="210" x2="230" y2="210" stroke="#E2E0D5" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="230" y1="210" x2="340" y2="210" stroke="#E2E0D5" strokeWidth="1" strokeDasharray="3 3" />
      </svg>

      {/* CENTER NODE: Culture of Craft & Ownership */}
      <motion.div
        animate={{ scale: [0.98, 1.02, 0.98], y: [-3, 3, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
      >
        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F4A81E] text-white flex items-center justify-center shadow-md">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#121316]">Engineering Guild</div>
            <div className="text-xs font-semibold text-[#F4A81E] uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#549B31]" />
              Autonomy & Impact
            </div>
          </div>
        </div>
      </motion.div>

      {/* NODE 1: Mentorship & High Bar (Top Right) */}
      <motion.div
        animate={{ y: [-5, 5, -5], x: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-[14%] right-[6%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-[#24419E]/10 text-[#24419E] flex items-center justify-center">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Senior Mentorship</div>
            <div className="text-[8px] text-neutral-500">Accelerated Growth</div>
          </div>
        </div>
      </motion.div>

      {/* NODE 2: People First / Well-being (Bottom Left) */}
      <motion.div
        animate={{ y: [5, -5, 5], x: [-2, 2, -2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute bottom-[14%] left-[6%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-[#DE2F28]/10 text-[#DE2F28] flex items-center justify-center">
            <Heart className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Human Balance</div>
            <div className="text-[8px] text-neutral-500">Supportive Culture</div>
          </div>
        </div>
      </motion.div>

      {/* NODE 3: Continuous Upskilling (Top Left) */}
      <motion.div
        animate={{ y: [-4, 4, -4], x: [-1, 1, -1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[18%] left-[8%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm text-[9px] font-semibold text-[#121316]">
          <TrendingUp className="w-3 h-3 text-[#549B31]" />
          <span>Annual Learning Stipend</span>
        </div>
      </motion.div>
    </div>
  );
}
