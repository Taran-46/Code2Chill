export type UserRole = "super_admin" | "editor";

export interface AdminMembership {
  userId: string;
  role: UserRole;
  createdAt: string;
}

export type TeamGroup = "Club Leadership" | "Technical Leads" | "Core Team";

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  groupName: TeamGroup;
  bio?: string;
  photoPath?: string;
  linkedinUrl?: string;
  emailPublic?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type EventStatus = "draft" | "published" | "cancelled";
export type RegistrationMode = "none" | "external" | "internal";
export type RegistrationState = "not_required" | "upcoming" | "open" | "closed" | "full";
export type EventTemporalStatus = "upcoming" | "ongoing" | "past";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  posterPath?: string;
  startAt: string; // ISO 8601 UTC or with offset
  endAt?: string;
  timezone: string; // default 'Asia/Kolkata'
  venue: string;
  registrationMode: RegistrationMode;
  registrationUrl?: string;
  registrationDeadline?: string;
  capacity?: number;
  status: EventStatus;
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type ProjectStatus = "draft" | "published" | "archived";

export interface ProjectContributor {
  id: string;
  projectId: string;
  teamMemberId?: string;
  contributorName: string;
  role?: string;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  coverPath?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  contributors?: ProjectContributor[];
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  eventId?: string;
  eventTitle?: string;
  imagePath: string;
  altText: string;
  caption?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  targetUrl?: string;
  targetLabel?: string;
  published: boolean;
  publishAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface SiteSettings {
  clubName: string;
  tagline: string;
  description: string;
  university: string;
  campus: string;
  contactEmail: string;
  instagramUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
