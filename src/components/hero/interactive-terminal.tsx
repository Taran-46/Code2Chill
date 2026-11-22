"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Copy, Check } from "lucide-react";
import { EventItem } from "@/types";

interface InteractiveTerminalProps {
  featuredEvent?: EventItem;
}

export function InteractiveTerminal({ featuredEvent }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<"club.ts" | "stack.json" | "run.sh">("club.ts");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/12 bg-gradient-to-b from-[#080E1E] to-[#040814] text-white p-6 sm:p-7 shadow-lifted space-y-5 relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300">
      {/* Subtle Luminous Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 aspect-square rounded-full overflow-hidden shrink-0 shadow-[0_0_20px_-3px_rgba(56,189,248,0.35)]">
            <Image
              src="/images/code2chill-logo-circle.png"
              alt="Code2Chill Official Emblem"
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="font-display font-extrabold text-white text-base tracking-tight leading-none">
              Code<span className="text-brand-cyan">2</span>Chill
            </div>
            <span className="text-[11px] text-slate-400 font-sans">
              Student Tech Community
            </span>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] p-1 border border-white/8 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("club.ts")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "club.ts"
                ? "bg-brand-blue text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            club.ts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("stack.json")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "stack.json"
                ? "bg-brand-blue text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            stack.json
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("run.sh")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "run.sh"
                ? "bg-brand-blue text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            run.sh
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="font-mono text-xs sm:text-[13px] leading-relaxed relative z-10 min-h-[170px] bg-black/40 rounded-xl p-4 border border-white/6 overflow-x-auto">
        {activeTab === "club.ts" && (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-brand-cyan font-semibold">export const</span> code2chill = &#123;</p>
            <p className="pl-4">campus: <span className="text-sky-300">&quot;Chitkara University&quot;</span>,</p>
            <p className="pl-4">lead: <span className="text-sky-300">&quot;Student-Driven&quot;</span>,</p>
            <p className="pl-4">activities: [</p>
            <p className="pl-8 text-white">&quot;Workshops&quot;,</p>
            <p className="pl-8 text-white">&quot;Hackathons&quot;,</p>
            <p className="pl-8 text-white">&quot;Technical Sessions&quot;</p>
            <p className="pl-4">],</p>
            <p className="pl-4">status: <span className="text-emerald-400">&quot;Active Community&quot;</span>,</p>
            <p>&#125;;</p>
          </div>
        )}

        {activeTab === "stack.json" && (
          <div className="space-y-1 text-slate-300">
            <p>&#123;</p>
            <p className="pl-4">&quot;framework&quot;: <span className="text-sky-300">&quot;Next.js 14 App Router&quot;</span>,</p>
            <p className="pl-4">&quot;language&quot;: <span className="text-sky-300">&quot;TypeScript Strict&quot;</span>,</p>
            <p className="pl-4">&quot;styling&quot;: <span className="text-sky-300">&quot;Tailwind CSS + Motion&quot;</span>,</p>
            <p className="pl-4">&quot;database&quot;: <span className="text-sky-300">&quot;Supabase Postgres &amp; RLS&quot;</span>,</p>
            <p className="pl-4">&quot;timezone&quot;: <span className="text-sky-300">&quot;Asia/Kolkata (IST)&quot;</span></p>
            <p>&#125;</p>
          </div>
        )}

        {activeTab === "run.sh" && (
          <div className="space-y-1.5 text-slate-300 font-mono">
            <p className="text-slate-500"># Verify local development environment</p>
            <p className="text-emerald-400">$ git status</p>
            <p className="text-slate-400">On branch main · working tree clean</p>
            <p className="text-brand-cyan">$ pnpm dev</p>
            <p className="text-emerald-400 font-semibold">✓ Server ready on http://localhost:3000</p>
          </div>
        )}
      </div>

      {/* Activity Status Chip */}
      {featuredEvent ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-center justify-between gap-3 relative z-10 hover:border-brand-cyan/30 transition-colors">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-semibold text-brand-cyan uppercase tracking-wider block">
              ● Upcoming Session
            </span>
            <p className="text-xs font-sans font-medium text-white truncate max-w-[200px] sm:max-w-[230px]">
              {featuredEvent.title}
            </p>
          </div>
          <Link
            href={`/events/${featuredEvent.slug}`}
            className="text-xs font-sans font-semibold text-brand-cyan hover:underline shrink-0"
          >
            View →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-center justify-between gap-3 relative z-10 hover:border-brand-cyan/30 transition-colors">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-semibold text-brand-cyan uppercase tracking-wider block">
              ● Community Sessions
            </span>
            <p className="text-xs font-sans font-medium text-slate-300">
              Stay tuned for upcoming event announcements
            </p>
          </div>
          <Link
            href="/events"
            className="text-xs font-sans font-semibold text-brand-cyan hover:underline shrink-0"
          >
            Events →
          </Link>
        </div>
      )}
    </div>
  );
}
