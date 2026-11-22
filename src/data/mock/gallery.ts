import { GalleryAlbum, GalleryItem } from "@/types";

/**
 * Event-Wise Photo Albums
 * Each album represents a distinct workshop, hackathon, tech talk, or general club activity.
 * When opening an album, photographs from that specific collection are viewed exclusively.
 * No placeholder photos are presented as real club memories.
 */
export const mockGalleryAlbums: GalleryAlbum[] = [
  {
    id: "alb-001",
    title: "[Sample Album] Next.js 14 Full-Stack Architecture Workshop",
    slug: "nextjs-14-architecture-workshop",
    description:
      "Photographs from our hands-on workshop covering React Server Components, server actions, and PostgreSQL security.",
    coverImagePath: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
    eventTitle: "[Sample Event] Next.js 14 Workshop",
    eventId: "evt-001",
    eventDate: "2026-10-15",
    photoCount: 4,
    isPublished: true,
    displayOrder: 1,
    createdAt: "2026-10-15T12:00:00Z",
    photos: [
      {
        id: "p-101",
        albumId: "alb-001",
        imagePath: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
        altText: "Students coding on laptops during the Next.js workshop session",
        caption: "Hands-on coding session and architectural walkthrough [Sample Photograph]",
        displayOrder: 1,
      },
      {
        id: "p-102",
        albumId: "alb-001",
        imagePath: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
        altText: "Instructor demonstrating database queries on the projector screen",
        caption: "Live demonstration of database queries and server actions [Sample Photograph]",
        displayOrder: 2,
      },
      {
        id: "p-103",
        albumId: "alb-001",
        imagePath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
        altText: "Peer mentors helping participants debug their code",
        caption: "Peer mentors assisting participants with environment setup [Sample Photograph]",
        displayOrder: 3,
      },
      {
        id: "p-104",
        albumId: "alb-001",
        imagePath: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
        altText: "Participants celebrating successful deployment at the conclusion of the workshop",
        caption: "Group wrap-up and live application deployments [Sample Photograph]",
        displayOrder: 4,
      },
    ],
  },
  {
    id: "alb-002",
    title: "[Sample Album] ChillHack 2026: 24-Hour Campus Hackathon",
    slug: "chillhack-2026-hackathon",
    description:
      "Capturing the energy, midnight debugging sprints, and final project demos at ChillHack 2026.",
    coverImagePath: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80",
    eventTitle: "[Sample Event] ChillHack 2026",
    eventId: "evt-002",
    eventDate: "2026-09-20",
    photoCount: 4,
    isPublished: true,
    displayOrder: 2,
    createdAt: "2026-09-20T12:00:00Z",
    photos: [
      {
        id: "p-201",
        albumId: "alb-002",
        imagePath: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
        altText: "Teams brainstorming hackathon project ideas with sticky notes",
        caption: "Opening brainstorming session as teams form project blueprints [Sample Photograph]",
        displayOrder: 1,
      },
      {
        id: "p-202",
        albumId: "alb-002",
        imagePath: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
        altText: "Late night coding sprint with dual monitors",
        caption: "Midnight coding sprint in the innovation lab [Sample Photograph]",
        displayOrder: 2,
      },
      {
        id: "p-203",
        albumId: "alb-002",
        imagePath: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80",
        altText: "Mentors reviewing student architecture diagrams",
        caption: "Mentor review and feedback checkpoint during the sprint [Sample Photograph]",
        displayOrder: 3,
      },
      {
        id: "p-204",
        albumId: "alb-002",
        imagePath: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
        altText: "Finalist team presenting their project to peer judges",
        caption: "Final stage project presentations and live software demos [Sample Photograph]",
        displayOrder: 4,
      },
    ],
  },
  {
    id: "alb-003",
    title: "[Sample Album] Git & Open Source Jumpstart",
    slug: "git-opensource-jumpstart",
    description:
      "First-year jumpstart session introducing version control, collaborative branch workflows, and practical terminal commands.",
    coverImagePath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    eventTitle: "[Sample Event] Git Jumpstart",
    eventId: "evt-003",
    eventDate: "2026-08-25",
    photoCount: 3,
    isPublished: true,
    displayOrder: 3,
    createdAt: "2026-08-25T12:00:00Z",
    photos: [
      {
        id: "p-301",
        albumId: "alb-003",
        imagePath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
        altText: "Peer mentors helping newcomer students configure git",
        caption: "Interactive terminal guidance for first-year engineering students [Sample Photograph]",
        displayOrder: 1,
      },
      {
        id: "p-302",
        albumId: "alb-003",
        imagePath: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
        altText: "Whiteboard explanation of merge branches and pull requests",
        caption: "Visual explanation of branch workflows and pull request reviews [Sample Photograph]",
        displayOrder: 2,
      },
      {
        id: "p-303",
        albumId: "alb-003",
        imagePath: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
        altText: "Students smiling after successfully pushing their first commit",
        caption: "Celebration after completing the first collaborative repository commit [Sample Photograph]",
        displayOrder: 3,
      },
    ],
  },
  {
    id: "alb-004",
    title: "[Sample Album] Club Activities & Peer Study Circles",
    slug: "club-activities-and-peer-circles",
    description:
      "Informal study circles, core team sprint planning, and collaborative technical discussions.",
    coverImagePath: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&auto=format&fit=crop&q=80",
    eventDate: "2026-08-10",
    photoCount: 3,
    isPublished: true,
    displayOrder: 4,
    createdAt: "2026-08-10T12:00:00Z",
    photos: [
      {
        id: "p-401",
        albumId: "alb-004",
        imagePath: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80",
        altText: "Core team discussion around workshop curriculum",
        caption: "Core team curriculum planning and schedule alignment [Sample Photograph]",
        displayOrder: 1,
      },
      {
        id: "p-402",
        albumId: "alb-004",
        imagePath: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
        altText: "Informal student discussion circle on campus",
        caption: "Peer study group sharing software design patterns [Sample Photograph]",
        displayOrder: 2,
      },
      {
        id: "p-403",
        albumId: "alb-004",
        imagePath: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
        altText: "Student presenting an open source tool overview",
        caption: "Lightning talk on modern developer tooling and CLI utilities [Sample Photograph]",
        displayOrder: 3,
      },
    ],
  },
];

/** Legacy flat gallery items derived from albums for backward compatibility */
export const mockGallery: GalleryItem[] = mockGalleryAlbums.flatMap((album) =>
  album.photos.map((photo) => ({
    id: photo.id,
    eventId: album.eventId,
    eventTitle: album.eventTitle,
    imagePath: photo.imagePath,
    altText: photo.altText,
    caption: photo.caption,
    displayOrder: photo.displayOrder,
    isPublished: album.isPublished,
    createdAt: album.createdAt,
  }))
);
