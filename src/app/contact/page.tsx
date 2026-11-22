"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  MapPin,
  Send,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getMockSiteSettings } from "@/data/mock";
import { FadeUp } from "@/components/effects/fade-up";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export default function ContactPage() {
  const settings = getMockSiteSettings();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          subject: subject || undefined,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Unable to submit inquiry. Please try again.");
      } else {
        setStatus("submitted");
        // Clear form fields
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-12">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                <MessageSquare className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-medium text-brand-cyan">
                  Contact & Inquiries
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Connect with Code2Chill
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Have a question about an upcoming workshop, want to collaborate on student technical initiatives, or submit feedback? We are here to connect.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Main Grid: Contact Channels + Direct Inquiries Form */}
      <section className="overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Official Contact Channels */}
            <ScrollReveal direction="left" distance={32} className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-bold text-white">
                  Official Channels
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Connect with Code2Chill directly through our verified social profiles for event announcements, live sessions, and community updates:
                </p>
              </div>

              {/* Channel Cards */}
              <div className="space-y-4">
                {/* Instagram Card - Primary Channel */}
                <div className="rounded-xl border border-brand-cyan/30 bg-[#080E1E] p-6 space-y-3 shadow-card hover:border-brand-cyan/60 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <span>Official Instagram</span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Direct message our student leads, check workshop stories, registration links, and live event updates.
                  </p>

                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline pt-1"
                  >
                    <span>Follow @code2chill.osl</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* LinkedIn Card */}
                <div className="rounded-xl border border-white/10 bg-[#080E1E] p-6 space-y-3 shadow-card hover:border-brand-cyan/60 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <span>Official LinkedIn</span>
                    </div>
                    <span className="text-[11px] font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
                      Company Page
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Professional club announcements, technical recaps, student spotlights, and network collaborations.
                  </p>

                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline pt-1"
                  >
                    <span>Follow Code2Chill on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* University Affiliation Card */}
                <div className="rounded-xl border border-white/8 bg-[#080E1E] p-5 space-y-2 shadow-card hover:border-white/15 transition-all">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <MapPin className="w-4 h-4 text-brand-cyan" />
                    <span>University Affiliation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {settings.university} · Punjab, India
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Code2Chill is a student-led technical community based at Chitkara University. Workshop venues and session halls are announced per event.
                  </p>
                </div>
              </div>

              {/* Student Leadership Directory Note */}
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Users className="w-4 h-4 text-brand-cyan" />
                  <span>Student Leads Directory</span>
                </div>
                <p className="leading-relaxed">
                  Looking to coordinate with specific track leads or mentors? Browse the full student leadership team on our{" "}
                  <Link href="/team" className="text-brand-cyan font-medium underline underline-offset-2">
                    Team Directory
                  </Link>.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Column: Direct Inquiries Form */}
            <ScrollReveal direction="right" distance={32} delay={0.12} className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-6 sm:p-10 shadow-lifted space-y-6 hover:border-white/20 transition-all duration-300">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-white">
                    Submit an Inquiry
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Leave your contact details and message below. Inquiries are stored securely for authorized student coordinators to review and follow up.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-slate-300 block">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-slate-300 block">
                        Your Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@chitkara.edu.in"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-slate-300 block">
                      Subject / Topic
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Workshop participation question or student project"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-slate-300 block">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or inquiry for the club coordinators..."
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan leading-relaxed resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {status === "submitted" && (
                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-300 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-white">Inquiry Received</p>
                        <p className="text-slate-300 leading-relaxed">
                          Thank you! Your inquiry has been securely recorded and queued for authorized student coordinators to review.
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-white">Submission Failed</p>
                        <p className="text-slate-300 leading-relaxed">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    Inquiries are stored securely and only accessible by authorized club leadership. We respect student privacy and never sell or share contact details.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
