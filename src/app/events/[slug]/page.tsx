import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Users,
  AlertCircle,
  Share2,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { CountdownTimer } from "@/components/events/countdown-timer";
import { getMockEventBySlug, getMockEvents } from "@/data/mock";
import { formatEventDateTimeRange } from "@/lib/utils/dates";
import { getEventTemporalStatus, getEventRegistrationState } from "@/lib/utils/event-status";

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const events = getMockEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: EventDetailPageProps) {
  const event = getMockEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} — Code2Chill`,
    description: event.summary,
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = getMockEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const temporalStatus = getEventTemporalStatus(event.startAt, event.endAt);
  const regState = getEventRegistrationState(event);

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-12">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-6 sm:p-10 shadow-lifted space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{event.category}</Badge>
              <StatusBadge type="temporal" status={temporalStatus} />
            </div>
            <StatusBadge type="registration" status={regState} />
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {event.title}
          </h1>

          <p className="editorial-lead text-base sm:text-xl text-slate-300 max-w-3xl">
            {event.summary}
          </p>

          {/* Quick Schedule Grid - Clean Sans-Serif Typographic Hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/8 text-xs font-sans text-slate-300">
            <div className="rounded-lg bg-white/[0.04] border border-white/8 p-3 space-y-1.5">
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wide">Date & Time</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Calendar className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>
                  {formatEventDateTimeRange(event.startAt, event.endAt, event.timezone)}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-white/[0.04] border border-white/8 p-3 space-y-1.5">
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wide">Venue</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            <div className="rounded-lg bg-white/[0.04] border border-white/8 p-3 space-y-1.5">
              <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wide">Timezone / Capacity</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>{event.timezone} {event.capacity ? `· Max ${event.capacity} seats` : ""}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Body: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Event Poster if available */}
            {event.posterPath && (
              <div className="rounded-xl overflow-hidden border border-border bg-canvas-muted max-h-[420px]">
                <img
                  src={event.posterPath}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Rich Description */}
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-display font-bold text-ink">
                About this Session
              </h2>
              
              <div className="prose prose-neutral max-w-none text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* Participation Guidelines */}
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-display font-bold text-ink flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-brand-lime-dark" />
                <span>Important Information for Attendees</span>
              </h3>
              <ul className="space-y-2 text-xs text-ink-muted list-disc list-inside leading-relaxed">
                <li>Please arrive at the venue 15 minutes before the scheduled start time.</li>
                <li>Bring your student identity card for verification at the entrance.</li>
                <li>For coding workshops, bring a laptop with administrative permissions to install tools.</li>
                <li>Registration is non-transferable and subject to room seating capacity.</li>
              </ul>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Countdown Card (Only for upcoming events) */}
            {temporalStatus === "upcoming" && (
              <CountdownTimer targetDate={event.startAt} label="Countdown to Session" />
            )}

            {/* Registration Action Card */}
            <div className="rounded-xl border border-white/10 bg-[#080E1E] p-6 space-y-5 shadow-card">
              <div className="space-y-1">
                <span className="text-xs font-sans text-slate-400 uppercase tracking-wide">Participation</span>
                <h3 className="font-display font-bold text-lg text-white">
                  {regState === "open"
                    ? "Registrations are Open"
                    : regState === "closed"
                    ? "Registration is Closed"
                    : "No Pre-Registration Required"}
                </h3>
              </div>

              {event.registrationDeadline && (
                <p className="text-xs text-slate-300 font-sans">
                  RSVP Deadline: {formatEventDateTimeRange(event.registrationDeadline, null, event.timezone)}
                </p>
              )}

              {event.registrationUrl && regState === "open" ? (
                <div className="space-y-3">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="primary" size="lg" className="w-full">
                      <span>Complete External RSVP</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-[11px] text-slate-400 text-center font-sans">
                    You will be directed to the official Google Form / Unstop registration portal.
                  </p>
                </div>
              ) : (
                <Button variant="secondary" size="lg" disabled className="w-full">
                  <span>{regState === "closed" ? "RSVP Closed" : "Open Seating"}</span>
                </Button>
              )}
            </div>

            {/* Organizer Contact Card */}
            <div className="rounded-xl border border-white/10 bg-[#080E1E] p-6 space-y-3 text-xs font-sans">
              <span className="text-slate-400 uppercase tracking-wider block font-medium">Event Coordinators</span>
              <p className="text-white font-semibold text-sm">Code2Chill Technical Team</p>
              <p className="text-slate-300">Chitkara University</p>
              <div className="pt-2 border-t border-white/8 flex items-center justify-between">
                <span className="text-slate-400">Questions?</span>
                <Link href="/contact" className="text-brand-cyan font-semibold hover:underline">
                  Contact Organizers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
