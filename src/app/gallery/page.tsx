"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Layers,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getMockGalleryAlbums } from "@/data/mock";
import { GalleryAlbum } from "@/types";
import { FadeUp } from "@/components/effects/fade-up";
import { StaggerChildren, StaggerItem } from "@/components/effects/stagger-children";
import { AlbumModal } from "@/components/gallery/album-modal";

export default function GalleryPage() {
  const albums = getMockGalleryAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  return (
    <div className="pt-4 sm:pt-6 pb-16 sm:pb-20 space-y-8">
      {/* Header */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeUp delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3.5 py-1 shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-medium text-brand-cyan">
                  Event Photo Albums
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Event Archives & Memories
              </h1>
            </FadeUp>
            <FadeUp delay={0.28}>
              <p className="editorial-lead text-base sm:text-lg text-slate-300">
                Explore dedicated photo albums from our hands-on workshops, hackathons, open source sprints, and community meetups at Chitkara University.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* Albums Grid */}
      <section>
        <Container>
          {albums.length > 0 ? (
            <StaggerChildren
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              stagger={0.08}
              distance={28}
            >
              {albums.map((album) => (
                <StaggerItem key={album.id}>
                  <div
                    onClick={() => setSelectedAlbum(album)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-white/8 bg-[#080E1E] shadow-card hover:border-brand-cyan/40 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.25)] transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Cover Image Container */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
                      <img
                        src={album.coverImagePath}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Photo Count Badge Overlay */}
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          variant="navy"
                          size="sm"
                          className="bg-[#030712]/80 backdrop-blur-md border-white/15 text-white flex items-center gap-1.5"
                        >
                          <Layers className="w-3 h-3 text-brand-cyan" />
                          <span>{album.photoCount} Photos</span>
                        </Badge>
                      </div>

                      {/* Event Date Badge if available */}
                      {album.eventDate && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-[#030712]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                            <span>{album.eventDate}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Album Info */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-cyan transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                          {album.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/8 flex items-center justify-between text-xs font-semibold text-brand-cyan">
                        <span>Open Photo Album</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#080E1E] p-12 text-center space-y-3">
              <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">
                No Albums Published
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Event-specific photo collections will appear here after verification by club coordinators.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Album Lightbox Viewer */}
      <AlbumModal
        album={selectedAlbum}
        isOpen={Boolean(selectedAlbum)}
        onClose={() => setSelectedAlbum(null)}
      />
    </div>
  );
}
