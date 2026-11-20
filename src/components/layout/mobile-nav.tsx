"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, Instagram, Github, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const pathname = usePathname();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-canvas border-l border-border p-6 shadow-lifted">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-muted hover:bg-canvas-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-6" aria-label="Mobile Navigation Links">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-surface font-semibold text-ink shadow-subtle border border-border/80"
                        : "text-ink-muted hover:bg-canvas-muted hover:text-ink"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive ? "text-brand-lime-dark translate-x-1" : "opacity-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer info & CTA */}
        <div className="pt-6 border-t border-border space-y-4">
          <Link href="/contact" onClick={onClose} className="w-full block">
            <Button variant="primary" className="w-full justify-between">
              <span>Contact & Connect</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <div className="flex items-center justify-between pt-2 text-ink-muted">
            <span className="text-xs">Chitkara University</span>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/code2chill"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded hover:text-ink hover:bg-canvas-muted"
                aria-label="Code2Chill Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/code2chill"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded hover:text-ink hover:bg-canvas-muted"
                aria-label="Code2Chill GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
