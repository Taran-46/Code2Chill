import React from "react";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/effects/fade-up";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";
import { getMockTeam } from "@/data/mock";
import { TeamGroup } from "@/types";

export const metadata = {
  title: "Student Leadership & Team",
  description: "Meet the student coordinators, technical track leads, and core team members behind Code2Chill.",
};

const STUDENT_GROUP_ORDER: TeamGroup[] = [
  "Club Leadership",
  "Technical Leads",
  "Core Team",
];

export default function TeamPage() {
  const teamMembers = getMockTeam();

  // Group members strictly by student groups
  const grouped = STUDENT_GROUP_ORDER.map((group) => ({
    group,
    members: teamMembers.filter((m) => m.groupName === group),
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
                  Student Directory
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Student Leadership & Core Team
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Code2Chill is entirely student-founded and student-led. Our coordinators volunteer their time to organize hands-on coding workshops, lead hackathons, and mentor fellow student developers across campus.
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
                              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/12 bg-white/[0.04] shrink-0 shadow-subtle group-hover:border-brand-cyan/50 transition-colors">
                                <img
                                  src={member.photoPath}
                                  alt={member.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-brand-cyan font-display font-bold text-xl shrink-0 group-hover:border-brand-cyan/50 group-hover:bg-brand-cyan/10 transition-colors">
                                {member.name.charAt(0)}
                              </div>
                            )}

                            <div className="space-y-1">
                              <h3 className="font-display font-bold text-lg text-white leading-tight group-hover:text-brand-cyan transition-colors">
                                {member.name}
                              </h3>
                              <p className="text-xs font-sans text-brand-cyan font-semibold leading-normal">
                                {member.designation}
                              </p>
                            </div>
                          </div>

                          {member.bio && (
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {member.bio}
                            </p>
                          )}
                        </div>

                        {/* Student Badge */}
                        <div className="pt-4 border-t border-white/8 flex items-center justify-between text-xs text-slate-400">
                          <span className="text-[11px] font-sans text-slate-400 font-medium">Student Developer</span>
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
              <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-3">
                <Users className="w-8 h-8 text-ink-muted mx-auto" />
                <h3 className="font-display font-bold text-lg text-ink">
                  No Team Profiles Published
                </h3>
                <p className="text-sm text-ink-muted max-w-sm mx-auto">
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
          <div className="rounded-2xl border border-border bg-brand-ice/50 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-ink">
                Have questions or want to collaborate with our student leads?
              </h3>
              <p className="text-sm text-ink-muted">
                Reach out to our student coordinators or technical track leads directly.
              </p>
            </div>
            <Link href="/contact">
              <button className="rounded-lg bg-brand-navy text-white px-5 py-2.5 text-xs font-semibold hover:bg-brand-slate transition-colors shrink-0 shadow-subtle">
                Contact Coordinators →
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
