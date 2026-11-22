"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction the element slides in from. Default: "left" */
  direction?: "left" | "right" | "up" | "down";
  /** Pixel distance to travel. Default: 48 */
  distance?: number;
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number;
  /** Animation duration (seconds). Default: 0.65 */
  duration?: number;
  /** How much of element must be visible before triggering. Default: 0.15 */
  threshold?: number;
  /** Only animate once. Default: true */
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  direction = "left",
  distance = 48,
  delay = 0,
  duration = 0.65,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  const directionMap: Record<string, { x: number; y: number }> = {
    left:  { x: -distance, y: 0 },
    right: { x:  distance, y: 0 },
    up:    { x: 0, y: -distance },
    down:  { x: 0, y:  distance },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 18,
        mass: 0.8,
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
}
