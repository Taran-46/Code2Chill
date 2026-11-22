"use client";

import React, { useState } from "react";
import { Settings, Shield, Instagram, Linkedin, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { getMockSiteSettings } from "@/data/mock";
import { isSupabaseConfigured } from "@/lib/supabase/status";

export default function AdminSettingsPage() {
  const settings = getMockSiteSettings();
  const configured = isSupabaseConfigured();

  const [instagram, setInstagram] = useState(settings.instagramUrl);
  const [linkedin, setLinkedin] = useState(settings.linkedinUrl);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Website & Security Settings
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Manage confirmed social channels, coordinator credentials, and Supabase integration parameters.
          </p>
        </div>
      </div>

      {/* Social Settings */}
      <div className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-6 shadow-card">
        <div>
          <h2 className="font-display font-bold text-base text-white">
            Confirmed Social Channels
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            These links appear in the header, footer, contact page, and empty states.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-sans font-medium text-slate-300">
              <Instagram className="w-4 h-4 text-brand-cyan" />
              <span>Official Instagram URL</span>
            </label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-sans text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-sans font-medium text-slate-300">
              <Linkedin className="w-4 h-4 text-brand-cyan" />
              <span>Official LinkedIn URL</span>
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-sans text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle"
            >
              Save Settings
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-sans">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved locally</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-brand-cyan" />
            <h2 className="font-display font-bold text-base text-white">
              Database Configuration
            </h2>
          </div>
          {configured ? (
            <span className="text-xs text-emerald-400 font-sans bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Connected
            </span>
          ) : (
            <span className="text-xs text-amber-400 font-sans bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              Awaiting Credentials
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          {configured
            ? "Your Supabase project is active. Tables, Row Level Security, and Storage policies are enforced by PostgreSQL."
            : "To connect live Supabase PostgreSQL and Storage, copy .env.example to .env.local and add your Supabase project URL and keys."}
        </p>

        <div className="rounded-lg bg-black/40 border border-white/6 p-4 text-xs font-mono text-slate-300 space-y-1">
          <p className="text-slate-500"># Required environment variables in .env.local</p>
          <p>NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...</p>
          <p>SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... (Server-only)</p>
        </div>
      </div>

      {/* Super Admin Bootstrap Instructions */}
      <div className="rounded-xl border border-white/8 bg-[#080E1E] p-6 space-y-3 shadow-card">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-cyan" />
          <h3 className="font-display font-bold text-sm text-white">
            Super Admin Provisioning
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Public signup is permanently disabled for security. First-time coordinator accounts must be created in the Supabase Auth dashboard, and assigned the <code className="text-brand-cyan bg-black/40 px-1 py-0.5 rounded">super_admin</code> role in the <code className="text-brand-cyan bg-black/40 px-1 py-0.5 rounded">admin_memberships</code> table via the Supabase SQL editor.
        </p>
      </div>
    </div>
  );
}
