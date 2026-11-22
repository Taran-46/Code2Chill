"use client";

import React, { useState } from "react";
import { BellRing, Plus, Calendar, Check, X, ArrowRight, Sparkles } from "lucide-react";
import { getMockAnnouncements } from "@/data/mock";
import { AnnouncementItem } from "@/types";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(getMockAnnouncements());

  const togglePublished = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Announcement & Banner Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Publish time-sensitive alerts and top header banners. Expired announcements automatically disappear from the public website.
          </p>
        </div>

        <button
          onClick={() => alert("Configure Supabase to enable scheduling live announcements.")}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements List / Empty State */}
      {announcements.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
          <BellRing className="w-8 h-8 text-brand-cyan mx-auto" />
          <h3 className="font-display font-bold text-lg text-white">
            No Active Announcements
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
            The top header announcement bar is currently hidden. When you have urgent session registration or competition news, add an announcement here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-4 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">
                    <Sparkles className="w-3 h-3" /> Announcement
                  </span>
                  <button
                    onClick={() => togglePublished(ann.id)}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      ann.published
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                    }`}
                  >
                    {ann.published ? "Active" : "Disabled"}
                  </button>
                </div>

                {ann.expiresAt && (
                  <span className="text-[11px] text-slate-400 font-sans">
                    Expires: {ann.expiresAt}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  {ann.body}
                </p>
              </div>

              {ann.targetUrl && (
                <div className="pt-2 border-t border-white/8 text-xs text-brand-cyan flex items-center gap-1">
                  <span>Links to: {ann.targetUrl}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
