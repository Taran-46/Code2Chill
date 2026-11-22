"use client";

import React, { useState } from "react";
import { Images, Plus, Check, X, Calendar, Image as ImageIcon } from "lucide-react";
import { getMockGalleryAlbums } from "@/data/mock";
import { GalleryAlbum } from "@/types";

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(getMockGalleryAlbums());

  const togglePublished = (id: string) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPublished: !a.isPublished } : a))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Images className="w-5 h-5 text-brand-cyan" />
            <h1 className="font-display font-bold text-2xl text-white">
              Gallery & Photo Album Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Organize event-wise photo collections, upload photos to Supabase Storage, and manage public archive visibility.
          </p>
        </div>

        <button
          onClick={() => alert("Configure Supabase to enable uploading photos to the 'gallery-albums' storage bucket.")}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 text-xs font-sans font-semibold transition-colors shadow-subtle shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Album</span>
        </button>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="rounded-xl border border-white/8 bg-[#080E1E] overflow-hidden shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900 border-b border-white/8">
                <img
                  src={album.coverImagePath}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 text-[10px] font-semibold bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded">
                  {album.photos.length} Photos
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display font-bold text-base text-white">
                  {album.title}
                </h3>
                {album.description && (
                  <p className="text-xs text-slate-400 font-sans line-clamp-2">
                    {album.description}
                  </p>
                )}
                {album.eventDate && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans pt-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{album.eventDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/8 flex items-center justify-between bg-white/[0.01]">
              <button
                onClick={() => togglePublished(album.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  album.isPublished
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                }`}
              >
                {album.isPublished ? (
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

              <button
                onClick={() => alert(`Manage photos for ${album.title}`)}
                className="text-xs font-semibold text-brand-cyan hover:underline"
              >
                Manage Photos →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
