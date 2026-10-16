"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Cpu, CheckCircle2, GitBranch, Terminal, Shield, Zap } from "lucide-react";

export default function SoftwareEngineeringAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#549B31]/12 via-[#24419E]/10 to-[#F4A81E]/12 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Circuit assembly tracks */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#549B31" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#24419E" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#DE2F28" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Bus Lines connecting modules */}
        <path
          d="M 120 130 L 230 190 L 230 260 L 340 310"
          stroke="#DEDDCE"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.7"
        />
        <path
          d="M 340 130 L 230 190 L 230 260 L 120 310"
          stroke="#DEDDCE"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.7"
        />

        {/* Dynamic Pulse along vertical backbone */}
        <motion.line
          x1="230"
          y1="80"
          x2="230"
          y2="340"
          stroke="url(#circuitGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="25 150"
          animate={{ strokeDashoffset: [200, -200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Circuit Bus Pads */}
        <circle cx="230" cy="190" r="5" fill="#24419E" opacity="0.8" />
        <circle cx="230" cy="260" r="5" fill="#549B31" opacity="0.8" />
        <circle cx="120" cy="130" r="4" fill="#DE2F28" opacity="0.6" />
        <circle cx="340" cy="130" r="4" fill="#F4A81E" opacity="0.6" />
      </svg>

      {/* LAYER 1 (Top Assembled Card): UI Component Engine */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
      >
        <div className="w-[260px] sm:w-[280px] p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_12px_28px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.05]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
              <span className="w-2 h-2 rounded-full bg-[#F4A81E]" />
              <span className="w-2 h-2 rounded-full bg-[#549B31]" />
              <span className="text-[10px] font-mono text-neutral-500 ml-1.5 font-medium">UI.Component.tsx</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#549B31]/10 text-[#549B31]">
              Ready
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#121316]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#24419E]" />
              <span>Modular Design System</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">v4.2</span>
          </div>
        </div>
      </motion.div>

      {/* LAYER 2 (Core Processing Node): Microservice Architecture */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
      >
        <div className="w-[280px] sm:w-[310px] p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_14px_32px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#549B31]/12 text-[#549B31] flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-[#121316]">API & Microservices</div>
              <div className="text-[9px] text-neutral-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#549B31]" />
                Zero-Downtime CI/CD Pipeline
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold text-[#24419E] bg-[#24419E]/8 px-2 py-1 rounded-md">
              99.99%
            </span>
          </div>
        </div>
      </motion.div>

      {/* LAYER 3 (Bottom Infrastructure Stack): Cloud Runtime */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
      >
        <div className="w-[260px] sm:w-[280px] p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-[0_10px_24px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-[#F4A81E]" />
            <div>
              <div className="text-[10px] font-bold text-[#121316]">Cloud Distributed Core</div>
              <div className="text-[8px] text-neutral-500">Autonomous Edge Routing</div>
            </div>
          </div>
          <Zap className="w-3.5 h-3.5 text-[#F4A81E]" />
        </div>
      </motion.div>

      {/* Floating Micro-Badge 1: Git Branch (Left) */}
      <motion.div
        animate={{ x: [-4, 4, -4], y: [-6, 6, -6] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[28%] left-[2%] z-40 pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 border border-black/[0.07] shadow-sm text-[9px] font-mono font-semibold text-[#121316]">
          <GitBranch className="w-3 h-3 text-[#549B31]" />
          <span>main:prod</span>
        </div>
      </motion.div>

      {/* Floating Micro-Badge 2: Security Sentinel (Right) */}
      <motion.div
        animate={{ x: [4, -4, 4], y: [6, -6, 6] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[32%] right-[2%] z-40 pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 border border-black/[0.07] shadow-sm text-[9px] font-mono font-semibold text-[#121316]">
          <Shield className="w-3 h-3 text-[#24419E]" />
          <span>mTLS • SOC2</span>
        </div>
      </motion.div>
    </div>
  );
}
