"use client";

import { useEffect, useState, useRef } from "react";

/**
 * LoadingScreen — rising-water text fill animation.
 * Shows once per browser session on first site visit.
 * Text "Code2Chill" fills up from the bottom like rising water,
 * with an animated wave at the waterline.
 * Respects prefers-reduced-motion.
 */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Only show once per browser session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("c2c_intro_shown")) {
      setHidden(true);
      return;
    }

    // Respect prefers-reduced-motion — skip animation entirely
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      sessionStorage.setItem("c2c_intro_shown", "1");
      setHidden(true);
      return;
    }

    const DURATION = 2400; // ms for 0→100%

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // Hold at 100% briefly, then fade out
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setHidden(true);
            sessionStorage.setItem("c2c_intro_shown", "1");
          }, 550);
        }, 250);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  // ── SVG geometry ─────────────────────────────────────────────
  // ViewBox: 900 × 220. Text baseline at y=180, fontSize=160.
  const VW = 900;
  const VH = 220;
  const TEXT_Y = 182;         // baseline of the text
  const TEXT_TOP = TEXT_Y - 160; // approx top of caps (fontSize ≈ 160)
  const TEXT_HEIGHT = TEXT_Y - TEXT_TOP; // 160

  // fillTop: top edge of the rising white rect (in SVG coords).
  //   progress=0  → fillTop = TEXT_Y (nothing filled)
  //   progress=100 → fillTop = TEXT_TOP (fully filled)
  const fillTop = TEXT_Y - (progress / 100) * TEXT_HEIGHT;

  // Wave amplitude and frequency
  const waveAmp = 8;
  const waveLen = 300; // px per cycle in SVG units

  // Build a wave path at fillTop that spans wider than viewbox (for animation)
  // The wave animates via CSS translateX
  const wavePoints = (): string => {
    const points: string[] = [];
    const startX = -waveLen;
    const endX = VW + waveLen;
    const steps = 12;
    const stepX = (endX - startX) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = startX + i * stepX;
      const y = fillTop + (i % 2 === 0 ? -waveAmp : waveAmp);
      if (i === 0) {
        points.push(`M${x.toFixed(1)},${y.toFixed(1)}`);
      } else {
        const cpX = x - stepX / 2;
        const cpY = fillTop + (i % 2 === 0 ? waveAmp : -waveAmp);
        points.push(`Q${cpX.toFixed(1)},${cpY.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`);
      }
    }
    // Close down to bottom
    points.push(`L${VW + waveLen},${VH} L${-waveLen},${VH} Z`);
    return points.join(" ");
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
      role="presentation"
    >
      {/* ── Rising-water SVG text ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-[800px] select-none px-6"
        aria-hidden="true"
      >
        <defs>
          {/* Clip path shaped like the text */}
          <clipPath id="c2c-loading-clip">
            <text
              x={VW / 2}
              y={TEXT_Y}
              textAnchor="middle"
              fontFamily="'Space Grotesk', system-ui, sans-serif"
              fontWeight="800"
              fontSize="160"
              letterSpacing="-5"
            >
              Code2Chill
            </text>
          </clipPath>
        </defs>

        {/* ① Dark "unfilled" text — always visible as the base layer */}
        <text
          x={VW / 2}
          y={TEXT_Y}
          textAnchor="middle"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontWeight="800"
          fontSize="160"
          letterSpacing="-5"
          fill="#1e2d45"
        >
          Code2Chill
        </text>

        {/* ② Rising water fill — clipped to text shape */}
        <g clipPath="url(#c2c-loading-clip)">
          {/* Solid white fill rect that rises */}
          <rect
            x={0}
            y={fillTop}
            width={VW}
            height={VH}
            fill="white"
          />

          {/* Wave path at waterline — animated sliding left */}
          {progress > 1 && progress < 100 && (
            <path
              d={wavePoints()}
              fill="white"
              style={{
                animation: "c2c-wave-slide 1.8s linear infinite",
                transformOrigin: "center",
              }}
            />
          )}

          {/* Subtle cyan glow band just above the waterline */}
          {progress > 1 && progress < 100 && (
            <rect
              x={0}
              y={fillTop - 6}
              width={VW}
              height={8}
              fill="rgba(56,189,248,0.4)"
              rx="2"
            />
          )}
        </g>
      </svg>

      {/* ── Percentage label ── */}
      <p className="mt-6 font-mono text-xs tracking-[0.25em] text-slate-500 lowercase">
        loading&hellip;&nbsp;{progress}&nbsp;%
      </p>

      {/* ── Keyframe styles injected inline ── */}
      <style>{`
        @keyframes c2c-wave-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(${-300}px); }
        }
      `}</style>
    </div>
  );
}
