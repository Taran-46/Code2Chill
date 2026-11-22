"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

/** Instant mount fade-up — for hero sections that should animate on page load, not scroll. */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 24,
}: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 18,
        mass: 0.7,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
