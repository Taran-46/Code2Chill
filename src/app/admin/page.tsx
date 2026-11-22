import React from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  FolderGit2,
  Images,
  Inbox,
  BellRing,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { getMockTeam, getMockEvents, getMockProjects, getMockGalleryAlbums, getMockAnnouncements } from "@/data/mock";
import { isSupabaseConfigured } from "@/lib/supabase/status";

export const metadata = {
  title: "Dashboard Overview — Coordinator Portal",
};

export default function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const team = getMockTeam();
  const events = getMockEvents();
  const projects = getMockProjects();
  const albums = getMockGalleryAlbums();
  const announcements = getMockAnnouncements();

  const publishedTeam = team.filter((m) => m.isPublished).length;
  const publishedEvents = events.filter((e) => e.status === "published").length;
  const publishedProjects = projects.filter((p) => p.status === "published").length;
  const publishedAlbums = albums.filter((a) => a.isPublished).length;

  const cards = [
    {
      title: "Team Members",
      stat: `${publishedTeam} of ${team.length}`,
      sub: "Published student profiles",
      href: "/admin/team",
      icon: Users,
      color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    },
    {
      title: "Events",
      stat: `${publishedEvents} of ${events.length}`,
      sub: "Active sessions on calendar",
      href: "/admin/events",
      icon: Calendar,
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      title: "Projects",
      stat: `${publishedProjects} of ${projects.length}`,
      sub: "Student software showcases",
      href: "/admin/projects",
      icon: FolderGit2,
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    },
    {
      title: "Gallery Albums",
      stat: `${publishedAlbums} of ${albums.length}`,
      sub: "Event photo collections",
      href: "/admin/gallery",
      icon: Images,
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      title: "Announcements",
      stat: `${announcements.length}`,
      sub: "Active and scheduled banners",
      href: "/admin/announcements",
      icon: BellRing,
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
    {
      title: "Inquiries Inbox",
      stat: "Secure Store",
      sub: "Visitor contact submissions",
      href: "/admin/inquiries",
      icon: Inbox,
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Club Overview & Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Manage public publications, review contact submissions, and configure club settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {configured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-sans font-medium text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Supabase Connected</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-sans font-medium text-amber-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Local Mock Mode</span>
            </span>
          )}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="rounded-xl border border-white/8 bg-[#080E1E] p-5 space-y-4 shadow-card hover:border-brand-cyan/40 hover:-translate-y-0.5 transition-all duration-300 block group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg border ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all" />
              </div>

              <div>
                <span className="text-2xl font-display font-bold text-white block">
                  {c.stat}
                </span>
                <h3 className="font-sans font-semibold text-sm text-slate-200 mt-0.5">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  {c.sub}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Policy & Privacy Reminders */}
      <div className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-4">
        <h2 className="font-display font-bold text-base text-white">
          Club Administrative Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-slate-300">
          <div className="p-3.5 rounded-lg border border-white/6 bg-white/[0.02] space-y-1">
            <span className="font-semibold text-brand-cyan block">Student Privacy</span>
            <p className="text-slate-400 leading-relaxed">
              Member project repository links and contributor credits must only be published with explicit student consent.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-white/6 bg-white/[0.02] space-y-1">
            <span className="font-semibold text-brand-cyan block">Event Accuracy</span>
            <p className="text-slate-400 leading-relaxed">
              Only publish events with confirmed dates, verified venue permissions, and active RSVP mechanisms.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-white/6 bg-white/[0.02] space-y-1">
            <span className="font-semibold text-brand-cyan block">Row Level Security</span>
            <p className="text-slate-400 leading-relaxed">
              Inquiries and unpublished drafts are strictly protected in PostgreSQL and cannot be read by public visitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
