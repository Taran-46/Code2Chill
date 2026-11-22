"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Plus, Check, Clock, MapPin, Eye, Trash2, X } from "lucide-react";
import { getAllMockEvents, saveDemoEvents } from "@/data/mock";
import { EventItem } from "@/types";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Workshop");
  const [startAt, setStartAt] = useState("");
  const [venue, setVenue] = useState("");
  const [summary, setSummary] = useState("");
  const [regUrl, setRegUrl] = useState("");

  useEffect(() => {
    setEvents(getAllMockEvents());
  }, []);

  const toggleStatus = (id: string) => {
    const updated = events.map((e) =>
      e.id === id
        ? {
            ...e,
            status: e.status === "published" ? ("draft" as const) : ("published" as const),
          }
        : e
    );
    setEvents(updated);
    saveDemoEvents(updated);
  };

  const handleDelete = (id: string, eventTitle: string) => {
    if (confirm(`Delete event "${eventTitle}"?`)) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      saveDemoEvents(updated);
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startAt) return;

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: summary || "Club technical workshop session.",
      description: `### About this session\n${summary}\n\nJoin the Code2Chill team for a practical hands-on session.`,
      category,
      startAt: new Date(startAt).toISOString(),
      timezone: "Asia/Kolkata",
      venue: venue || "",
      registrationMode: regUrl ? "external" : "none",
      registrationUrl: regUrl || "",
      status: "published",
      featured: events.length === 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEvent, ...events];
    setEvents(updated);
    saveDemoEvents(updated);

    // Reset & close
    setTitle("");
    setSummary("");
    setVenue("");
    setStartAt("");
    setRegUrl("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Event & Workshop Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Create verified workshop sessions, manage RSVP details, venue assignments, and calendar visibility. Changes persist locally.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Table / Empty State */}
      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
          <Calendar className="w-8 h-8 text-brand-cyan mx-auto" />
          <h3 className="font-display font-bold text-lg text-white">
            No Events in Database
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
            Sample and unverified events have been removed from the live site. Click &quot;Create New Event&quot; above to add a session; it will appear live on the Events page.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 bg-[#080E1E] overflow-hidden shadow-card">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02] text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date (IST)</th>
                <th className="py-3.5 px-4">Venue</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 text-slate-300">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">{e.title}</td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-white/[0.04] border border-white/8 px-2 py-0.5 text-[11px]">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(e.startAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{e.venue || "TBA"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(e.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                        e.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                      }`}
                    >
                      {e.status === "published" ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <span>Draft</span>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(e.id, e.title)}
                      className="p-1.5 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-6 max-w-md w-full space-y-4 shadow-lifted">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h3 className="font-display font-bold text-base text-white">Create Event (Demo)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3.5 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Event Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Git & GitHub Jumpstart Session"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#070D1B] px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Tech Talk">Tech Talk</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/10 bg-[#070D1B] px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Venue (Optional)</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Lab 204, Turing Block"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">RSVP / Registration URL (Optional)</label>
                <input
                  type="url"
                  value={regUrl}
                  onChange={(e) => setRegUrl(e.target.value)}
                  placeholder="https://forms.gle/..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Brief Summary</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  placeholder="What students will learn in this session..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
