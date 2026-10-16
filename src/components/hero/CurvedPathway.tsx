"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import {
  Cloud,
  Code2,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Sigma,
  X,
} from "lucide-react";
import MetricBlock from "./MetricBlock";

interface OrbitNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  angleDeg: number;
  metric: string;
  subtext: string;
}

function getCoordPercent(deg: number) {
  const rad = (deg * Math.PI) / 180;
  // Round to 1 decimal place to guarantee identical SSR and client strings
  const left = Math.round((0.5 + 0.5 * Math.cos(rad)) * 1000) / 10;
  const top = Math.round((0.5 + 0.5 * Math.sin(rad)) * 1000) / 10;
  return { left: `${left}%`, top: `${top}%` };
}

export default function CurvedPathway() {
  const [pinnedNode, setPinnedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeNode = pinnedNode || hoveredNode;

  // Continuous rotation motion values that keep DOM hit-test matrices 100% updated at every angle
  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (r) => -r);

  // 360 degrees in 48 seconds = 0.0075 deg/ms. Pauses instantly when activeNode is set!
  useAnimationFrame((time, delta) => {
    if (!activeNode) {
      rotation.set((rotation.get() + delta * 0.0075) % 360);
    }
  });

  // Dismiss on touch outside or click outside
  useEffect(() => {
    if (!pinnedNode) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-orbit-node]")) {
        setPinnedNode(null);
        setHoveredNode(null);
      }
    };

    document.addEventListener("click", handleOutsideInteraction);
    document.addEventListener("touchend", handleOutsideInteraction);

    return () => {
      document.removeEventListener("click", handleOutsideInteraction);
      document.removeEventListener("touchend", handleOutsideInteraction);
    };
  }, [pinnedNode]);

  const handleToggle = (id: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    setPinnedNode((prev) => (prev === id ? null : id));
  };

  // 6 Technology Nodes distributed along the circular pathway
  const orbitNodes: OrbitNode[] = [
    {
      id: "teams-comm",
      name: "Microsoft Teams & Chat",
      category: "Enterprise Comms",
      icon: <MessageSquare className="w-4 h-4 text-white" />,
      color: "#464EB8",
      angleDeg: 0,
      metric: "Autonomous Dispatch",
      subtext: "Reads, writes, and syncs across TMS & chat",
    },
    {
      id: "ai-core",
      name: "AI & Neural Systems",
      category: "Cognitive Intelligence",
      icon: <Sparkles className="w-4 h-4 text-white" />,
      color: "#24419E",
      angleDeg: 60,
      metric: "99.4% Inference Accuracy",
      subtext: "Autonomous LLM reasoning & decision engines",
    },
    {
      id: "cloud-mesh",
      name: "Cloud Mesh & Kubernetes",
      category: "Distributed Infra",
      icon: <Cloud className="w-4 h-4 text-white" />,
      color: "#549B31",
      angleDeg: 120,
      metric: "99.99% Uptime SLA",
      subtext: "Multi-region failover & zero-downtime releases",
    },
    {
      id: "sigma-engine",
      name: "Sigma Workflow Pipeline",
      category: "Operational Matrix",
      icon: <Sigma className="w-4 h-4 text-white stroke-[2.5]" />,
      color: "#1E293B",
      angleDeg: 180,
      metric: "10x Operational Multiplier",
      subtext: "Continuous event aggregation & routing",
    },
    {
      id: "modern-stack",
      name: "Full-Stack Reactive Core",
      category: "Full-Stack Velocity",
      icon: <Code2 className="w-4 h-4 text-white" />,
      color: "#F4A81E",
      angleDeg: 240,
      metric: "Sub-40ms P99 Latency",
      subtext: "Next.js, TypeScript & high-throughput APIs",
    },
    {
      id: "security-shield",
      name: "Zero-Trust Sentinel",
      category: "Data Sovereignty",
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      color: "#DE2F28",
      angleDeg: 300,
      metric: "SOC2 & ISO Compliant",
      subtext: "Private VPC boundaries & automated audits",
    },
  ];

  // Minor decorative glowing satellite spheres along the orbit
  const microSatellites = [
    { angleDeg: 30, color: "#24419E", size: 7 },
    { angleDeg: 90, color: "#549B31", size: 7 },
    { angleDeg: 210, color: "#F4A81E", size: 7 },
    { angleDeg: 270, color: "#DE2F28", size: 7 },
  ];

  const orbitRadius = 255;
  const centerX = 300;
  const centerY = 300;

  return (
    <div className="orbit-container absolute right-0 top-[72%] sm:top-[68%] lg:top-1/2 -translate-y-1/2 translate-x-1/3 sm:translate-x-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[640px] xl:h-[640px] z-30 pointer-events-auto select-none">
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#DE2F28]/10 via-[#F4A81E]/10 to-[#24419E]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* SVG Canvas: 3D Curved Pathway Body with Rich Realistic Shadows & Bevels */}
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full overflow-visible pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Track Surface Gradient - Light elegant 3D shaded surface */}
          <linearGradient
            id="orbit3DTrackSurface"
            x1="100"
            y1="80"
            x2="500"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#EDECE7" />
            <stop offset="25%" stopColor="#E2E1DA" />
            <stop offset="50%" stopColor="#DFDED8" />
            <stop offset="75%" stopColor="#D5D4CC" />
            <stop offset="100%" stopColor="#EAE9E3" />
          </linearGradient>

          {/* Highlight ridge gradient for tactile bevel */}
          <linearGradient
            id="orbit3DHighlight"
            x1="80"
            y1="80"
            x2="520"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
          </linearGradient>

          {/* Flowing multi-color Durozen data stream */}
          <linearGradient
            id="orbit3DBrandStream"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#DE2F28" stopOpacity="0.75" />
            <stop offset="33%" stopColor="#F4A81E" stopOpacity="0.75" />
            <stop offset="66%" stopColor="#549B31" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#24419E" stopOpacity="0.75" />
          </linearGradient>

          {/* Deep realistic drop shadow filter */}
          <filter
            id="orbit3DShadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
            <feOffset dx="-8" dy="16" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.14" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Base Ambient Track Shadow Layer */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          stroke="#000000"
          strokeWidth="58"
          strokeOpacity="0.05"
          filter="url(#orbit3DShadow)"
        />

        {/* 2. Main 3D Thick Curved Circular Pathway Body */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          stroke="url(#orbit3DTrackSurface)"
          strokeWidth="48"
        />

        {/* 3. Outer & Inner Guiderail Lines */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius + 23}
          stroke="#C8C7BE"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeOpacity="0.6"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius - 23}
          stroke="#C8C7BE"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeOpacity="0.6"
        />

        {/* 4. Top Highlight Ridge (Bevel) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          stroke="url(#orbit3DHighlight)"
          strokeWidth="2.5"
          strokeDasharray="14 18"
          strokeOpacity="0.7"
        />

        {/* 5. Center Guiderail Groove */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          stroke="#C2C1B8"
          strokeWidth="1.2"
          strokeDasharray="5 7"
          strokeOpacity="0.5"
        />

        {/* 6. Continuous Data Pulse Stream */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          stroke="url(#orbit3DBrandStream)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="35 220"
          initial={{ strokeDashoffset: 450 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
        />
      </svg>

      {/* Three Statistics Blocks positioned inside the circular orbit's visible inner area */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[15%] sm:left-[20%] lg:left-[22%] z-20 pointer-events-auto text-left max-w-[140px] sm:max-w-[195px]">
        <MetricBlock layout="vertical" />
      </div>

      {/* CONTINUOUS ROTATION LAYER */}
      {/* Smooth Framer-Motion continuous rotation: updates DOM hit-test position live at every angle! */}
      <motion.div
        style={{
          position: "absolute",
          top: "7.5%",
          left: "7.5%",
          width: "85%",
          height: "85%",
          borderRadius: "50%",
          transformOrigin: "center center",
          rotate: rotation,
        }}
        className="pointer-events-none"
      >
        {/* Decorative Micro-Satellite Dots */}
        {microSatellites.map((sat, i) => {
          const { left, top } = getCoordPercent(sat.angleDeg);

          return (
            <div
              key={`sat-${i}`}
              suppressHydrationWarning
              style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
                width: `${sat.size}px`,
                height: `${sat.size}px`,
                backgroundColor: sat.color,
                boxShadow: `0 0 10px ${sat.color}`,
              }}
              className="rounded-full pointer-events-none opacity-85"
            />
          );
        })}

        {/* Technology Badges along the path */}
        {orbitNodes.map((node) => {
          const { left, top } = getCoordPercent(node.angleDeg);
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              data-orbit-node={node.id}
              suppressHydrationWarning
              style={{
                position: "absolute",
                left,
                top,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 70 : 30,
              }}
              className="pointer-events-auto group cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Counter-rotation: Keeps icon upright at all times, synchronized with rotation */}
              <motion.div
                style={{
                  transformOrigin: "center center",
                  rotate: counterRotation,
                }}
                className="relative"
              >
                {/* Velocity Motion Streak */}
                <div
                  style={{
                    backgroundColor: node.color,
                    opacity: isActive ? 0.45 : 0.22,
                  }}
                  className="absolute -inset-2.5 rounded-full blur-md group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                />

                {/* Trailing motion blur behind the icon */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${node.color}40, transparent)`,
                  }}
                  className="absolute top-1/2 -left-6 -translate-y-1/2 w-8 h-5 rounded-full blur-sm opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity"
                />

                {/* The 3D Technology Icon Badge with generous touch target */}
                <button
                  type="button"
                  aria-label={`View details for ${node.name}`}
                  aria-expanded={isActive}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleToggle(node.id, e);
                  }}
                  onClick={(e) => handleToggle(node.id, e)}
                  style={{
                    backgroundColor: "#16171B",
                    boxShadow: isActive
                      ? `0 0 0 3px ${node.color}, 0 16px 32px -4px rgba(0,0,0,0.4)`
                      : "0 12px 24px -5px rgba(0,0,0,0.32), 0 0 0 2px rgba(255,255,255,0.95)",
                    transform: isActive ? "scale(1.15)" : undefined,
                  }}
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center p-3 relative text-white cursor-pointer transition-all duration-300 hover:scale-115 active:scale-95 focus:outline-none"
                >
                  {/* Brand Color Inner Accent Ring */}
                  <div
                    style={{ borderColor: node.color }}
                    className="absolute inset-[2.5px] rounded-full border-2 opacity-85"
                  />

                  {/* Icon */}
                  <div className="relative z-10">{node.icon}</div>

                  {/* Status Pulse Dot */}
                  <span
                    style={{ backgroundColor: node.color }}
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white animate-pulse"
                  />
                </button>

                {/* Sleek Explanation Tooltip Box */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translate(-50%, -12px) scale(1)"
                      : "translate(-50%, 0px) scale(0.92)",
                    transition:
                      "opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute left-1/2 bottom-full mb-2.5 w-48 sm:w-64 p-3 sm:p-4 bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.08)] border border-black/[0.1] text-left z-[80] select-text pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      style={{ color: node.color }}
                      className="text-[10px] font-bold uppercase tracking-wider"
                    >
                      {node.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPinnedNode(null);
                        setHoveredNode(null);
                      }}
                      className="w-5 h-5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-[#121316] leading-tight">
                    {node.name}
                  </h4>

                  <div className="mt-2 pt-2 border-t border-black/[0.06] flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        style={{ backgroundColor: node.color }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span className="text-[11px] font-bold text-[#121316]">
                        {node.metric}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-600 leading-snug">
                      {node.subtext}
                    </span>
                  </div>

                  {/* Little bottom arrow notch */}
                  <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white/98 border-b border-r border-black/[0.1] rotate-45" />
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
}
