"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getMockEvents } from "@/data/mock";
import { formatEventDateTimeRange } from "@/lib/utils/dates";
import { getEventTemporalStatus, getEventRegistrationState } from "@/lib/utils/event-status";
import { FadeUp } from "@/components/effects/fade-up";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";

const CATEGORIES = ["All", "Workshop", "Hackathon", "Tech Talk", "Peer Session"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const events = getMockEvents();

  // Classify events based on dates
  const upcomingEvents = events.filter(
    (e) => getEventTemporalStatus(e.startAt, e.endAt) !== "past"
  );
  const pastEvents = events.filter(
    (e) => getEventTemporalStatus(e.startAt, e.endAt) === "past"
  );

  // Apply category filtering
  const filterList = (list: typeof events) => {
    if (selectedCategory === "All") return list;
    return list.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());
  };

  const displayedUpcoming = filterList(upcomingEvents);
  const displayedPast = filterList(pastEvents);

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-8">
      {/* Page Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-sans font-medium text-brand-cyan">
                  Club Schedule & Archive
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Events & Workshops
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Explore upcoming coding sessions, hackathons, and technical talks. All event dates and deadlines are rendered in Indian Standard Time (Asia/Kolkata).
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Main Tabs and Category Filter */}
      <section>
        <Container>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
              {/* Upcoming vs Past Tabs */}
              <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="upcoming">
                    Upcoming Events ({upcomingEvents.length})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Past Archive ({pastEvents.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-sans font-medium text-slate-400 mr-1 hidden md:inline">
                  Filter:
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-xs font-sans font-medium transition-colors whitespace-nowrap ${selectedCategory === cat
                        ? "bg-brand-blue text-white font-semibold shadow-subtle border border-blue-400/30"
                        : "bg-white/[0.04] border border-white/8 text-slate-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* UPCOMING EVENTS LIST */}
            {activeTab === "upcoming" && (
              <div className="space-y-6">
                {displayedUpcoming.length > 0 ? (
                  <StaggerChildren
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    stagger={0.1}
                    distance={28}
                  >
                    {displayedUpcoming.map((event) => {
                      const regState = getEventRegistrationState(event);

                      return (
                        <StaggerItem key={event.id}>
                          <Card interactive className="flex flex-col h-full hover:border-brand-cyan/40 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.2)] transition-all duration-300">
                            {event.posterPath && (
                              <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-xl bg-canvas-muted border-b border-border">
                                <img
                                  src={event.posterPath}
                                  alt={event.title}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge variant="brand">{event.category}</Badge>
                                </div>
                              </div>
                            )}

                            <CardHeader className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                {!event.posterPath && (
                                  <Badge variant="subtle">{event.category}</Badge>
                                )}
                                <StatusBadge type="registration" status={regState} />
                              </div>

                              <CardTitle className="text-xl hover:text-brand-cyan transition-colors">
                                <Link href={`/events/${event.slug}`}>
                                  {event.title}
                                </Link>
                              </CardTitle>

                              <CardDescription>{event.summary}</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2 text-xs font-sans text-slate-300">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-brand-cyan shrink-0" />
                                <span>
                                  {formatEventDateTimeRange(
                                    event.startAt,
                                    event.endAt,
                                    event.timezone
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                                <span className="truncate">{event.venue}</span>
                              </div>
                            </CardContent>

                            <CardFooter className="pt-4 border-t border-border mt-auto">
                              <div className="flex items-center justify-between w-full">
                                <Link
                                  href={`/events/${event.slug}`}
                                  className="text-xs font-semibold text-ink hover:text-brand-cyan"
                                >
                                  View Agenda & Rules →
                                </Link>

                                {event.registrationUrl && regState === "open" && (
                                  <a
                                    href={event.registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline"
                                  >
                                    <span>RSVP Form</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </CardFooter>
                          </Card>
                        </StaggerItem>
                      );
                    })}
                  </StaggerChildren>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
                    <Calendar className="w-8 h-8 text-brand-cyan mx-auto" />
                    <h3 className="font-display font-bold text-lg text-white">
                      No Upcoming Events Found
                    </h3>
                    <p className="text-sm text-slate-300 max-w-sm mx-auto">
                      {selectedCategory === "All"
                        ? "New workshops, hackathons, and sessions will appear here once scheduled. Follow our official channels for announcements."
                        : `No upcoming events found in category "${selectedCategory}".`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PAST EVENTS LIST */}
            {activeTab === "past" && (
              <div className="space-y-6">
                {displayedPast.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedPast.map((event) => (
                      <Card key={event.id} interactive className="flex flex-col opacity-90 hover:opacity-100">
                        {event.posterPath && (
                          <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-t-xl bg-canvas-muted border-b border-border grayscale hover:grayscale-0 transition-all duration-300">
                            <img
                              src={event.posterPath}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge variant="subtle">{event.category}</Badge>
                            </div>
                          </div>
                        )}

                        <CardHeader className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            {!event.posterPath && (
                              <Badge variant="subtle">{event.category}</Badge>
                            )}
                            <Badge variant="subtle">Concluded</Badge>
                          </div>

                          <CardTitle className="text-xl hover:text-brand-lime-dark transition-colors">
                            <Link href={`/events/${event.slug}`}>
                              {event.title}
                            </Link>
                          </CardTitle>

                          <CardDescription>{event.summary}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-2 text-xs font-sans text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>
                              {formatEventDateTimeRange(
                                event.startAt,
                                event.endAt,
                                event.timezone
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </CardContent>

                        <CardFooter className="pt-4 border-t border-border mt-auto">
                          <Link
                            href={`/events/${event.slug}`}
                            className="text-xs font-semibold text-ink-muted hover:text-ink"
                          >
                            Read Event Summary →
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
                    <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                    <h3 className="font-display font-bold text-lg text-white">
                      Event Archive
                    </h3>
                    <p className="text-sm text-slate-300 max-w-sm mx-auto">
                      Past workshops and hackathon sessions will be archived here as events conclude.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
