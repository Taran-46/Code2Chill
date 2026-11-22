import { ProjectItem } from "@/types";

/**
 * Projects Showcase Data
 * Privacy Model:
 * - GitHub repository URLs are optional and private by default.
 * - Repositories are never exposed without explicit owner consent and admin publication.
 * - Projects can be fully showcased via problem descriptions, screenshots, tech stacks, and live demos.
 * - No fake or unverified sample repositories are invented.
 */
export const mockProjects: ProjectItem[] = [
  {
    id: "proj-001",
    title: "[Sample Project] DevPulse: Campus Developer Activity Aggregator",
    slug: "devpulse-campus-activity-aggregator",
    summary:
      "A platform showcasing student engineering milestones, active learning sprints, and technical contributions across campus.",
    problemSolved:
      "Student developers across different engineering streams often build great software in isolation. DevPulse solves cross-department discoverability by providing a centralized campus showcase where students can present their practical projects, discuss architecture, and find project collaborators.",
    description: `### Overview
DevPulse was conceived during a Code2Chill peer learning circle to encourage cross-department engineering collaboration. It aggregates student project milestones, highlights learning progress, and curates technical writeups in one discoverable directory.

#### Key Capabilities:
- Project showcases with detailed problem statements and technology breakdowns
- Contributor recognition with role-based team credits
- Filterable directory by technology stack and engineering stream`,
    category: "Web Application",
    coverPath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "https://devpulse.sample.code2chill.org",
    // Privacy: Source code is private to contributors; no public GitHub repo consented
    isRepoPublic: false,
    hasRepoConsent: false,
    status: "published",
    featured: true,
    contributors: [
      {
        id: "c-1",
        projectId: "proj-001",
        contributorName: "[Sample Lead] Aarav Patel",
        role: "Frontend Architect",
        hasConsent: true,
        displayOrder: 1,
      },
      {
        id: "c-2",
        projectId: "proj-001",
        contributorName: "[Sample Member] Rohan Mehta",
        role: "UI Engineer",
        hasConsent: true,
        displayOrder: 2,
      },
    ],
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: "proj-002",
    title: "[Sample Project] PeerNotes: Collaborative Markdown Knowledge Base",
    slug: "peernotes-markdown-knowledge-base",
    summary:
      "A fast, distraction-free markdown note-sharing platform with instant math formula rendering and offline revision support.",
    problemSolved:
      "Engineering coursework involves complex technical formulas, code snippets, and diagrams that standard note applications render poorly. PeerNotes gives students a clean markdown editor with KaTeX math rendering, searchable tags, and offline caching for exam study.",
    description: `### Overview
PeerNotes is a lightweight study companion designed by club members to make course summaries and lecture notes easily searchable, cleanly formatted with LaTeX math rendering, and accessible even without reliable campus connectivity.

#### Key Capabilities:
- Instant client-side KaTeX math notation rendering
- Local-first offline storage with synchronization
- Clean export to PDF and Markdown`,
    category: "Productivity",
    coverPath: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1000&auto=format&fit=crop&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "IndexedDB"],
    // Privacy: Source code is private to contributors
    isRepoPublic: false,
    hasRepoConsent: false,
    status: "published",
    featured: true,
    contributors: [
      {
        id: "c-3",
        projectId: "proj-002",
        contributorName: "[Sample Member] Priya Sen",
        role: "Full-Stack Developer",
        hasConsent: true,
        displayOrder: 1,
      },
    ],
    createdAt: "2026-07-15T10:00:00Z",
  },
  {
    id: "proj-003",
    title: "[Sample Project] CampusNav: Interactive Indoor Venue Guide",
    slug: "campusnav-indoor-guide",
    summary:
      "Lightweight progressive web app helping incoming students find seminar halls, computer labs, and workshop rooms with ease.",
    problemSolved:
      "New university students often struggle to locate specific seminar halls, labs, and lecture theatres during busy event days. CampusNav provides responsive indoor floor plans and accessible route directions directly in any mobile browser without requiring app installation.",
    description: `### Overview
Created during a club hackathon sprint, CampusNav provides responsive indoor floor maps, accessible navigation paths, and directory search for campus buildings.

#### Key Capabilities:
- Lightweight vector floor-plan visualization
- Direct search for lecture halls and conference facilities
- Offline progressive web app (PWA) installation`,
    category: "Utility",
    coverPath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80",
    techStack: ["TypeScript", "SVG Mapping", "PWA"],
    demoUrl: "https://campusnav.sample.code2chill.org",
    // Privacy: Source code is private to contributors
    isRepoPublic: false,
    hasRepoConsent: false,
    status: "published",
    featured: false,
    contributors: [
      {
        id: "c-4",
        projectId: "proj-003",
        contributorName: "[Sample Member] Kabir Nair",
        role: "Core Developer",
        hasConsent: true,
        displayOrder: 1,
      },
    ],
    createdAt: "2026-06-20T10:00:00Z",
  },
];
