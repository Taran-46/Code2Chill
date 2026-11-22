"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";
import { getMockActiveAnnouncements } from "@/data/mock";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Data-driven announcement banner (only displays if an active announcement exists)
  const activeAnnouncements = getMockActiveAnnouncements();
  const banner = activeAnnouncements.length > 0 ? activeAnnouncements[0] : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/8 bg-[#030712]/85 backdrop-blur-xl transition-colors shadow-subtle">
      {/* Top Announcement Bar (Strictly Data-Driven) */}
      {banner && (
        <div className="bg-[#070B16] text-slate-300 px-4 py-1.5 text-xs font-sans tracking-tight text-center flex items-center justify-center gap-2 border-b border-white/8">
          <span className="inline-flex items-center gap-1.5 bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-sans">
            <Sparkles className="w-3 h-3" /> Announcement
          </span>
          <span className="truncate max-w-xl font-sans font-medium text-slate-300">
            {banner.title}
          </span>
          {banner.targetUrl && (
            <Link
              href={banner.targetUrl}
              className="inline-flex items-center gap-1 font-semibold text-brand-cyan hover:underline ml-1 font-sans"
            >
              <span>{banner.targetLabel || "Details"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}

      {/* Main Navigation Bar */}
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo with official emblem */}
          <Logo showTagline size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-white font-semibold bg-white/[0.08] border border-white/15 shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                  {isActive && <span className="sr-only">(current page)</span>}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button variant="primary" size="sm">
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex lg:hidden items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </header>
  );
}
