import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Terminal,
  Linkedin,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Accordion, AccordionItemData } from "@/components/ui/accordion";
import { BackgroundGrid } from "@/components/effects/background-grid";
import { TiltCard } from "@/components/effects/tilt-card";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { InfiniteMarquee } from "@/components/effects/infinite-marquee";
import { InteractiveTerminal } from "@/components/hero/interactive-terminal";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";
import { FadeUp } from "@/components/effects/fade-up";
import {
  getMockEvents,
  getMockTeam,
  getMockSiteSettings,
} from "@/data/mock";
import { formatEventDateTimeRange } from "@/lib/utils/dates";
import { getEventTemporalStatus, getEventRegistrationState } from "@/lib/utils/event-status";

const HOMEPAGE_FAQS: AccordionItemData[] = [
  {
    id: "faq-1",
    question: "Who can participate in Code2Chill workshops?",
    answer:
      "All students enrolled at Chitkara University across any year, branch, or engineering stream are welcome. You do not need to be a Computer Science major to attend our sessions.",
  },
  {
    id: "faq-2",
    question: "Do I need prior programming experience to attend?",
    answer:
      "Not at all. We host foundational jumpstarts (such as Git basics, terminal navigation, and web fundamentals) specifically tailored for newcomers, alongside advanced masterclasses on systems architecture and cloud deployments.",
  },
  {
    id: "faq-3",
    question: "Are Code2Chill sessions and events free?",
    answer:
      "Yes. All official club workshops, hackathons, guest talks, and peer study circles are free of charge for university students.",
  },
  {
    id: "faq-4",
    question: "How can I collaborate on a project or connect with the student leads?",
    answer:
      "You can reach out through our Contact page, connect with us on Instagram or LinkedIn, or attend one of our upcoming club sessions on campus. Our student leads and mentors are always glad to connect.",
  },
];

