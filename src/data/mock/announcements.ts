import { AnnouncementItem } from "@/types";

/**
 * Sample announcements for homepage banners and notifications
 */
export const mockAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-001",
    title: "Registrations Open: Next.js 14 Full-Stack Architecture Workshop",
    body: "Limited seats available for the December hands-on session. Register today to reserve your spot.",
    targetUrl: "/events/nextjs-fullstack-architecture-workshop",
    targetLabel: "View Event & Register",
    published: true,
    publishAt: "2026-11-15T00:00:00Z",
    expiresAt: "2026-12-05T10:00:00+05:30",
    createdAt: "2026-11-15T10:00:00Z",
  },
  {
    id: "ann-002",
    title: "Expired Notice (Testing)",
    body: "This announcement has expired and should not be displayed on public routes.",
    published: true,
    publishAt: "2026-09-01T00:00:00Z",
    expiresAt: "2026-10-01T00:00:00Z",
    createdAt: "2026-09-01T10:00:00Z",
  },
];
