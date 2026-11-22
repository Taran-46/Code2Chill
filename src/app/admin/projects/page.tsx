"use client";

import React, { useState } from "react";
import { FolderGit2, Plus, Lock, Unlock, Eye, Check, X, Shield } from "lucide-react";
import { getMockProjects } from "@/data/mock";
import { ProjectItem } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(getMockProjects());

  const toggleRepoPublic = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isRepoPublic: !p.isRepoPublic } : p
      )
    );
  };

  const togglePublished = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "published" ? "draft" : "published",
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Project Privacy & Showcase Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Manage student software projects, enforce contributor consent, and configure source code repository visibility.
          </p>
        </div>

        <button
          onClick={() => alert("Configure Supabase to enable adding live student projects.")}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-white/8 bg-[#080E1E] overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02] text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Tech Stack</th>
                <th className="py-3.5 px-4">Repo Visibility</th>
                <th className="py-3.5 px-4">Publish Status</th>
                <th className="py-3.5 px-4 text-right">Privacy Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 text-slate-300">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{p.summary}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-white/[0.04] border border-white/8 px-2 py-0.5 text-[11px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {p.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] bg-white/[0.03] px-1.5 py-0.5 rounded text-slate-400 border border-white/6">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleRepoPublic(p.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        p.isRepoPublic
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                      }`}
                    >
                      {p.isRepoPublic ? (
                        <>
                          <Unlock className="w-3 h-3 text-emerald-400" />
                          <span>Public Repo</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Private Repo</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublished(p.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        p.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {p.status === "published" ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[10px] text-slate-400 inline-flex items-center gap-1 bg-white/[0.02] border border-white/6 px-2 py-0.5 rounded">
                      <Shield className="w-3 h-3 text-brand-cyan" />
                      <span>{p.hasRepoConsent ? "Consent OK" : "No Consent"}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
