import React from "react";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
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
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-brand-ice px-3.5 py-1 shadow-subtle">
              <Users className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-xs font-sans font-medium text-brand-navy">
                Student Directory
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
              Student Leadership & Core Team
            </h1>
            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Code2Chill is entirely student-founded and student-led. Our coordinators volunteer their time to organize hands-on coding workshops, lead hackathons, and mentor fellow student developers across campus.
            </p>
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
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-display font-bold text-ink">
                      {group}
                    </h2>
                    <Badge variant="brand" size="sm">
                      {members.length} {members.length === 1 ? "member" : "members"}
                    </Badge>
                  </div>
                  <span className="text-xs text-ink-muted hidden sm:inline-block">
                    Chitkara University
                  </span>
                </div>

                {/* Member Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="rounded-xl border border-border bg-surface p-6 space-y-5 shadow-subtle hover:border-brand-blue/40 hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          {member.photoPath ? (
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-canvas-muted shrink-0 shadow-subtle">
                              <img
                                src={member.photoPath}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-full border border-border bg-canvas-muted flex items-center justify-center text-ink-muted font-display font-bold text-xl shrink-0">
                              {member.name.charAt(0)}
                            </div>
                          )}

                          <div className="space-y-1">
                            <h3 className="font-display font-bold text-lg text-ink leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-xs font-sans text-brand-blue font-semibold leading-normal">
                              {member.designation}
                            </p>
                          </div>
                        </div>

                        {member.bio && (
                          <p className="text-xs text-ink-muted leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      {/* Contact & Social Links */}
                      <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-ink-muted">
                        <span className="text-[11px] font-sans text-ink-faint">Student Developer</span>
                        
                        <div className="flex items-center gap-3">
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:text-brand-blue text-ink-muted transition-colors font-medium"
                              aria-label={`${member.name}'s LinkedIn profile`}
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                              <span className="text-[11px]">LinkedIn</span>
                              <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
                            </a>
                          )}
                          {member.emailPublic && (
                            <a
                              href={`mailto:${member.emailPublic}`}
                              className="inline-flex items-center gap-1 hover:text-brand-blue text-ink-muted transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
