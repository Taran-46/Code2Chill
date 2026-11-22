import React from "react";

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden opacity-30 select-none">
      {/* Subtle Coordinate Grid Lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full" />
    </div>
  );
}
