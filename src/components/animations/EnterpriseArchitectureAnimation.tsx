"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Server, ShieldCheck, Database, ArrowUpRight, Activity } from "lucide-react";

export default function EnterpriseArchitectureAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Background ambient lighting aura matching Durozen Blue & Red */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#24419E]/14 via-white/5 to-[#DE2F28]/14 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG 3D Isometric Rotating Architecture Rings & Node Mesh */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="entRingBlueRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#24419E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#24419E" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#DE2F28" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="entRingAccent" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DE2F28" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#F4A81E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#24419E" stopOpacity="0.75" />
          </linearGradient>

          <radialGradient id="entCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#24419E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#24419E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center ambient radial orb */}
        <circle cx="230" cy="210" r="90" fill="url(#entCenterGlow)" />

        {/* Primary Isometric Outer Ring */}
        <motion.ellipse
          cx="230"
          cy="210"
          rx="170"
          ry="75"
          stroke="url(#entRingBlueRed)"
          strokeWidth="2"
          strokeDasharray="18 12"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "230px 210px" }}
        />

        {/* Counter-Rotating Secondary Isometric Ring */}
        <motion.ellipse
          cx="230"
          cy="210"
          rx="135"
          ry="60"
          stroke="url(#entRingAccent)"
          strokeWidth="1.5"
          strokeDasharray="12 18"
          strokeLinecap="round"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "230px 210px" }}
        />

        {/* Inner Geometric Core Lattice */}
        <motion.ellipse
          cx="230"
          cy="210"
          rx="90"
          ry="40"
          stroke="#C8C7BD"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeOpacity="0.6"
        />

        {/* Interconnected Vertical Data Trusses */}
        <line x1="120" y1="130" x2="230" y2="210" stroke="#24419E" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
        <line x1="340" y1="130" x2="230" y2="210" stroke="#DE2F28" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
        <line x1="230" y1="210" x2="230" y2="330" stroke="#549B31" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />

        {/* Orbiting Satellite Data Particles */}
        <motion.circle
          r="4"
          fill="#24419E"
          animate={{
            cx: [80, 230, 380, 230, 80],
            cy: [210, 140, 210, 280, 210],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="4"
          fill="#DE2F28"
          animate={{
            cx: [380, 230, 80, 230, 380],
            cy: [210, 275, 210, 145, 210],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Central Enterprise Core Hub */}
      <motion.div
        animate={{ scale: [0.98, 1.02, 0.98], y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
      >
        <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_16px_36px_rgba(36,65,158,0.08)] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#24419E] text-white flex items-center justify-center shadow-md">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-[#121316]">
              Enterprise Mesh Core
            </div>
            <div className="text-[9px] font-semibold text-[#24419E] uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DE2F28] animate-ping" />
              Active-Active Architecture
            </div>
          </div>
        </div>
      </motion.div>

      {/* Node 1: Distributed Cloud Nodes (Top Left) */}
      <motion.div
        animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[8%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-[#24419E]/10 text-[#24419E] flex items-center justify-center">
            <Server className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Multi-Region</div>
            <div className="text-[8px] text-neutral-500">Global Failover</div>
          </div>
        </div>
      </motion.div>

      {/* Node 2: Zero-Trust Security Perimeter (Top Right) */}
      <motion.div
        animate={{ y: [5, -5, 5], x: [2, -2, 2] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute top-[12%] right-[8%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-[#DE2F28]/10 text-[#DE2F28] flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-[#121316]">Zero-Trust IAM</div>
            <div className="text-[8px] text-neutral-500">Sovereign Boundary</div>
          </div>
        </div>
      </motion.div>

      {/* Node 3: Event-Driven Pipeline (Bottom) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <Database className="w-3.5 h-3.5 text-[#549B31]" />
          <span className="text-[10px] font-bold text-[#121316]">Scalable Event Fabric</span>
          <span className="text-[9px] font-mono text-neutral-400">1.4M ev/s</span>
        </div>
      </motion.div>
    </div>
  );
}
