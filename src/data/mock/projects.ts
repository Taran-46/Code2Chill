import { ProjectItem } from "@/types";

/**
 * Clearly labelled sample projects for frontend showcase
 */
export const mockProjects: ProjectItem[] = [
  {
    id: "proj-001",
    title: "[Sample Project] DevPulse: Campus Developer Activity Aggregator",
    slug: "devpulse-campus-activity-aggregator",
    summary:
      "A platform showcasing open-source contributions, repositories, and technical milestones achieved by university students.",
    description: `### Overview
DevPulse was built to encourage cross-department engineering collaboration. It surfaces trending campus repositories, highlights recent GitHub commits, and curates student engineering projects in one discoverable portal.

#### Key Features:
- Automated GitHub GraphQL API integration
- Clean editorial leaderboards and contributor spotlights
- Tag-based technology taxonomy`,
    category: "Web Application",
    coverPath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    githubUrl: "https://github.com/code2chill/devpulse-sample",
    demoUrl: "https://devpulse.sample.code2chill.org",
    status: "published",
    featured: true,
    contributors: [
      {
        id: "c-1",
        projectId: "proj-001",
        contributorName: "[Sample Lead] Aarav Patel",
        role: "Frontend Architect",
        displayOrder: 1,
      },
      {
        id: "c-2",
        projectId: "proj-001",
        contributorName: "[Sample Member] Rohan Mehta",
        role: "UI Engineer",
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
      "A fast, distraction-free markdown note-sharing platform with instant LaTeX math formatting and offline support.",
    description: `### Overview
PeerNotes is a lightweight study companion designed by club members to make course summaries and lecture notes easily searchable, cleanly formatted with KaTeX math rendering, and synchronized in real-time.`,
    category: "Productivity",
    coverPath: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1000&auto=format&fit=crop&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/code2chill/peernotes-sample",
    status: "published",
    featured: true,
    contributors: [
      {
        id: "c-3",
        projectId: "proj-002",
        contributorName: "[Sample Member] Priya Sen",
        role: "Full-Stack Developer",
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
      "Lightweight progressive web app helping incoming students find seminar halls, labs, and faculty cabins with ease.",
    description: `### Overview
Created during a weekend hackathon, CampusNav provides responsive indoor floor maps, accessible navigation paths, and directory search for campus buildings.`,
    category: "Utility",
    coverPath: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80",
    techStack: ["TypeScript", "SVG Mapping", "PWA"],
    githubUrl: "https://github.com/code2chill/campusnav-sample",
    demoUrl: "https://campusnav.sample.code2chill.org",
    status: "published",
    featured: false,
    contributors: [
      {
        id: "c-4",
        projectId: "proj-003",
        contributorName: "[Sample Member] Kabir Nair",
        role: "Core Developer",
        displayOrder: 1,
      },
    ],
    createdAt: "2026-06-20T10:00:00Z",
  },
];
