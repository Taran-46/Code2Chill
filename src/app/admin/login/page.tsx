"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, ArrowLeft, Shield, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/status";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  const handleEnterDemo = () => {
    // Set local demonstration session cookie
    document.cookie = "c2c_demo_session=authenticated; path=/; max-age=86400; SameSite=Lax";
    router.push(nextUrl);
    router.refresh();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!configured) {
      // In demo mode, log in directly as local demo coordinator
      handleEnterDemo();
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Failed to initialize Supabase client.");
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid coordinator credentials.");
        setSubmitting(false);
        return;
      }

      if (data?.user) {
        router.push(nextUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred during login."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 relative z-10">
      {/* Back to Site Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-sans"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
        <span className="text-[11px] font-sans text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded">
          {configured ? "Live Supabase Portal" : "Local Demo Mode"}
        </span>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-[#080E1E] p-8 space-y-6 shadow-lifted">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border border-white/15 shadow-[0_0_20px_-3px_rgba(56,189,248,0.35)]">
            <Image
              src="/images/code2chill-logo-circle.png"
              alt="Code2Chill Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Coordinator Portal
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Code2Chill · Student Technical Club Administration
            </p>
          </div>
        </div>

        {/* Local Demo Mode Quick Access Banner */}
        {!configured && (
          <div className="rounded-xl border border-brand-cyan/30 bg-brand-cyan/[0.06] p-4 space-y-3 text-xs font-sans">
            <div className="flex items-center gap-2 text-brand-cyan font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Demonstration Mode Active</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Supabase is not configured yet. You can explore and demonstrate the full coordinator dashboard using safe local storage.
            </p>
            <button
              type="button"
              onClick={handleEnterDemo}
              className="w-full rounded-lg bg-brand-cyan hover:bg-brand-cyan/90 text-[#030712] py-2 px-3 text-xs font-bold font-sans transition-colors flex items-center justify-center gap-1.5 shadow-subtle"
            >
              <span>Enter Coordinator Dashboard (Demo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-xs text-rose-300 font-sans">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="block text-xs font-sans font-medium text-slate-300"
            >
              Coordinator Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coordinator@chitkara.edu.in"
              required={configured}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-sans font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required={configured}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white py-2.5 text-xs font-semibold font-sans transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <>
                <span>{configured ? "Sign In as Coordinator" : "Sign In (Local Demo)"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <div className="pt-4 border-t border-white/8 text-center text-[11px] text-slate-500 font-sans">
          Protected under Role-Based Access Control and Row Level Security.
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#030712] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-white text-xs font-sans">Loading coordinator portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
