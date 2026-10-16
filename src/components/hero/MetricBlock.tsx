"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MetricItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  color: string;
}

const metricsData: MetricItem[] = [
  {
    value: 100,
    suffix: "%",
    label: "Dedicated Focus",
    sublabel: "Client-centric agile delivery",
    color: "#DE2F28", // Durozen Red accent
  },
  {
    value: 10,
    suffix: "+",
    label: "Technology Capabilities",
    sublabel: "Cloud, AI & engineering frameworks",
    color: "#549B31", // Durozen Green accent
  },
  {
    value: 35,
    suffix: "+",
    label: "Projects Delivered",
    sublabel: "Enterprise & digital scale",
    color: "#24419E", // Durozen Blue accent
  },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function MetricBlock({ layout = "vertical" }: { layout?: "vertical" | "horizontal" }) {
  return (
    <div
      className={
        layout === "vertical"
          ? "flex flex-col gap-4 sm:gap-5"
          : "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-black/[0.08]"
      }
    >
      {metricsData.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5 + index * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative flex flex-col text-left"
        >
          {/* Number Display */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#121316] font-sans leading-none">
              <CountUp
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
              />
            </span>
            <span
              style={{ backgroundColor: item.color }}
              className="w-1.5 h-1.5 rounded-full mb-1 group-hover:scale-150 transition-transform duration-200"
            />
          </div>

          {/* Label Display */}
          <p className="mt-1 text-[11px] sm:text-sm font-semibold text-[#121316] tracking-tight">
            {item.label}
          </p>

          {/* Optional Sublabel */}
          {item.sublabel && (
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 tracking-normal leading-tight">
              {item.sublabel}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
