"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  ExternalLink,
  Github,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getMockProjects } from "@/data/mock";
import { FadeUp } from "@/components/effects/fade-up";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";

const CATEGORIES = ["All", "Web Application", "Productivity", "Utility"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const projects = getMockProjects();

  const filtered =
    selectedCategory === "All"
      ? projects
      : projects.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-8">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-medium text-brand-cyan">
                  Student Showcase
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Student Projects & Work
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Explore practical software, utilities, and applications built by Code2Chill club members with student privacy and consent at the core.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Filter and Grid */}
      <section>
        <Container>
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex items-center gap-2 border-b border-white/8 pb-4 overflow-x-auto">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">
                Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs transition-colors whitespace-nowrap ${selectedCategory === cat
                    ? "bg-brand-blue text-white font-semibold shadow-subtle border border-blue-400/30"
                    : "bg-white/[0.04] border border-white/8 text-slate-400 hover:text-white hover:bg-white/[0.08]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <StaggerChildren
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                stagger={0.09}
                distance={28}
              >
                {filtered.map((project) => (
                  <StaggerItem key={project.id}>
                    <Card interactive className="flex flex-col h-full hover:border-brand-cyan/40 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.2)] transition-all duration-300">
                      {project.coverPath && (
                        <div className="h-44 sm:h-52 w-full overflow-hidden rounded-t-xl bg-canvas-muted border-b border-border">
                          <img
                            src={project.coverPath}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}

                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="subtle">{project.category}</Badge>
                          {project.featured && <Badge variant="brand">Featured</Badge>}
                        </div>

                        <CardTitle className="text-xl hover:text-brand-cyan transition-colors">
                          <Link href={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        </CardTitle>

                        <CardDescription>{project.summary}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-canvas border border-border text-[11px] text-ink-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Contributors snippet with privacy consent */}
                        {project.contributors && project.contributors.length > 0 && (
                          <div className="text-[11px] text-ink-muted flex items-center gap-1.5">
                            <span>Contributors:</span>
                            <span className="text-ink font-medium">
                              {project.contributors.map((c) => c.contributorName).join(", ")}
                            </span>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="pt-4 border-t border-border mt-auto">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-xs font-semibold text-ink hover:text-brand-cyan transition-colors"
                          >
                            View Details →
                          </Link>

                          <div className="flex items-center gap-2">
                            {/* Only show GitHub if explicitly approved and made public */}
                            {project.githubUrl && project.isRepoPublic && project.hasRepoConsent && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-canvas text-ink-muted hover:text-brand-cyan transition-colors"
                                aria-label="GitHub Repository"
                                title="Public Repository (Approved)"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-canvas text-ink-muted hover:text-brand-cyan transition-colors"
                                aria-label="Live Demo"
                                title="Live Demo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-3">
                <Code2 className="w-8 h-8 text-ink-muted mx-auto" />
                <h3 className="font-display font-bold text-lg text-ink">
                  No Projects in this Category
                </h3>
                <p className="text-sm text-ink-muted max-w-sm mx-auto">
                  Select another category or view all projects.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
