"use client";

import React, { useEffect, useRef } from "react";

/**
 * CustomCursor — lightweight, zero-dependency cursor overlay.
 *
 * Visual specifications:
 *   • 6px cyan precision dot that tracks the cursor.
 *   • 24px subtle ring (1px border, 0% opacity background) that smoothly eases behind.
 *   • Never obscures or blocks any text, links, or buttons.
 *   • Null-safe refs that never throw unhandled runtime exceptions.
 *   • Hides on text inputs so native text carets work naturally.
 *   • Hidden completely on touch/mobile devices and when reduced motion is preferred.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let isHovered = false;
    let visible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        rx = mx;
        ry = my;
      }
    };

    const onMouseLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      visible = true;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isInput) {
        if (dotRef.current) dotRef.current.style.opacity = "0";
        if (ringRef.current) ringRef.current.style.opacity = "0";
        return;
      }

      if (visible) {
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      const hoverable =
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest('[role="button"]') ||
        target?.closest("[data-cursor-interactive]");
      isHovered = Boolean(hoverable);
    };

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        const ease = 0.15;
        rx += (mx - rx) * ease;
        ry += (my - ry) * ease;

        dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;

        const size = isHovered ? 36 : 22;
        ring.style.transform = `translate3d(${rx - size / 2}px, ${ry - size / 2}px, 0)`;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.borderColor = isHovered
          ? "rgba(56, 189, 248, 0.85)"
          : "rgba(56, 189, 248, 0.4)";
        ring.style.boxShadow = isHovered
          ? "0 0 10px rgba(56, 189, 248, 0.3)"
          : "none";
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none overflow-hidden hidden md:block"
    >
      {/* 6px cyan center point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: "#38bdf8",
          boxShadow: "0 0 6px rgba(56, 189, 248, 0.8)",
          opacity: 0,
          transition: "opacity 0.15s ease",
          willChange: "transform",
        }}
      />

      {/* Trailing follower ring (pure border, completely transparent center) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: 22,
          height: 22,
          backgroundColor: "transparent",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          opacity: 0,
          transition:
            "opacity 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease, width 0.2s ease, height 0.2s ease",
          willChange: "transform, width, height",
        }}
      />
    </div>
  );
}
