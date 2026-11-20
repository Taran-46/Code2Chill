"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { calculateCountdown, CountdownResult } from "@/lib/utils/dates";

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
  className?: string;
}

export function CountdownTimer({ targetDate, label = "Event Starts In", className }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
    totalMs: 0,
  });

  useEffect(() => {
    setMounted(true);
    // Initial calculation
    setCountdown(calculateCountdown(targetDate));

    // Live tick every second
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    // SSR fallback to prevent hydration mismatch
    return (
      <div className="rounded-xl border border-border bg-canvas p-4 text-xs font-mono text-ink-muted">
        Calculating countdown...
      </div>
    );
  }

  if (countdown.isComplete) {
    return (
      <div className="rounded-xl border border-border bg-canvas p-4 flex items-center gap-2 text-xs font-mono text-ink-muted">
        <Clock className="w-4 h-4 text-brand-lime-dark" />
        <span>Event has begun or concluded</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-canvas p-5 space-y-3 ${className || ""}`}>
      <div className="flex items-center gap-2 text-xs font-mono text-ink-muted uppercase tracking-wider">
        <Clock className="w-3.5 h-3.5 text-brand-lime-dark" />
        <span>{label}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg bg-surface border border-border p-2">
          <div className="text-xl font-display font-extrabold text-ink">{countdown.days}</div>
          <div className="text-[10px] font-mono uppercase text-ink-muted">Days</div>
        </div>
        <div className="rounded-lg bg-surface border border-border p-2">
          <div className="text-xl font-display font-extrabold text-ink">{countdown.hours}</div>
          <div className="text-[10px] font-mono uppercase text-ink-muted">Hours</div>
        </div>
        <div className="rounded-lg bg-surface border border-border p-2">
          <div className="text-xl font-display font-extrabold text-ink">{countdown.minutes}</div>
          <div className="text-[10px] font-mono uppercase text-ink-muted">Mins</div>
        </div>
        <div className="rounded-lg bg-surface border border-border p-2">
          <div className="text-xl font-display font-extrabold text-brand-lime-dark">{countdown.seconds}</div>
          <div className="text-[10px] font-mono uppercase text-ink-muted">Secs</div>
        </div>
      </div>
    </div>
  );
}