export default function HomePage() {
  const settings = getMockSiteSettings();
  const events = getMockEvents();
  const team = getMockTeam();

  // Find the top featured upcoming event
  const upcomingEvents = events.filter(
    (e) => getEventTemporalStatus(e.startAt, e.endAt) !== "past"
  );
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

  return (
    <div className="pb-20 relative overflow-hidden">
      {/* Background Coordinate Grid & Glow (NODDAL inspired) */}
      <BackgroundGrid />

      <div className="space-y-14 sm:space-y-20 relative z-10">
        {/* 1. HERO SECTION (FOCUSED BRAND IDENTITY WITH OFFICIAL LOGO) */}
        <section className="relative pt-2 sm:pt-4">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Mission & Identity */}
              <div className="lg:col-span-7 space-y-6">
                <FadeUp delay={0.1}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span className="text-xs font-sans font-medium text-brand-cyan">
                      {settings.university} · Student Technical Club
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.22} className="space-y-3">
                  <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                    Learn. Build. <br />
                    <span className="gradient-text-brand">
                      Connect.
                    </span>
                  </h1>
                  <p className="editorial-lead text-base sm:text-xl text-slate-300 max-w-xl pt-2">
                    Code2Chill is an active student-driven technical community at Chitkara University. We bring curious minds together to explore modern engineering, build practical software, and collaborate across technical disciplines.
                  </p>
                </FadeUp>

                {/* Primary CTAs */}
                <FadeUp delay={0.38}>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href="/events">
                      <Button variant="primary" size="lg">
                        <span>Explore Upcoming Events</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="secondary" size="lg">
                        <span>Connect With Us</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </FadeUp>

                {/* Sub-meta attributes */}
                <FadeUp delay={0.5}>
                  <div className="pt-6 border-t border-white/8 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                      Student-Led Community
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                      Open to all years & branches
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                      Practical code & sprints
                    </span>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: 3D Tilt Interactive Terminal (NODDAL & Ksen Panchenko inspired) */}
              <FadeUp delay={0.3} distance={40} className="lg:col-span-5">
                <TiltCard maxTilt={8}>
                  <InteractiveTerminal featuredEvent={featuredEvent} />
                </TiltCard>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Live Running Ticker (Continuous Ticker Bar) */}
        <InfiniteMarquee />

        {/* 2. ABOUT CODE2CHILL SECTION */}
        <section className="py-16 border-y border-white/8 bg-[#050A17] relative overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left column slides in from the left */}
              <ScrollReveal direction="left" delay={0} className="lg:col-span-5 space-y-3">
                <span className="section-label">01 // Our Philosophy</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Built by students, for students.
                </h2>
              </ScrollReveal>

              {/* Right column slides in from the right, slightly delayed */}
              <ScrollReveal direction="right" delay={0.12} className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Code2Chill is an open student community where undergraduates bridge the gap between classroom textbooks and production software engineering.
                </p>
                <p>
                  We believe the fastest way to grow as a developer is by writing real code, collaborating on open-source repositories, and learning alongside peers who share the same curiosity.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* 3. WHAT WE DO (COMPACT ACTIVITIES WITH MOUSE-SPOTLIGHT CARDS) */}
        <section>
          <Container>
            <div className="space-y-8">
              <ScrollReveal direction="up" distance={28} className="max-w-2xl space-y-2">
                <span className="section-label">02 // Club Activities</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  What we do together
                </h2>
                <p className="text-sm text-slate-400">
                  Regular sessions designed to be practical, interactive, and completely beginner-friendly.
                </p>
              </ScrollReveal>

              {/* 4 Interactive Spotlight Cards — staggered from bottom */}
              <StaggerChildren
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                direction="up"
                distance={36}
                stagger={0.09}
                delay={0.05}
                threshold={0.08}
              >
                <StaggerItem>
                  <SpotlightCard className="space-y-3 hover:-translate-y-1 h-full">
                    <span className="text-xs font-sans font-semibold tracking-wide text-brand-cyan">01 //</span>
                    <h3 className="font-display font-bold text-lg text-white">Hands-on Workshops</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Interactive sessions on modern web engineering, database architecture, and developer tooling with live code.
                    </p>
                  </SpotlightCard>
                </StaggerItem>

                <StaggerItem>
                  <SpotlightCard className="space-y-3 hover:-translate-y-1 h-full">
                    <span className="text-xs font-sans font-semibold tracking-wide text-brand-cyan">02 //</span>
                    <h3 className="font-display font-bold text-lg text-white">Hackathons & Sprints</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hackathons and time-boxed project sprints where students turn ideas into working applications.
                    </p>
                  </SpotlightCard>
                </StaggerItem>

                <StaggerItem>
                  <SpotlightCard className="space-y-3 hover:-translate-y-1 h-full">
                    <span className="text-xs font-sans font-semibold tracking-wide text-brand-cyan">03 //</span>
                    <h3 className="font-display font-bold text-lg text-white">Systems & Tech Talks</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Insightful discussions exploring systems design, containerization, cloud infrastructure, and open source.
                    </p>
                  </SpotlightCard>
                </StaggerItem>

                <StaggerItem>
                  <SpotlightCard className="space-y-3 hover:-translate-y-1 h-full">
                    <span className="text-xs font-sans font-semibold tracking-wide text-brand-cyan">04 //</span>
                    <h3 className="font-display font-bold text-lg text-white">Peer Learning Circles</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Mentoring circles where experienced students help first-years with Git, terminal basics, and code reviews.
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              </StaggerChildren>
            </div>
          </Container>
        </section>

        {/* 4. FEATURED UPCOMING EVENT (SHOWS ONLY ONE FEATURED EVENT) */}
        {featuredEvent && (
          <section className="py-16 border-y border-white/8 bg-[#050A17] relative">
            <Container>
              <div className="space-y-6">
                <ScrollReveal direction="left" distance={32} className="flex items-center justify-between">
                  <div>
                    <span className="section-label">03 // Next on Schedule</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                      Featured Workshop
                    </h2>
                  </div>
                  <Link
                    href="/events"
                    className="text-xs sm:text-sm font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1 font-sans"
                  >
                    <span>All Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ScrollReveal>

                {/* Single Featured Event Spotlight Banner — slides up */}
                <ScrollReveal direction="up" distance={28} delay={0.1}>
                  <SpotlightCard className="p-6 sm:p-8 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="brand">{featuredEvent.category}</Badge>
                        <StatusBadge
                          type="registration"
                          status={getEventRegistrationState(featuredEvent)}
                        />
                      </div>
                      <span className="text-xs font-sans text-slate-400">
                        Timezone: {featuredEvent.timezone} (IST)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                        <Link
                          href={`/events/${featuredEvent.slug}`}
                          className="hover:text-brand-cyan transition-colors"
                        >
                          {featuredEvent.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {featuredEvent.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-300 pt-2 border-t border-white/8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>
                          {formatEventDateTimeRange(
                            featuredEvent.startAt,
                            featuredEvent.endAt,
                            featuredEvent.timezone
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span className="truncate">{featuredEvent.venue}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <Link href={`/events/${featuredEvent.slug}`}>
                        <Button variant="default">
                          <span>View Session Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>

                      {featuredEvent.registrationUrl &&
                        getEventRegistrationState(featuredEvent) === "open" && (
                          <a
                            href={featuredEvent.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-brand-cyan hover:underline"
                          >
                            <span>External RSVP Form</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              </div>
            </Container>
          </section>
        )}

        {/* 4. SINGLE STUDENT TEAM & COMMUNITY PREVIEW */}
        <section className="py-16 border-y border-white/8 bg-[#050A17] relative overflow-hidden">
          <Container>
            <ScrollReveal direction="up" distance={30}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#070C1B] via-[#0B1530] to-[#070C1B] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card hover:border-brand-cyan/30 transition-all duration-300">
                <div className="space-y-2 max-w-xl">
                  <span className="section-label">04 // Community & Leadership</span>
                  <h2 className="text-2xl font-display font-bold text-white">
                    Run by student developers, open to everyone.
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Meet the student coordinators and track leads who volunteer their time to organize workshops, curate peer code reviews, and build our technical community at Chitkara University.
                  </p>
                </div>
                <Link href="/team" className="shrink-0">
                  <Button variant="default">
                    <span>View Student Leadership & Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
        <section>
          <Container>
            <div className="max-w-3xl mx-auto space-y-6">
              <ScrollReveal direction="up" distance={24} className="text-center space-y-2">
                <span className="section-label">05 // Answers</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-400">
                  Everything you need to know about participating in Code2Chill.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={28} delay={0.1}>
                <Accordion items={HOMEPAGE_FAQS} defaultOpenId="faq-1" />
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* 8. FINAL CONTACT CTA */}
        <section>
          <Container>
            <ScrollReveal direction="up" distance={32}>
              <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-[#080E1E] via-[#0B1530] to-[#030712] text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lifted relative overflow-hidden group">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-colors duration-700" />
                <div className="space-y-2 max-w-xl relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Have a question or want to collaborate?
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Reach out to our student coordinators for workshop details, project collaboration, or general technical inquiries.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
                  <Link href="/contact">
                    <Button variant="primary">
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact Us</span>
                    </Button>
                  </Link>
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="bg-white/[0.08] text-white border-white/12 hover:bg-white/[0.14]">
                      <span>Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" className="bg-white/[0.08] text-white border-white/12 hover:bg-white/[0.14]">
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </div>
    </div>
  );
}
