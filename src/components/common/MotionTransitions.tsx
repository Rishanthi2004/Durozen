"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 18,
  className = "",
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.04,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export function StaggerItem({
  children,
  className = "",
  distance = 16,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

import { CardAccent, getCardAccentClass } from "@/utils/cardAccents";
export type { CardAccent };
export { getCardAccentClass };

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
  accent?: CardAccent;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

export function HoverCard({
  children,
  className = "",
  lift = -4,
  accent = "default",
  style,
  onClick,
  id,
}: HoverCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const accentClass = getCardAccentClass(accent);
  const combinedClassName = `${accentClass} ${className}`.trim();

  if (shouldReduceMotion) {
    return (
      <div id={id} style={style} onClick={onClick} className={combinedClassName}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      style={style}
      onClick={onClick}
      whileHover={{
        y: lift,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className={combinedClassName}
    >
      {children}
    </motion.div>
  );
}
