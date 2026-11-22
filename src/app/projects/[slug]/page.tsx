import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Users,
  Code2,
  Lock,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMockProjectBySlug, getMockProjects } from "@/data/mock";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const projects = getMockProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = getMockProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Code2Chill`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getMockProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Repository visibility rule: only render if link exists AND isRepoPublic AND hasRepoConsent
  const canDisplayRepo = Boolean(
    project.githubUrl && project.isRepoPublic && project.hasRepoConsent
  );

  return (
    <div className="py-12 sm:py-20 space-y-12">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-6 sm:p-10 shadow-lifted space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{project.category}</Badge>
              {project.featured && <Badge variant="subtle">Featured Project</Badge>}
            </div>
            <span className="text-xs text-slate-400">Published Student Project</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="editorial-lead text-base sm:text-xl text-slate-300 max-w-3xl">
            {project.summary}
          </p>

          {/* Action Links & Privacy Indicator */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {canDisplayRepo && project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default">
                  <Github className="w-4 h-4" />
                  <span>View Approved Repository</span>
                </Button>
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Source code is private to project contributors</span>
              </div>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Demo</span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Two-Column Layout: Details + Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-8">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            {project.coverPath && (
              <div className="rounded-xl overflow-hidden border border-border bg-canvas-muted max-h-[440px]">
                <img
                  src={project.coverPath}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Problem Solved Section */}
            {project.problemSolved && (
              <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/[0.04] p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Problem It Solves</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {/* Overview */}
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-display font-bold text-ink">
                Project Overview & Architecture
              </h2>
              <div className="prose prose-neutral max-w-none text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Card */}
            <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle">
              <div className="flex items-center gap-2 text-xs uppercase text-ink-muted font-medium">
                <Code2 className="w-4 h-4 text-brand-lime-dark" />
                <span>Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-canvas border border-border text-xs text-ink font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contributors Card */}
            {project.contributors && project.contributors.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle">
                <div className="flex items-center gap-2 text-xs uppercase text-ink-muted font-medium">
                  <Users className="w-4 h-4 text-brand-lime-dark" />
                  <span>Project Contributors</span>
                </div>
                <div className="space-y-3">
                  {project.contributors.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg bg-canvas p-3 text-xs space-y-0.5 border border-border"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-ink">{c.contributorName}</p>
                        {c.hasConsent && (
                          <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Consented</span>
                          </span>
                        )}
                      </div>
                      {c.role && <p className="text-ink-muted">{c.role}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="rounded-xl border border-border bg-surface p-5 space-y-2 text-xs text-ink-muted">
              <p className="font-semibold text-ink">Student Ownership & Privacy</p>
              <p className="leading-relaxed">
                Code2Chill showcases member projects with explicit consent. Repository links are private by default and only published with contributor authorization.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
