"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Sparkles } from "lucide-react";

export default function ConnectedNetworkAnimation() {
  const shouldReduceMotion = useReducedMotion();

  // Lightweight mouse tilt effect on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[260px] sm:max-w-[320px] lg:max-w-[420px] mx-auto flex items-center justify-center select-none"
    >
      {/* 1. Ambient Warm Off-White / Soft Ash Depth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-tr from-[#EBEAE3]/70 via-[#F5F4EE]/50 to-[#DFDED5]/60 rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* 2. Floating Translucent Glass Portal Arch */}
      <div className="relative w-full h-full rounded-full p-3 sm:p-5 lg:p-7 bg-gradient-to-br from-white/70 via-white/30 to-white/10 backdrop-blur-md border border-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center">
        {/* Subtle Silver Bevel Ring */}
        <div className="absolute inset-1.5 sm:inset-2.5 rounded-full border border-[#D5D4CC]/45 pointer-events-none" />

        {/* 3. SVG Concentric Rings, Connection Arcs & Light Trails */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Center radial depth gradient */}
            <radialGradient id="portalCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DFDED7" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#EDECE6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0" />
            </radialGradient>

            {/* Fine Light Trail Gradient matching Durozen Accents */}
            <linearGradient id="portalTrailGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#24419E" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#DE2F28" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F4A81E" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="portalTrailGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#549B31" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#24419E" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Core Ambient Depth Disc */}
          <circle cx="200" cy="200" r="145" fill="url(#portalCoreGlow)" />

          {/* Ring 1 (Outer Guide Track): R = 160px */}
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#E0DFD6"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.8"
          />

          {/* Ring 2 (Portal Threshold Track): R = 125px */}
          <circle
            cx="200"
            cy="200"
            r="125"
            stroke="#D3D2CA"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Ring 3 (Inner Orbit Track): R = 90px */}
          <circle
            cx="200"
            cy="200"
            r="90"
            stroke="#DCDAD2"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeOpacity="0.85"
          />

          {/* Ring 4 (Core Ring): R = 54px */}
          <circle
            cx="200"
            cy="200"
            r="54"
            stroke="#CBCAC1"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* Smooth Curved Connection Lines between Nodes */}
          {/* Connection Arc 1: Location to Center Core */}
          <path
            d="M 75 200 C 120 160, 160 180, 200 200"
            stroke="#D5D4CC"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            strokeOpacity="0.65"
          />

          {/* Connection Arc 2: Center Core to Email Hub */}
          <path
            d="M 200 200 C 240 220, 280 160, 312 112"
            stroke="#D5D4CC"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            strokeOpacity="0.65"
          />

          {/* Connection Arc 3: Center Core to Messaging Node */}
          <path
            d="M 200 200 C 210 250, 250 280, 288 288"
            stroke="#D5D4CC"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            strokeOpacity="0.65"
          />

          {/* Fine Dynamic Light Stream 1 */}
          <motion.path
            d="M 75 200 C 120 160, 160 180, 200 200 C 240 220, 280 160, 312 112"
            stroke="url(#portalTrailGrad1)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="24 140"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    strokeDashoffset: [164, -164],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Fine Dynamic Light Stream 2 */}
          <motion.path
            d="M 200 200 C 210 250, 250 280, 288 288"
            stroke="url(#portalTrailGrad2)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="18 90"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    strokeDashoffset: [-108, 108],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.8,
            }}
          />

          {/* Subtle Precision Crosshair Markers */}
          <line x1="200" y1="32" x2="200" y2="40" stroke="#C8C7BE" strokeWidth="1" />
          <line x1="200" y1="360" x2="200" y2="368" stroke="#C8C7BE" strokeWidth="1" />
          <line x1="32" y1="200" x2="40" y2="200" stroke="#C8C7BE" strokeWidth="1" />
          <line x1="360" y1="200" x2="368" y2="200" stroke="#C8C7BE" strokeWidth="1" />

          {/* Central Portal Core Disc */}
          <circle cx="200" cy="200" r="18" fill="#FAF9F6" stroke="#D5D4CC" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="4" fill="#121316" />
        </svg>

        {/* 4. Orbiting Rings with Contact Symbols & Tiny Durozen Accents */}

        {/* Orbit Layer 1 (Outer Ring, R=160px): Rotates slowly clockwise (55s) */}
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
          }}
          className="pointer-events-none"
        >
          {/* Symbol 1: Location Badge (Namakkal HQ / Geo Connection) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "0%",
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-auto"
          >
            {/* Counter-rotate to stay upright */}
            <motion.div
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="relative group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-sm border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-700 transition-transform hover:scale-110">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE2F28]" />
              </div>
              {/* Micro Durozen Red Accent Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#DE2F28] ring-2 ring-white" />
            </motion.div>
          </div>

          {/* Tiny Ash-Grey Satellite Node */}
          <div
            style={{
              position: "absolute",
              top: "85%",
              left: "80%",
              transform: "translate(-50%, -50%)",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#A8A79E]"
          />
        </motion.div>

        {/* Orbit Layer 2 (Middle Ring, R=125px): Rotates counter-clockwise (42s) */}
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "18.75%",
            left: "18.75%",
            width: "62.5%",
            height: "62.5%",
            borderRadius: "50%",
          }}
          className="pointer-events-none"
        >
          {/* Symbol 2: Email Badge */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "85%",
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="relative group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-sm border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-700 transition-transform hover:scale-110">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#24419E]" />
              </div>
              {/* Micro Durozen Royal Blue Accent Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#24419E] ring-2 ring-white" />
            </motion.div>
          </div>

          {/* Tiny Durozen Warm Yellow Accent Dot */}
          <div
            style={{
              position: "absolute",
              top: "85%",
              left: "20%",
              transform: "translate(-50%, -50%)",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#F4A81E] ring-1 ring-white/50"
          />
        </motion.div>

        {/* Orbit Layer 3 (Inner Ring, R=90px): Rotates clockwise (30s) */}
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "27.5%",
            left: "27.5%",
            width: "45%",
            height: "45%",
            borderRadius: "50%",
          }}
          className="pointer-events-none"
        >
          {/* Symbol 3: Communication / Message Hub */}
          <div
            style={{
              position: "absolute",
              top: "85%",
              left: "80%",
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-auto"
          >
            <motion.div
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="relative group"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 backdrop-blur-sm border border-black/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center justify-center text-neutral-700 transition-transform hover:scale-110">
                <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#549B31]" />
              </div>
              {/* Micro Durozen Green Accent Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#549B31] ring-2 ring-white" />
            </motion.div>
          </div>

          {/* Tiny Charcoal Accent Dot */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              transform: "translate(-50%, -50%)",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#121316]"
          />
        </motion.div>

        {/* Orbit Layer 4 (Core Ring, R=54px): Rotates counter-clockwise (20s) */}
        <motion.div
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "36.5%",
            left: "36.5%",
            width: "27%",
            height: "27%",
            borderRadius: "50%",
          }}
          className="pointer-events-none"
        >
          {/* Micro Sparkle Node */}
          <div
            style={{
              position: "absolute",
              top: "0%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Sparkles className="w-2.5 h-2.5 text-[#F4A81E] opacity-80" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
