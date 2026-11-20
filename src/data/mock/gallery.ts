import { GalleryItem } from "@/types";

/**
 * Clearly labelled sample gallery items for testing responsive grid & lightboxes
 */
export const mockGallery: GalleryItem[] = [
  {
    id: "gal-001",
    eventId: "evt-001",
    eventTitle: "[Sample Event] Next.js 14 Workshop",
    imagePath: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
    altText: "Students attending an interactive hands-on coding workshop with laptops open",
    caption: "Hands-on coding session in Turing Hall [Sample Image]",
    displayOrder: 1,
    isPublished: true,
    createdAt: "2026-10-15T10:00:00Z",
  },
  {
    id: "gal-002",
    eventId: "evt-002",
    eventTitle: "[Sample Event] ChillHack 2026",
    imagePath: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80",
    altText: "Hackathon teams collaborating around shared tables with sticky notes and code displays",
    caption: "Midnight sprint during the 24-hour hackathon [Sample Image]",
    displayOrder: 2,
    isPublished: true,
    createdAt: "2026-10-15T10:00:00Z",
  },
  {
    id: "gal-003",
    eventId: "evt-003",
    eventTitle: "[Sample Event] Git Jumpstart",
    imagePath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    altText: "Club peer mentors assisting participants with terminal git commands",
    caption: "Peer-to-peer mentoring at Git & GitHub Jumpstart [Sample Image]",
    displayOrder: 3,
    isPublished: true,
    createdAt: "2026-09-20T10:00:00Z",
  },
  {
    id: "gal-004",
    imagePath: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&auto=format&fit=crop&q=80",
    altText: "Core team discussion and sprint planning meeting around whiteboard",
    caption: "Core team sprint planning and agenda discussion [Sample Image]",
    displayOrder: 4,
    isPublished: true,
    createdAt: "2026-09-10T10:00:00Z",
  },
  {
    id: "gal-005",
    imagePath: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    altText: "Students smiling and celebrating successful project deployment",
    caption: "Demo day celebrations [Sample Image]",
    displayOrder: 5,
    isPublished: true,
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "gal-006",
    eventId: "evt-004",
    eventTitle: "[Sample Event] Systems Talk",
    imagePath: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80",
    altText: "Speaker presenting system architecture diagrams on the large projection screen",
    caption: "Guest session on scalable infrastructure [Sample Image]",
    displayOrder: 6,
    isPublished: true,
    createdAt: "2026-08-15T10:00:00Z",
  },
];
