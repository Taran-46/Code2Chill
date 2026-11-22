"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child (seconds). Default: 0.07 */
  stagger?: number;
  /** Initial delay before the first child animates. Default: 0 */
  delay?: number;
  /** Direction children slide in from. Default: "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Pixel distance to travel. Default: 32 */
  distance?: number;
  /** Trigger threshold. Default: 0.1 */
  threshold?: number;
  /** Animate once. Default: true */
  once?: boolean;
}

const directionOffset = (dir: StaggerChildrenProps["direction"], dist: number) => {
  switch (dir) {
    case "up":    return { x: 0, y: dist };
    case "down":  return { x: 0, y: -dist };
    case "left":  return { x: dist, y: 0 };
    case "right": return { x: -dist, y: 0 };
    default:      return { x: 0, y: 0 };
  }
};

export function StaggerChildren({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  direction = "up",
  distance = 32,
  threshold = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });
  const { x, y } = directionOffset(direction, distance);

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 55,
        damping: 16,
        mass: 0.7,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child) =>
        child ? (
          <motion.div variants={item} style={{ display: "contents" }}>
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
}

/** Wraps a single child as a stagger item — use inside StaggerChildren */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 55,
        damping: 16,
        mass: 0.7,
      },
    },
  };

  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  );
}
