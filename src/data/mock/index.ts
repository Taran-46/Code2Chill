import { mockSiteSettings } from "./site-settings";
import { mockTeamMembers } from "./team";
import { mockEvents } from "./events";
import { mockProjects } from "./projects";
import { mockGallery } from "./gallery";
import { mockAnnouncements } from "./announcements";
import {
  EventItem,
  GalleryItem,
  ProjectItem,
  SiteSettings,
  TeamMember,
  AnnouncementItem,
} from "@/types";

/**
 * Unified mock data access layer
 * In Phase 3, these query functions will be replaced by Supabase SSR queries
 * without altering component contracts.
 */

export function getMockSiteSettings(): SiteSettings {
  return mockSiteSettings;
}

export function getMockTeam(): TeamMember[] {
  return mockTeamMembers.filter((m) => m.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getMockEvents(): EventItem[] {
  return mockEvents.filter((e) => e.status === "published");
}

export function getMockEventBySlug(slug: string): EventItem | undefined {
  return mockEvents.find((e) => e.slug === slug && e.status === "published");
}

export function getMockProjects(): ProjectItem[] {
  return mockProjects.filter((p) => p.status === "published");
}

export function getMockProjectBySlug(slug: string): ProjectItem | undefined {
  return mockProjects.find((p) => p.slug === slug && p.status === "published");
}

export function getMockGallery(): GalleryItem[] {
  return mockGallery.filter((g) => g.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getMockActiveAnnouncements(referenceNow: Date = new Date()): AnnouncementItem[] {
  const now = referenceNow.getTime();
  return mockAnnouncements.filter((a) => {
    if (!a.published) return false;
    if (a.publishAt && new Date(a.publishAt).getTime() > now) return false;
    if (a.expiresAt && new Date(a.expiresAt).getTime() < now) return false;
    return true;
  });
}
