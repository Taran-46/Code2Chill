import React from "react";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/effects/fade-up";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";
import { getMockTeam } from "@/data/mock";
import { TeamGroup } from "@/types";

export const metadata = {
  title: "Student Leadership & Team",
  description: "Meet the student coordinators and core team leads behind Code2Chill at Chitkara University.",
};

const STUDENT_GROUP_ORDER: TeamGroup[] = [
  "Leadership",
  "Core Leads",
  "Core Team",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function TeamPage() {
  const teamMembers = getMockTeam();

  // Group members strictly by student groups (only non-empty categories)
  const grouped = STUDENT_GROUP_ORDER.map((group) => ({
    group,
    members: teamMembers.filter((m) => m.groupName === group && m.isPublished),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-12">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                <Users className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-sans font-medium text-brand-cyan">
                  Student Team Directory
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Student Leadership & Team
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Code2Chill is entirely student-founded and student-led. Our coordinators volunteer their time to organize workshops, hackathons, and technical sessions at Chitkara University.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Directory by Student Groups */}
      <section>
        <Container>
          <div className="space-y-16">
            {grouped.map(({ group, members }) => (
              <div key={group} className="space-y-8">
                {/* Section Subhead */}
                <ScrollReveal direction="left" distance={24}>
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-display font-bold text-white">
                        {group}
                      </h2>
                      <Badge variant="brand" size="sm">
                        {members.length} {members.length === 1 ? "member" : "members"}
                      </Badge>
                    </div>
                    <span className="text-xs font-sans text-slate-400 hidden sm:inline-block">
                      Chitkara University
                    </span>
                  </div>
                </ScrollReveal>

                {/* Member Cards Grid with Stagger */}
                <StaggerChildren
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  stagger={0.08}
                  distance={28}
                  direction="up"
                >
                  {members.map((member) => (
                    <StaggerItem key={member.id}>
                      <div className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-5 shadow-card hover:border-brand-cyan/40 hover:-translate-y-1 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)] transition-all duration-300 flex flex-col justify-between h-full group">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            {member.photoPath ? (
                              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/12 bg-white/[0.04] shrink-0 shadow-subtle group-hover:border-brand-cyan/50 transition-colors">
                                <img
                                  src={member.photoPath}
                                  alt={member.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-sans font-bold text-base tracking-wider shrink-0 group-hover:border-brand-cyan/60 group-hover:bg-brand-cyan/15 transition-all shadow-subtle">
                                {getInitials(member.name)}
                              </div>
                            )}

                            <div className="space-y-1 flex-1 min-w-0">
                              <h3 className="font-display font-bold text-lg text-white leading-tight group-hover:text-brand-cyan transition-colors truncate">
                                {member.name}
                              </h3>
                              <p className="text-xs font-sans text-brand-cyan font-semibold leading-normal">
                                {member.designation}
                              </p>
                            </div>

                            {/* Verified LinkedIn link */}
                            {member.linkedinUrl && (
                              <a
                                href={member.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} on LinkedIn`}
                                className="p-2 rounded-lg border border-white/8 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 transition-colors shrink-0"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                          </div>

                          {member.bio && (
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {member.bio}
                            </p>
                          )}
                        </div>

                        {/* Student Badge Footer */}
                        <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs text-slate-400">
                          <span className="text-[11px] font-sans text-slate-400 font-medium">Student Coordinator</span>
                          <span className="text-[11px] font-sans text-brand-cyan">Chitkara University</span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            ))}

            {/* Empty State Fallback */}
            {grouped.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
                <Users className="w-8 h-8 text-brand-cyan mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">
                  No Team Profiles Published
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Student profiles will appear here once official details are approved.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Contact & Collaboration Strip */}
      <section className="pt-4">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#070C1B] via-[#0B1530] to-[#070C1B] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-card hover:border-brand-cyan/30 transition-all duration-300">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-white">
                Have questions or want to connect with the team?
              </h3>
              <p className="text-sm text-slate-300">
                Reach out to our student coordinators via official channels.
              </p>
            </div>
            <Link href="/contact">
              <button className="rounded-lg bg-brand-blue text-white px-5 py-2.5 text-xs font-semibold hover:bg-brand-blue-hover transition-colors shrink-0 shadow-subtle flex items-center gap-1.5 font-sans">
                <span>Contact Coordinators</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
