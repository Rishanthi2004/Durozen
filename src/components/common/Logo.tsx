"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  onAnimationComplete?: () => void;
  showSubtitle?: boolean;
  className?: string;
}

export default function DurozenLogo({
  size = "md",
  animated = false,
  onAnimationComplete,
  showSubtitle = true,
  className = "",
}: LogoProps) {
  // Scale mapping
  const scaleMap = {
    sm: { diameter: 30, overlap: -8, fontSize: "11px", height: 36, offsetUR: -2, offsetOZ: 3, offsetEN: 1 },
    md: { diameter: 44, overlap: -12, fontSize: "15px", height: 50, offsetUR: -3, offsetOZ: 4, offsetEN: 1 },
    lg: { diameter: 58, overlap: -16, fontSize: "19px", height: 66, offsetUR: -4, offsetOZ: 5, offsetEN: 2 },
    xl: { diameter: 72, overlap: -20, fontSize: "24px", height: 82, offsetUR: -5, offsetOZ: 7, offsetEN: 2 },
  };

  const config = scaleMap[size];

  // Circle data representing authentic Durozen Logo
  const circles = [
    {
      id: "d",
      text: "D",
      bg: "#DE2F28", // Durozen Red
      yOffset: 0,
      zIndex: 40,
      delay: 0.05,
    },
    {
      id: "ur",
      text: "UR",
      bg: "#F4A81E", // Durozen Warm Golden Yellow
      yOffset: config.offsetUR,
      zIndex: 30,
      delay: 0.18,
    },
    {
      id: "oz",
      text: "OZ",
      bg: "#549B31", // Durozen Grass Green
      yOffset: config.offsetOZ,
      zIndex: 20,
      delay: 0.31,
    },
    {
      id: "en",
      text: "EN",
      bg: "#24419E", // Durozen Royal Blue
      yOffset: config.offsetEN,
      zIndex: 10,
      delay: 0.44,
    },
  ];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className="flex items-center relative"
        style={{
          height: `${config.height}px`,
        }}
      >
        {circles.map((c, idx) => {
          const isLast = idx === circles.length - 1;

          if (animated) {
            return (
              <motion.div
                key={c.id}
                initial={{ y: -90, opacity: 0, scale: 0.6 }}
                animate={{
                  y: c.yOffset,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 18,
                  delay: c.delay,
                }}
                onAnimationComplete={() => {
                  if (isLast && onAnimationComplete) {
                    onAnimationComplete();
                  }
                }}
                whileHover={{
                  scale: 1.08,
                  y: c.yOffset - 3,
                  transition: { duration: 0.18 },
                }}
                style={{
                  width: `${config.diameter}px`,
                  height: `${config.diameter}px`,
                  backgroundColor: c.bg,
                  marginLeft: idx === 0 ? 0 : `${config.overlap}px`,
                  zIndex: c.zIndex,
                }}
                className="rounded-full flex items-center justify-center font-sans font-black text-white shadow-sm ring-1 ring-black/5 cursor-pointer relative"
              >
                <span
                  style={{
                    fontSize: config.fontSize,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                  className="font-bold text-white tracking-tighter"
                >
                  {c.text}
                </span>
              </motion.div>
            );
          }

          return (
            <div
              key={c.id}
              style={{
                width: `${config.diameter}px`,
                height: `${config.diameter}px`,
                backgroundColor: c.bg,
                transform: `translateY(${c.yOffset}px)`,
                marginLeft: idx === 0 ? 0 : `${config.overlap}px`,
                zIndex: c.zIndex,
              }}
              className="rounded-full flex items-center justify-center font-sans font-black text-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 cursor-pointer relative"
            >
              <span
                style={{
                  fontSize: config.fontSize,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
                className="font-bold text-white tracking-tighter"
              >
                {c.text}
              </span>
            </div>
          );
        })}
      </div>

      {showSubtitle && (
        <div className="flex flex-col leading-tight pl-1">
          <span className="font-extrabold tracking-tight text-[#121316] text-base md:text-lg font-sans">
            DUROZEN
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-[#6B7280]">
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );
}
