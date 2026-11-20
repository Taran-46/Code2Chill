"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getMockProjects } from "@/data/mock";

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
    <div className="py-12 sm:py-20 space-y-12">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 shadow-subtle">
              <Code2 className="w-3.5 h-3.5 text-brand-lime-dark" />
              <span className="text-xs font-mono font-medium text-ink">
                Member Showcase
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
              Student Projects & Open Source
            </h1>
            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Explore software applications, developer utilities, and libraries built or maintained by Code2Chill club members.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Grid */}
      <section>
        <Container>
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex items-center gap-2 border-b border-border pb-4 overflow-x-auto">
              <span className="text-xs font-mono text-ink-muted mr-1 hidden sm:inline">
                Category:
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

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project) => (
                  <Card key={project.id} interactive className="flex flex-col">
                    {project.coverPath && (
                      <div className="h-44 sm:h-52 w-full overflow-hidden rounded-t-xl bg-canvas-muted border-b border-border">
                        <img
                          src={project.coverPath}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}

                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="subtle">{project.category}</Badge>
                        {project.featured && <Badge variant="brand">Featured</Badge>}
                      </div>

                      <CardTitle className="text-xl hover:text-brand-lime-dark transition-colors">
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
                            className="px-2 py-0.5 rounded bg-canvas border border-border text-[11px] font-mono text-ink-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Contributors snippet */}
                      {project.contributors && project.contributors.length > 0 && (
                        <div className="text-[11px] font-mono text-ink-muted">
                          <span>Contributors: </span>
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
                          className="text-xs font-semibold text-ink hover:text-brand-lime-dark"
                        >
                          View Details →
                        </Link>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-canvas text-ink-muted hover:text-ink"
                              aria-label="GitHub Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-canvas text-ink-muted hover:text-ink"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
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
