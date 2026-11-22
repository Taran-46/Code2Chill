"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "Hands-on Workshops",
  "Student Hackathons",
  "Technical Sessions",
  "Chitkara University",
  "Student-Led Community",
  "Collaborative Building",
];

export function InfiniteMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/8 bg-[#040814] py-3.5 select-none"
      role="region"
      aria-label="Club Highlights"
    >
      {/* Edge Gradient Mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10" />

      {/* Marquee Track with Accessible aria-hidden duplicates */}
      <div className="flex w-max animate-marquee space-x-8 hover:[animation-play-state:paused]">
        {/* Track 1: Accessible for screen readers */}
        <div className="flex items-center space-x-8">
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`visible-${index}`}
              className="flex items-center gap-4 text-xs font-sans font-medium tracking-wider uppercase text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-brand-cyan">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Track 2: Visual duplicate (aria-hidden) */}
        <div className="flex items-center space-x-8" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`dup1-${index}`}
              className="flex items-center gap-4 text-xs font-sans font-medium tracking-wider uppercase text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-brand-cyan">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Track 3: Visual duplicate (aria-hidden) */}
        <div className="flex items-center space-x-8" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`dup2-${index}`}
              className="flex items-center gap-4 text-xs font-sans font-medium tracking-wider uppercase text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-brand-cyan">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
