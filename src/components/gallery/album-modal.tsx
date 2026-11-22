"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Image as ImageIcon } from "lucide-react";
import { GalleryAlbum } from "@/types";

interface AlbumModalProps {
  album: GalleryAlbum | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AlbumModal({ album, isOpen, onClose }: AlbumModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Reset index when album changes or opens
  useEffect(() => {
    setCurrentIndex(0);
  }, [album]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const photos = album?.photos || [];
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // swiped left
      } else {
        handlePrev(); // swiped right
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen || !album || photos.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} Gallery Viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative z-10 max-w-5xl w-full bg-[#080E1E] rounded-2xl overflow-hidden border border-white/12 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-[#060B18]">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                {album.title}
              </span>
              {album.eventDate && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <span>·</span>
                  <Calendar className="w-3 h-3" />
                  <span>{album.eventDate}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate max-w-lg">
              {album.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Counter */}
            <span className="text-xs font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-md">
              {currentIndex + 1} of {photos.length}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              aria-label="Close album viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Stage with Prev/Next Controls */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center p-2 sm:p-6 overflow-hidden min-h-[300px] sm:min-h-[460px]">
          {/* Current Photo */}
          <img
            key={currentPhoto.id}
            src={currentPhoto.imagePath}
            alt={currentPhoto.altText || album.title}
            className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-lg select-none transition-opacity duration-200"
          />

          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md shadow-lifted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full p-2.5 bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md shadow-lifted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Caption & Thumbnail Strip Footer */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 bg-[#060B18] flex items-center justify-between gap-4">
          <p className="text-xs text-slate-300 leading-relaxed truncate">
            {currentPhoto.caption || `${album.title} — Photograph ${currentIndex + 1}`}
          </p>

          {/* Small thumbnail dots or indicators */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-6 bg-brand-cyan"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to photograph ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
