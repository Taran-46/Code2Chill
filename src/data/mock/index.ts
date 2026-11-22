import { mockSiteSettings } from "./site-settings";
import { mockTeamMembers } from "./team";
import { mockEvents } from "./events";
import { mockProjects } from "./projects";
import { mockGallery, mockGalleryAlbums } from "./gallery";
import { mockAnnouncements } from "./announcements";
import {
  EventItem,
  GalleryAlbum,
  GalleryItem,
  ProjectItem,
  SiteSettings,
  TeamMember,
  AnnouncementItem,
} from "@/types";

/**
 * Unified data access layer with local demo-mode persistence
 * Changes made in demo coordinator mode persist in localStorage across navigation and refreshes.
 */

function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveDemoTeam(team: TeamMember[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("c2c_demo_team", JSON.stringify(team));
  }
}

export function saveDemoEvents(events: EventItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("c2c_demo_events", JSON.stringify(events));
  }
}

export function saveDemoProjects(projects: ProjectItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("c2c_demo_projects", JSON.stringify(projects));
  }
}

export function saveDemoAlbums(albums: GalleryAlbum[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("c2c_demo_albums", JSON.stringify(albums));
  }
}

export function saveDemoAnnouncements(announcements: AnnouncementItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("c2c_demo_announcements", JSON.stringify(announcements));
  }
}

export function getMockSiteSettings(): SiteSettings {
  return mockSiteSettings;
}

export function getMockTeam(): TeamMember[] {
  const members = getLocalItem("c2c_demo_team", mockTeamMembers);
  return members.filter((m) => m.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getAllMockTeam(): TeamMember[] {
  return getLocalItem("c2c_demo_team", mockTeamMembers);
}

export function getMockEvents(): EventItem[] {
  const events = getLocalItem("c2c_demo_events", mockEvents);
  return events.filter((e) => e.status === "published");
}

export function getAllMockEvents(): EventItem[] {
  return getLocalItem("c2c_demo_events", mockEvents);
}

export function getMockEventBySlug(slug: string): EventItem | undefined {
  const events = getAllMockEvents();
  return events.find((e) => e.slug === slug && e.status === "published");
}

export function getMockProjects(): ProjectItem[] {
  const projects = getLocalItem("c2c_demo_projects", mockProjects);
  return projects.filter((p) => p.status === "published");
}

export function getAllMockProjects(): ProjectItem[] {
  return getLocalItem("c2c_demo_projects", mockProjects);
}

export function getMockProjectBySlug(slug: string): ProjectItem | undefined {
  const projects = getAllMockProjects();
  return projects.find((p) => p.slug === slug && p.status === "published");
}

export function getMockGallery(): GalleryItem[] {
  return mockGallery.filter((g) => g.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getMockGalleryAlbums(): GalleryAlbum[] {
  const albums = getLocalItem("c2c_demo_albums", mockGalleryAlbums);
  return albums
    .filter((a) => a.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getAllMockGalleryAlbums(): GalleryAlbum[] {
  return getLocalItem("c2c_demo_albums", mockGalleryAlbums);
}

export function getMockGalleryAlbumBySlug(slug: string): GalleryAlbum | undefined {
  const albums = getAllMockGalleryAlbums();
  return albums.find((a) => a.slug === slug && a.isPublished);
}

export function getMockAnnouncements(): AnnouncementItem[] {
  return getLocalItem("c2c_demo_announcements", mockAnnouncements);
}

export function getMockActiveAnnouncements(referenceNow: Date = new Date()): AnnouncementItem[] {
  const list = getMockAnnouncements();
  const now = referenceNow.getTime();
  return list.filter((a) => {
    if (!a.published) return false;
    if (a.publishAt && new Date(a.publishAt).getTime() > now) return false;
    if (a.expiresAt && new Date(a.expiresAt).getTime() < now) return false;
    return true;
  });
}
