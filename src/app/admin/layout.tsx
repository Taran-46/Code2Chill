"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FolderGit2,
  Images,
  BellRing,
  Inbox,
  Settings,
  LogOut,
  ArrowUpRight,
  Shield,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/status";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Gallery Albums", href: "/admin/gallery", icon: Images },
  { label: "Announcements", href: "/admin/announcements", icon: BellRing },
  { label: "Contact Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  // All hooks must be called before any conditional return (Rules of Hooks)
  useEffect(() => {
    if (configured) {
      const supabase = createClient();
      if (supabase) {
        supabase.auth.getUser().then(({ data }) => {
          if (data?.user) {
            setUserEmail(data.user.email ?? "coordinator");
          }
        });
      }
    } else {
      setUserEmail("demo.coordinator@code2chill.local");
    }
  }, [configured]);

  const handleSignOut = async () => {
    // Clear demo session cookie
    document.cookie = "c2c_demo_session=; path=/; max-age=0;";
    if (configured) {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    router.push("/admin/login");
    router.refresh();
  };

  // Don't show the dashboard shell on the login page (checked after all hooks)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between border-b border-white/8 bg-[#070B16] px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
            <Image
              src="/images/code2chill-logo-circle.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-white text-sm">
            Coordinator Portal
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg border border-white/10"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 border-r border-white/8 bg-[#070B16] flex flex-col justify-between p-4 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Logo Brand Anchor */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-brand-cyan/30 shadow-[0_0_15px_-3px_rgba(56,189,248,0.35)]">
              <Image
                src="/images/code2chill-logo-circle.png"
                alt="Code2Chill Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-display font-extrabold text-white text-sm tracking-tight leading-none">
                Code<span className="text-brand-cyan">2</span>Chill
              </div>
              <span className="text-[11px] text-slate-400 font-sans">
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* Mode Pill */}
          {!configured && (
            <div className="mx-2 px-2.5 py-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-[11px] font-sans text-brand-cyan flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Local Demonstration Mode</span>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                    active
                      ? "bg-brand-blue text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with User & Logout */}
        <div className="pt-4 border-t border-white/8 space-y-3">
          <div className="px-2 py-1 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-sans text-brand-cyan">
              <Shield className="w-3.5 h-3.5" />
              <span>{configured ? "Verified Coordinator" : "Demo Coordinator"}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans truncate">
              {userEmail}
            </p>
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <span>View Public Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-sans text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
