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
    <div className="py-12 sm:py-20 space-y-12">
      {/* Page Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 shadow-subtle">
              <Calendar className="w-3.5 h-3.5 text-brand-lime-dark" />
              <span className="text-xs font-mono font-medium text-ink">
                Club Schedule & Archive
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
              Events & Workshops
            </h1>
            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Explore upcoming coding sessions, hackathons, and technical talks. All event dates and deadlines are rendered in Indian Standard Time (Asia/Kolkata).
            </p>
          </div>
        </Container>
      </section>

      {/* Main Tabs and Category Filter */}
      <section>
        <Container>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
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
                <span className="text-xs font-mono text-ink-muted mr-1 hidden md:inline">
                  Filter:
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-ink text-surface font-semibold shadow-subtle"
                        : "bg-surface border border-border text-ink-muted hover:text-ink hover:bg-canvas-muted"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedUpcoming.map((event) => {
                      const regState = getEventRegistrationState(event);

                      return (
                        <Card key={event.id} interactive className="flex flex-col">
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

                            <CardTitle className="text-xl hover:text-brand-lime-dark transition-colors">
                              <Link href={`/events/${event.slug}`}>
                                {event.title}
                              </Link>
                            </CardTitle>

                            <CardDescription>{event.summary}</CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-2 text-xs font-mono text-ink-muted">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-brand-lime-dark shrink-0" />
                              <span>
                                {formatEventDateTimeRange(
                                  event.startAt,
                                  event.endAt,
                                  event.timezone
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-brand-lime-dark shrink-0" />
                              <span className="truncate">{event.venue}</span>
                            </div>
                          </CardContent>

                          <CardFooter className="pt-4 border-t border-border mt-auto">
                            <div className="flex items-center justify-between w-full">
                              <Link
                                href={`/events/${event.slug}`}
                                className="text-xs font-semibold text-ink hover:text-brand-lime-dark"
                              >
                                View Agenda & Rules →
                              </Link>

                              {event.registrationUrl && regState === "open" && (
                                <a
                                  href={event.registrationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-lime-dark hover:underline"
                                >
                                  <span>RSVP Form</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-3">
                    <Calendar className="w-8 h-8 text-ink-muted mx-auto" />
                    <h3 className="font-display font-bold text-lg text-ink">
                      No Upcoming Events Found
                    </h3>
                    <p className="text-sm text-ink-muted max-w-sm mx-auto">
                      {selectedCategory === "All"
                        ? "We are currently planning the next workshops. Stay tuned for announcements!"
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

                        <CardContent className="space-y-2 text-xs font-mono text-ink-muted">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-ink-muted shrink-0" />
                            <span>
                              {formatEventDateTimeRange(
                                event.startAt,
                                event.endAt,
                                event.timezone
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-ink-muted shrink-0" />
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
                  <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-3">
                    <Calendar className="w-8 h-8 text-ink-muted mx-auto" />
                    <h3 className="font-display font-bold text-lg text-ink">
                      No Past Events Found
                    </h3>
                    <p className="text-sm text-ink-muted max-w-sm mx-auto">
                      No archived events found matching this filter.
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
