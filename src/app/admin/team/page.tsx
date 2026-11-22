"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Check, X, Linkedin, Edit, Trash2 } from "lucide-react";
import { getAllMockTeam, saveDemoTeam } from "@/data/mock";
import { TeamMember } from "@/types";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newName, setNewName] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newGroup, setNewGroup] = useState<"Leadership" | "Core Leads" | "Core Team">("Core Leads");
  const [newBio, setNewBio] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");

  useEffect(() => {
    setTeam(getAllMockTeam());
  }, []);

  const togglePublished = (id: string) => {
    const updated = team.map((m) =>
      m.id === id ? { ...m, isPublished: !m.isPublished } : m
    );
    setTeam(updated);
    saveDemoTeam(updated);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDesignation) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      designation: newDesignation,
      groupName: newGroup,
      bio: newBio || undefined,
      linkedinUrl: newLinkedin || undefined,
      displayOrder: team.length + 1,
      isPublished: true,
      createdAt: new Date().toISOString(),
    };

    const updated = [...team, newMember];
    setTeam(updated);
    saveDemoTeam(updated);

    // Reset & close
    setNewName("");
    setNewDesignation("");
    setNewBio("");
    setNewLinkedin("");
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove ${name} from demo team directory?`)) {
      const updated = team.filter((m) => m.id !== id);
      setTeam(updated);
      saveDemoTeam(updated);
    }
  };

  const filtered = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Team Member Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Manage student coordinators, designations, ordering, and public directory visibility. Changes persist locally.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Filter and Table */}
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by student name or designation..."
          className="w-full sm:max-w-xs rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-sans text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        />

        {/* Members Table */}
        <div className="rounded-xl border border-white/8 bg-[#080E1E] overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Name & Designation</th>
                  <th className="py-3.5 px-4">Group</th>
                  <th className="py-3.5 px-4">LinkedIn Profile</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 text-slate-300">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">
                      #{member.displayOrder}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{member.name}</div>
                      <div className="text-[11px] text-brand-cyan">{member.designation}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-white/[0.04] border border-white/8 px-2 py-0.5 text-[11px] text-slate-300">
                        {member.groupName}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {member.linkedinUrl ? (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-cyan transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[150px]">{member.linkedinUrl.replace('https://www.linkedin.com/in/', '')}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => togglePublished(member.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          member.isPublished
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {member.isPublished ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3" />
                            <span>Unpublished</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(member.id, member.name)}
                        className="p-1.5 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-6 max-w-md w-full space-y-4 shadow-lifted">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <h3 className="font-display font-bold text-base text-white">Add Team Member (Demo)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3.5 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  placeholder="e.g. Navjot Singh"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Designation / Role</label>
                <input
                  type="text"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  required
                  placeholder="e.g. AI & ML Track Lead"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Category Group</label>
                <select
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value as any)}
                  className="w-full rounded-lg border border-white/10 bg-[#070D1B] px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                >
                  <option value="Leadership">Leadership</option>
                  <option value="Core Leads">Core Leads</option>
                  <option value="Core Team">Core Team</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={newLinkedin}
                  onChange={(e) => setNewLinkedin(e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Short Bio</label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows={2}
                  placeholder="Passionate about..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
