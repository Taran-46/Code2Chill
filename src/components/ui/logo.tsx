import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}

/**
 * Official Code2Chill Brand Logo & Wordmark
 * Directly renders the official circular emblem featuring the C2C monogram,
 * code symbols, and student coder silhouette.
 */
export function Logo({
  className,
  showTagline = false,
  size = "md",
  inverted = false,
}: LogoProps) {
  const imageDimensions = {
    sm: { width: 36, height: 36, container: "w-9 h-9" },
    md: { width: 44, height: 44, container: "w-11 h-11" },
    lg: { width: 56, height: 56, container: "w-14 h-14" },
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg",
        className
      )}
      aria-label="Code2Chill Home"
    >
      {/* Official Emblem — circular PNG + CSS circle mask for clean render */}
      <div
        className={cn(
          "relative aspect-square rounded-full overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105",
          imageDimensions[size].container
        )}
      >
        <Image
          src="/images/code2chill-logo-circle.png"
          alt="Code2Chill Official Emblem"
          width={imageDimensions[size].width}
          height={imageDimensions[size].height}
          priority
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={cn(
              "font-display font-extrabold tracking-tight",
              textSizes[size],
              inverted ? "text-white" : "text-ink"
            )}
          >
            Code<span className="text-brand-blue font-black">2</span>Chill
          </span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[9px] font-sans font-semibold tracking-wider uppercase",
              inverted
                ? "bg-slate-800 text-slate-300 border border-slate-700"
                : "bg-blue-50 text-brand-navy border border-blue-200/60"
            )}
          >
            Club
          </span>
        </div>

        {showTagline && (
          <span
            className={cn(
              "text-[11px] font-medium tracking-tight mt-0.5",
              inverted ? "text-slate-400" : "text-ink-muted"
            )}
          >
            Chitkara University
          </span>
        )}
      </div>
    </Link>
  );
}
