"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Palette,
  Type,
  Code2,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog } from "@/components/ui/dialog";

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <section>
        <Container>
          <div className="max-w-3xl space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-brand-ice px-3 py-1 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="text-xs font-sans font-medium text-brand-navy">
                Official Logo Brand System
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-ink leading-[1.1]">
              Code<span className="text-brand-blue">2</span>Chill Design Tokens & UI Library
            </h1>

            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Reference catalog for color tokens derived directly from the official circular emblem, featuring deep midnight navy, cerulean electric blue gradients, and clean slate surfaces.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setModalOpen(true)}
              >
                <span>Preview Component Dialog</span>
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 1. Official Logo Color Tokens */}
      <section id="tokens" className="py-12 border-y border-border bg-surface">
        <Container>
          <div className="space-y-10">
            <div>
              <span className="section-label">Palette Definition</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                Official Logo Color Spectrum
              </h2>
              <p className="text-sm text-ink-muted mt-1">
                Derived directly from the official emblem: deep midnight navy, electric blue metallic gradient, and clean slate backgrounds.
              </p>
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="rounded-xl border border-border p-4 bg-canvas space-y-2">
                <div className="h-12 rounded-lg bg-[#070B16] border border-slate-700" />
                <div className="text-xs font-semibold text-ink">Midnight Base</div>
                <div className="font-mono text-[11px] text-ink-muted">#070B16</div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-surface space-y-2">
                <div className="h-12 rounded-lg bg-[#0B1224]" />
                <div className="text-xs font-semibold text-ink">Brand Navy</div>
                <div className="font-mono text-[11px] text-ink-muted">#0B1224</div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-surface space-y-2">
                <div className="h-12 rounded-lg bg-[#2563EB]" />
                <div className="text-xs font-semibold text-ink">Electric Blue</div>
                <div className="font-mono text-[11px] text-ink-muted">#2563EB</div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-surface space-y-2">
                <div className="h-12 rounded-lg bg-[#38BDF8]" />
                <div className="text-xs font-semibold text-ink">Icy Cyan Accent</div>
                <div className="font-mono text-[11px] text-ink-muted">#38BDF8</div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-surface space-y-2">
                <div className="h-12 rounded-lg bg-[#F8FAFC] border border-border" />
                <div className="text-xs font-semibold text-ink">Canvas Slate</div>
                <div className="font-mono text-[11px] text-ink-muted">#F8FAFC</div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-surface space-y-2">
                <div className="h-12 rounded-lg bg-white border border-border" />
                <div className="text-xs font-semibold text-ink">Surface Pure</div>
                <div className="font-mono text-[11px] text-ink-muted">#FFFFFF</div>
              </div>
            </div>

            {/* Gradients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="rounded-xl border border-slate-800 gradient-brand-navy p-5 text-white space-y-1">
                <div className="text-xs font-semibold">Brand Navy Gradient</div>
                <div className="text-[11px] font-mono text-slate-300">
                  linear-gradient(145deg, #070B16 0%, #0F172A 60%, #172554 100%)
                </div>
              </div>
              <div className="rounded-xl border border-blue-400 gradient-brand-blue p-5 text-white space-y-1">
                <div className="text-xs font-semibold">C2C Metallic Blue Gradient</div>
                <div className="text-[11px] font-mono text-white/90">
                  linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Component Primitives */}
      <section>
        <Container>
          <div className="space-y-8">
            <div>
              <span className="section-label">UI Primitives</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                Buttons, Badges & Indicators
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buttons */}
              <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle">
                <h3 className="font-display text-base font-bold text-ink">Button Styles</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default">Default Navy</Button>
                  <Button variant="primary">Primary Electric Blue</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-subtle">
                <h3 className="font-display text-base font-bold text-ink">Status Badges</h3>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="brand">Brand Blue</Badge>
                  <Badge variant="navy">Navy Anchor</Badge>
                  <Badge variant="subtle">Subtle</Badge>
                  <Badge variant="success">Active</Badge>
                  <StatusBadge type="temporal" status="upcoming" />
                  <StatusBadge type="registration" status="open" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Modal Dialog */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Official Brand Dialog"
        description="Testing accessible modal rendering styled with the official logo palette."
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-muted leading-relaxed">
            The design tokens, button styles, and badges now derive directly from the official Code2Chill circular emblem.
          </p>

          <div className="rounded-lg border border-border bg-canvas p-3 text-xs text-ink-muted space-y-1">
            <div className="flex items-center gap-1.5 text-brand-blue font-semibold">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              <span>Brand Alignment Complete</span>
            </div>
            <div>- Official emblem loaded in Header and Footer</div>
            <div>- Student-only identity established</div>
            <div>- Monospace typography reserved for code & technical data</div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Acknowledge
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
