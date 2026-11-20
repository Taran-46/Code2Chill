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
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Accordion, AccordionItemData } from "@/components/ui/accordion";
import {
  getMockEvents,
  getMockProjects,
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
      "You can reach out through our Contact page, message us on Instagram, or attend one of our upcoming weekend sessions on campus. Our student leads and mentors are always glad to connect.",
  },
];

export default function HomePage() {
  const settings = getMockSiteSettings();
  const events = getMockEvents();
  const projects = getMockProjects();
  const team = getMockTeam();

  // Find the top featured upcoming event
  const upcomingEvents = events.filter(
    (e) => getEventTemporalStatus(e.startAt, e.endAt) !== "past"
  );
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

  // Curated 2 projects for the homepage
  const selectedProjects = projects.slice(0, 2);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. HERO SECTION (FOCUSED BRAND IDENTITY WITH OFFICIAL LOGO) */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Mission & Identity */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-brand-ice px-3.5 py-1 shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-xs font-sans font-medium text-brand-navy">
                  {settings.university} · Student Technical Club
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-ink leading-[1.08]">
                  Learn. Build. <br />
                  <span className="gradient-text-brand underline decoration-blue-300 decoration-4 underline-offset-8">
                    Connect.
                  </span>
                </h1>
                <p className="editorial-lead text-base sm:text-xl text-ink-muted max-w-xl pt-2">
                  Code2Chill is an active student-driven technical community at Chitkara University. We bring curious minds together to explore modern engineering, build practical software, and collaborate across technical disciplines.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/events">
                  <Button variant="primary" size="lg" className="shadow-subtle">
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

              {/* Sub-meta attributes */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                  Student-Led Community
                </span>
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                  Open to all years & branches
                </span>
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                  Practical code & sprints
                </span>
              </div>
            </div>

            {/* Right Column: Visual Technical Card With Official Logo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-[#070B16] text-white p-6 sm:p-7 shadow-lifted space-y-5 relative overflow-hidden">
                {/* Subtle Navy Gradient Ambient Glow */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top: Official Logo Emblem & Badge */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 aspect-square rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/code2chill-logo-circle.png"
                        alt="Code2Chill Official Emblem"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-white text-base tracking-tight leading-none">
                        Code<span className="text-brand-blue">2</span>Chill
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans">
                        Student Tech Community
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-brand-cyan uppercase">
                    v2.0
                  </span>
                </div>

                {/* Code Snapshot */}
                <div className="font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed space-y-1 relative z-10">
                  <p><span className="text-brand-cyan font-semibold">export const</span> club = &#123;</p>
                  <p className="pl-4">campus: <span className="text-blue-300">&quot;Chitkara University&quot;</span>,</p>
                  <p className="pl-4">community: <span className="text-blue-300">&quot;100% Student-Led&quot;</span>,</p>
                  <p className="pl-4">activities: [</p>
                  <p className="pl-8 text-white">&quot;Hands-on Workshops&quot;,</p>
                  <p className="pl-8 text-white">&quot;Weekend Hackathons&quot;,</p>
                  <p className="pl-8 text-white">&quot;Open Source Sprints&quot;</p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">access: <span className="text-blue-300">&quot;Open to every curious student&quot;</span>,</p>
                  <p>&#125;;</p>
                </div>

                {/* Live Activity Chip */}
                {featuredEvent && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 flex items-center justify-between gap-3 relative z-10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-sans font-semibold text-brand-cyan uppercase tracking-wider block">
                        Upcoming Event
                      </span>
                      <p className="text-xs font-medium text-white truncate max-w-[200px] sm:max-w-[230px]">
                        {featuredEvent.title}
                      </p>
                    </div>
                    <Link
                      href={`/events/${featuredEvent.slug}`}
                      className="text-xs font-semibold text-brand-cyan hover:underline shrink-0"
                    >
                      View →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT CODE2CHILL SECTION */}
      <section className="py-14 border-y border-border bg-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="section-label">Our Philosophy</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
                Built by students, for students.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed">
              <p>
                Code2Chill is an open student community where undergraduates bridge the gap between classroom textbooks and production software engineering.
              </p>
              <p>
                We believe the fastest way to grow as a developer is by writing real code, collaborating on open-source repositories, and learning alongside peers who share the same curiosity.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. WHAT WE DO (COMPACT ACTIVITIES) */}
      <section>
        <Container>
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="section-label">Club Activities</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
                What we do together
              </h2>
              <p className="text-sm text-ink-muted">
                Regular sessions designed to be practical, interactive, and completely beginner-friendly.
              </p>
            </div>

            {/* 4 Compact Visual Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-border bg-surface p-6 space-y-3 shadow-subtle hover:border-brand-blue/40 transition-colors">
                <span className="text-xs font-mono font-semibold text-brand-blue">01</span>
                <h3 className="font-display font-bold text-lg text-ink">Hands-on Workshops</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Interactive sessions on modern web engineering, database architecture, and developer tooling with live code.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6 space-y-3 shadow-subtle hover:border-brand-blue/40 transition-colors">
                <span className="text-xs font-mono font-semibold text-brand-blue">02</span>
                <h3 className="font-display font-bold text-lg text-ink">Hackathons & Sprints</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Weekend hackathons and time-boxed project sprints turning student ideas into deployed applications.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6 space-y-3 shadow-subtle hover:border-brand-blue/40 transition-colors">
                <span className="text-xs font-mono font-semibold text-brand-blue">03</span>
                <h3 className="font-display font-bold text-lg text-ink">Systems & Tech Talks</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Insightful discussions exploring systems design, containerization, cloud infrastructure, and open source.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6 space-y-3 shadow-subtle hover:border-brand-blue/40 transition-colors">
                <span className="text-xs font-mono font-semibold text-brand-blue">04</span>
                <h3 className="font-display font-bold text-lg text-ink">Peer Learning Circles</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Mentoring circles where experienced students help first-years with Git, terminal basics, and code reviews.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. FEATURED UPCOMING EVENT (SHOWS ONLY ONE FEATURED EVENT) */}
      {featuredEvent && (
        <section className="py-14 border-y border-border bg-surface">
          <Container>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="section-label">Next on Schedule</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                    Featured Workshop
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-blue-hover inline-flex items-center gap-1"
                >
                  <span>All Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Single Featured Event Banner */}
              <div className="rounded-2xl border border-border bg-canvas p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand">{featuredEvent.category}</Badge>
                    <StatusBadge
                      type="registration"
                      status={getEventRegistrationState(featuredEvent)}
                    />
                  </div>
                  <span className="text-xs font-mono text-ink-muted">
                    Timezone: {featuredEvent.timezone} (IST)
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-ink">
                    <Link
                      href={`/events/${featuredEvent.slug}`}
                      className="hover:text-brand-blue transition-colors"
                    >
                      {featuredEvent.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
                    {featuredEvent.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-ink pt-2 border-t border-border/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>
                      {formatEventDateTimeRange(
                        featuredEvent.startAt,
                        featuredEvent.endAt,
                        featuredEvent.timezone
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                      >
                        <span>External RSVP Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 5. SELECTED PROJECTS (SHOWS 2 PROJECTS ONLY) */}
      <section>
        <Container>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="section-label">Student Engineering</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                  Selected Member Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-blue-hover inline-flex items-center gap-1"
              >
                <span>Browse all projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle hover:border-brand-blue/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="subtle">{project.category}</Badge>
                      <span className="text-[11px] font-mono text-ink-muted">Open Source</span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-ink">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-brand-blue transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-canvas border border-border text-[11px] font-mono text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-ink hover:text-brand-blue"
                    >
                      View Case Study →
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-ink-muted hover:text-brand-blue inline-flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. SINGLE STUDENT TEAM & COMMUNITY PREVIEW */}
      <section className="py-14 border-y border-border bg-surface">
        <Container>
          <div className="rounded-2xl border border-border bg-brand-ice/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="section-label">Community & Leadership</span>
              <h2 className="text-2xl font-display font-bold text-ink">
                Run by student developers, open to everyone.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
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
        </Container>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="section-label">Answers</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-ink-muted">
                Everything you need to know about participating in Code2Chill.
              </p>
            </div>

            <Accordion items={HOMEPAGE_FAQS} defaultOpenId="faq-1" />
          </div>
        </Container>
      </section>

      {/* 8. FINAL CONTACT CTA */}
      <section>
        <Container>
          <div className="rounded-2xl border border-slate-800 bg-[#070B16] text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lifted relative overflow-hidden">
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
                <Button variant="secondary" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
