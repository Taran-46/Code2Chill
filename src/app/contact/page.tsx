"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Instagram,
  Github,
  Linkedin,
  MapPin,
  Send,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMockSiteSettings } from "@/data/mock";

export default function ContactPage() {
  const settings = getMockSiteSettings();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    // Build mailto query safely
    const mailtoSubject = encodeURIComponent(
      `[Code2Chill Query] ${subject || "Inquiry from " + fullName}`
    );
    const mailtoBody = encodeURIComponent(
      `From: ${fullName} (${email})\n\n${message}\n\n---\nSent via Code2Chill Website Contact Form`
    );

    // Open mail client
    window.location.href = `mailto:${settings.contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatus("ready");
  };

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5 text-brand-lime-dark" />
              <span className="text-xs font-sans font-medium text-ink">
                Contact & Inquiries
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
              Get in Touch with Code2Chill
            </h1>
            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Have a question about an upcoming workshop, want to propose a technical talk, or coordinate student collaboration? We are here to connect.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid: Contact Channels + Direct Inquiries Form */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Official Contact Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-ink">
                  Official Channels
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  For formal communications, workshop participation questions, or club activities, please reach out through our verified channels:
                </p>
              </div>

              {/* Channel Cards */}
              <div className="space-y-4">
                {/* Email Card */}
                <div className="rounded-xl border border-border bg-surface p-5 space-y-2 shadow-subtle">
                  <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                    <Mail className="w-4 h-4 text-brand-lime-dark" />
                    <span>Official Club Email</span>
                  </div>
                  <p className="text-xs font-mono text-ink-muted break-all">
                    {settings.contactEmail}
                  </p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-lime-dark hover:underline pt-1"
                  >
                    <span>Send email directly</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Instagram Card */}
                <div className="rounded-xl border border-border bg-surface p-5 space-y-2 shadow-subtle">
                  <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                    <Instagram className="w-4 h-4 text-brand-lime-dark" />
                    <span>Club Instagram</span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Event announcements, live stories, and workshop recaps.
                  </p>
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-lime-dark hover:underline pt-1"
                  >
                    <span>@code2chill.osl on Instagram</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Campus & Location */}
                <div className="rounded-xl border border-border bg-surface p-5 space-y-2 shadow-subtle">
                  <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                    <MapPin className="w-4 h-4 text-brand-lime-dark" />
                    <span>University Campus</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {settings.university} · {settings.campus}
                  </p>
                  <span className="text-[11px] font-mono text-ink-faint block">
                    Academic Block · Turing / Newton Hall
                  </span>
                </div>
              </div>

              {/* Student Leadership Note */}
              <div className="rounded-xl border border-border bg-canvas p-5 space-y-2 text-xs text-ink-muted">
                <p className="font-semibold text-ink">Student Leadership & Track Leads</p>
                <p className="leading-relaxed">
                  To contact specific student coordinators or technical track leads directly, please visit our{" "}
                  <Link href="/team" className="text-brand-blue font-medium underline underline-offset-2">
                    Team Directory
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right Column: Direct Inquiries Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-subtle space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-ink">
                    Send an Inquiry
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Fill out the details below. This will draft an email to our team.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-ink block">
                        Your Name <span className="text-status-error">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-ink block">
                        Your Email Address <span className="text-status-error">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@chitkara.edu.in"
                        className="w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-ink block">
                      Subject / Topic
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Workshop participation question or project proposal"
                      className="w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-ink block">
                      Message <span className="text-status-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or question for the club coordinators..."
                      className="w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                      <Send className="w-4 h-4" />
                      <span>Draft Email to Coordinators</span>
                    </Button>
                  </div>

                  {status === "ready" && (
                    <div className="rounded-lg bg-canvas-muted border border-border p-3.5 text-xs text-ink-muted flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                      <span>
                        Your email client has been prompted with the drafted inquiry addressed to <strong>{settings.contactEmail}</strong>.
                      </span>
                    </div>
                  )}

                  <p className="text-[11px] text-ink-muted">
                    We do not store your message on an unverified database. Clicking the button opens your preferred mail client directly.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
