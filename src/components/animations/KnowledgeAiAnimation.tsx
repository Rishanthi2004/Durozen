"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, FileText } from "lucide-react";

export default function KnowledgeAiAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] mx-auto flex items-center justify-center select-none pointer-events-auto scale-90 sm:scale-100 origin-center">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#24419E]/14 via-[#DE2F28]/10 to-[#F4A81E]/12 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG Neural Knowledge Lattice */}
      <svg
        viewBox="0 0 460 420"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aiStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#24419E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#DE2F28" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F4A81E" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Neural Synapse Lines */}
        <path
          d="M 120 120 Q 230 180 340 120"
          stroke="#DEDCCF"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.7"
          fill="none"
        />
        <path
          d="M 120 300 Q 230 240 340 300"
          stroke="#DEDCCF"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.7"
          fill="none"
        />
        <line x1="230" y1="100" x2="230" y2="320" stroke="#DEDCCF" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.5" />

        {/* Data Stream traveling through Synaptic path */}
        <motion.path
          d="M 120 120 Q 230 180 340 120"
          stroke="url(#aiStreamGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="30 120"
          fill="none"
          animate={{ strokeDashoffset: [150, -150] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Neural Hubs */}
        <circle cx="230" cy="210" r="40" stroke="#24419E" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
      </svg>

      {/* CARD 1: Semantic Document / Paper Card (Top Center) */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
      >
        <div className="w-[240px] sm:w-[260px] p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_12px_28px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.05]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#24419E]">
              <Brain className="w-3.5 h-3.5" />
              <span>Agentic AI Research</span>
            </div>
            <span className="text-[8px] font-mono text-neutral-400">PDF • 12 min</span>
          </div>
          <div className="text-[11px] font-bold text-[#121316] leading-snug">
            Deterministic RAG Architectures & Sovereign LLM Pipelines
          </div>
          {/* Abstract Text Bars */}
          <div className="mt-2.5 space-y-1">
            <div className="h-1 bg-neutral-200 rounded-full w-full" />
            <div className="h-1 bg-neutral-200 rounded-full w-4/5" />
          </div>
        </div>
      </motion.div>

      {/* CARD 2: Central AI Reasoning Node */}
      <motion.div
        animate={{ y: [4, -4, 4], scale: [0.99, 1.01, 0.99] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-[48%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
      >
        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_16px_36px_rgba(0,0,0,0.08)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#24419E] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-[#F4A81E]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#121316]">Cognitive Intelligence Engine</div>
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#549B31]" />
              Verified Knowledge Stream
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Micro-Card 1: Cloud Native Pattern (Bottom Left) */}
      <motion.div
        animate={{ y: [-4, 4, -4], x: [-2, 2, -2] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[10%] left-[8%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <FileText className="w-3.5 h-3.5 text-[#DE2F28]" />
          <div className="text-left">
            <div className="text-[9px] font-bold text-[#121316]">Event Streaming</div>
            <div className="text-[8px] text-neutral-500">P99 Benchmarks</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Micro-Card 2: Mathematical / Logic Token (Bottom Right) */}
      <motion.div
        animate={{ y: [4, -4, 4], x: [2, -2, 2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[12%] right-[8%] z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.07] shadow-sm">
          <span className="text-[12px] font-serif italic font-bold text-[#24419E]">∑</span>
          <div className="text-left">
            <div className="text-[9px] font-bold text-[#121316]">Algorithmic Core</div>
            <div className="text-[8px] text-neutral-500">Self-Correcting Loops</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
