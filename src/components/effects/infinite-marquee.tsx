"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "Hands-on Workshops",
  "Hackathons",
  "Systems Architecture",
  "Open Source Sprints",
  "Full-Stack Engineering",
  "Peer Code Reviews",
  "Chitkara University",
  "100% Student-Led",
];

export function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/8 bg-[#040814] py-3.5 select-none">
      {/* Edge Blur Mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10" />

      <div className="flex w-max animate-marquee space-x-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 text-xs font-sans font-medium tracking-wider uppercase text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-brand-cyan">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
