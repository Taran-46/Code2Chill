"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Mail, CheckCircle2, Clock, ShieldAlert, ArrowRight, User, RefreshCw } from "lucide-react";
import { ContactInquiry } from "@/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data?.inquiries) {
        setInquiries(data.inquiries);
        if (data.inquiries.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data.inquiries[0]);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string | undefined, newStatus: "new" | "reviewed" | "resolved") => {
    if (!id) return;
    try {
      await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Contact Inquiries Inbox
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Review and respond to messages submitted by visitors through the public contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1.5 rounded-lg">
            <span>{inquiries.filter((i) => i.status === "new").length} New Messages</span>
          </div>
        </div>
      </div>

      {/* Inbox Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List Pane */}
        <div className="lg:col-span-5 rounded-xl border border-white/8 bg-[#080E1E] overflow-hidden shadow-card">
          <div className="p-3.5 border-b border-white/8 bg-white/[0.02] text-xs font-semibold text-slate-300">
            Received Inquiries ({inquiries.length})
          </div>

          <div className="divide-y divide-white/6 max-h-[600px] overflow-y-auto">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 font-sans">
                No inquiries received yet. Submit a message on the Contact page to test live delivery.
              </div>
            ) : (
              inquiries.map((inq) => {
                const active = selectedInquiry?.id === inq.id;
                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`w-full text-left p-4 space-y-1.5 transition-colors block ${
                      active ? "bg-white/[0.06] border-l-2 border-brand-cyan" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs text-white truncate">
                        {inq.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          inq.status === "new"
                            ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                            : inq.status === "reviewed"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-1">
                      {inq.subject || "No Subject"}
                    </p>

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {inq.message}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-6 shadow-card">
          {selectedInquiry ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedInquiry.subject || "Contact Inquiry"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                    <User className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="text-white font-medium">{selectedInquiry.name}</span>
                    <span>·</span>
                    <span className="text-slate-400">{selectedInquiry.email}</span>
                  </div>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-1.5 text-xs font-sans">
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, "new")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedInquiry.status === "new"
                        ? "bg-rose-500 text-white font-semibold"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, "reviewed")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedInquiry.status === "reviewed"
                        ? "bg-amber-500 text-white font-semibold"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    Reviewed
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry.id, "resolved")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedInquiry.status === "resolved"
                        ? "bg-emerald-500 text-white font-semibold"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="rounded-lg bg-black/30 border border-white/6 p-5 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>

              {/* Reply Note */}
              <div className="text-xs text-slate-400 font-sans bg-white/[0.02] border border-white/6 p-3.5 rounded-lg flex items-start gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  Direct email communication can be sent to <strong className="text-white">{selectedInquiry.email}</strong>.
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-sans">
              Select an inquiry from the left pane to view its full message.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
