import { EventItem } from "@/types";

/**
 * Clearly labelled sample events for development & testing
 * Dates are standardized in Asia/Kolkata (IST).
 */
export const mockEvents: EventItem[] = [
  {
    id: "evt-001",
    title: "[Sample Event] Next.js 14 & Full-Stack Web Architecture",
    slug: "nextjs-fullstack-architecture-workshop",
    summary:
      "A deep dive into React Server Components, server actions, Supabase integration, and deployment workflows.",
    description: `### About the Workshop
Join Code2Chill for a hands-on, practical session designed for developers wanting to master production-grade Next.js App Router applications.

#### What you will learn:
- Server Components vs Client Components in real-world applications
- Optimistic UI updates with React Server Actions
- PostgreSQL database security with Row Level Security (RLS)
- Performance profiling and automated deployments on Vercel

#### Prerequisites:
- Basic familiarity with JavaScript/TypeScript and React fundamentals.
- Laptop with Node.js LTS installed.`,
    category: "Workshop",
    posterPath: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    startAt: "2026-12-05T10:00:00+05:30",
    endAt: "2026-12-05T16:00:00+05:30",
    timezone: "Asia/Kolkata",
    venue: "Seminar Hall B, Newton Block, Chitkara University [Sample Venue]",
    registrationMode: "external",
    registrationUrl: "https://forms.gle/placeholder-nextjs-workshop",
    registrationDeadline: "2026-12-04T23:59:00+05:30",
    capacity: 60,
    status: "published",
    featured: true,
    createdAt: "2026-11-01T12:00:00Z",
  },
  {
    id: "evt-002",
    title: "[Sample Event] ChillHack 2026: 24-Hour Student Hackathon",
    slug: "chillhack-2026-student-hackathon",
    summary:
      "24 hours of rapid prototyping, mentorship, and building software solutions for campus and community problems.",
    description: `### Build, Collaborate, and Ship
ChillHack is Code2Chill's flagship annual student hackathon. Gather your team of 2–4 members and tackle challenge tracks in campus utility, open-source developer tooling, and sustainable tech.

#### Event Highlights:
- Free food, beverages, and late-night coffee
- Industry mentor office hours
- Exciting project showcase and peer voting`,
    category: "Hackathon",
    posterPath: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    startAt: "2026-12-19T09:00:00+05:30",
    endAt: "2026-12-20T12:00:00+05:30",
    timezone: "Asia/Kolkata",
    venue: "Central Auditorium & Innovation Lab, Chitkara University [Sample Venue]",
    registrationMode: "external",
    registrationUrl: "https://forms.gle/placeholder-chillhack",
    registrationDeadline: "2026-12-15T23:59:00+05:30",
    capacity: 120,
    status: "published",
    featured: true,
    createdAt: "2026-11-05T12:00:00Z",
  },
  {
    id: "evt-003",
    title: "[Sample Past Event] Git, GitHub & Open Source Jumpstart",
    slug: "git-github-opensource-jumpstart",
    summary:
      "Beginner-friendly masterclass on version control, branch management, pull requests, and landing first open-source contributions.",
    description: `A hands-on session that introduced over 80 first-year students to the foundational workflows of modern software engineering.

Participants learned terminal navigation, Git commit conventions, and collaborated on a shared open repository.`,
    category: "Peer Session",
    posterPath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    startAt: "2026-10-12T14:00:00+05:30",
    endAt: "2026-10-12T17:00:00+05:30",
    timezone: "Asia/Kolkata",
    venue: "Lab 204, Turing Block, Chitkara University [Sample Venue]",
    registrationMode: "none",
    status: "published",
    featured: false,
    createdAt: "2026-09-20T10:00:00Z",
  },
  {
    id: "evt-004",
    title: "[Sample Past Event] Systems & Cloud Native Architecture Talk",
    slug: "systems-cloud-native-talk",
    summary:
      "Guest speaker session on Docker containers, Kubernetes fundamentals, and production telemetry.",
    description: `Interactive tech talk exploring how high-throughput applications are deployed, observed, and scaled in enterprise environments.`,
    category: "Tech Talk",
    posterPath: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
    startAt: "2026-09-18T15:00:00+05:30",
    endAt: "2026-09-18T17:30:00+05:30",
    timezone: "Asia/Kolkata",
    venue: "Lecture Theatre 1, Chitkara University [Sample Venue]",
    registrationMode: "none",
    status: "published",
    featured: false,
    createdAt: "2026-08-30T10:00:00Z",
  },
];
