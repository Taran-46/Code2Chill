import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Users,
  Code2,
  Calendar,
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

  return (
    <div className="py-12 sm:py-20 space-y-12">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{project.category}</Badge>
              {project.featured && <Badge variant="subtle">Featured Project</Badge>}
            </div>
            <span className="text-xs font-mono text-ink-muted">Published Member Project</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="editorial-lead text-base sm:text-xl text-ink-muted max-w-3xl">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default">
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </Button>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
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
          <div className="lg:col-span-8 space-y-10">
            {project.coverPath && (
              <div className="rounded-xl overflow-hidden border border-border bg-canvas-muted max-h-[440px]">
                <img
                  src={project.coverPath}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-6">
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
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink-muted">
                <Code2 className="w-4 h-4 text-brand-lime-dark" />
                <span>Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-canvas border border-border text-xs font-mono text-ink font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contributors Card */}
            {project.contributors && project.contributors.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink-muted">
                  <Users className="w-4 h-4 text-brand-lime-dark" />
                  <span>Project Contributors</span>
                </div>
                <div className="space-y-3">
                  {project.contributors.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg bg-canvas p-3 text-xs font-mono space-y-0.5 border border-border"
                    >
                      <p className="font-semibold text-ink">{c.contributorName}</p>
                      {c.role && <p className="text-ink-muted">{c.role}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
