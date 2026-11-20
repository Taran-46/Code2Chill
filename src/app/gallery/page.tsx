"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Calendar,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { getMockGallery } from "@/data/mock";
import { GalleryItem } from "@/types";

export default function GalleryPage() {
  const gallery = getMockGallery();
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  return (
    <div className="py-12 sm:py-20 space-y-12">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-lime-dark" />
              <span className="text-xs font-mono font-medium text-ink">
                Visual Archive
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
              Community & Event Photography
            </h1>
            <p className="editorial-lead text-base sm:text-lg text-ink-muted">
              Documenting moments from coding workshops, late-night hackathon sprints, peer mentor circles, and project presentations at Chitkara University.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section>
        <Container>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePhoto(item)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-border bg-surface shadow-subtle hover:border-border-strong hover:shadow-card transition-all flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-canvas-muted">
                    <img
                      src={item.imagePath}
                      alt={item.altText}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="rounded-full bg-surface/90 p-3 text-ink shadow-lifted">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>

                    {item.eventTitle && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="subtle" size="sm" className="bg-surface/90 backdrop-blur-sm">
                          {item.eventTitle}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  {item.caption && (
                    <div className="p-4 bg-surface border-t border-border">
                      <p className="text-xs font-mono text-ink-muted leading-relaxed truncate">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-3">
              <ImageIcon className="w-8 h-8 text-ink-muted mx-auto" />
              <h3 className="font-display font-bold text-lg text-ink">
                No Photographs Published
              </h3>
              <p className="text-sm text-ink-muted max-w-sm mx-auto">
                Photographs from upcoming workshops and events will be published here after editorial review.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/80 backdrop-blur-md transition-opacity"
            onClick={() => setActivePhoto(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 max-w-4xl w-full bg-surface rounded-2xl overflow-hidden border border-border shadow-lifted space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-border">
              <div className="space-y-0.5">
                {activePhoto.eventTitle && (
                  <span className="text-[11px] font-mono text-brand-lime-dark font-medium uppercase">
                    {activePhoto.eventTitle}
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-ink">
                  {activePhoto.caption || "Event Moment"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="rounded-lg p-2 text-ink-muted hover:bg-canvas-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image */}
            <div className="rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[65vh]">
              <img
                src={activePhoto.imagePath}
                alt={activePhoto.altText}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono text-ink-muted">
              <span>Alt: {activePhoto.altText}</span>
              <span>Code2Chill Photo Archive</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
