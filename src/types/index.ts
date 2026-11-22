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
  hasConsent?: boolean;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problemSolved?: string;
  description: string;
  category: string;
  coverPath?: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string; // Optional: Never exposed without explicit owner consent & admin approval
  isRepoPublic?: boolean; // Controlled by admin with owner consent (default: false)
  hasRepoConsent?: boolean; // Owner explicit consent to share repository
  status: ProjectStatus;
  featured: boolean;
  contributors?: ProjectContributor[];
  createdAt: string;
  updatedAt?: string;
}

/** Individual photograph in an album */
export interface GalleryPhoto {
  id: string;
  albumId: string;
  imagePath: string;
  altText: string;
  caption?: string;
  displayOrder: number;
}

/** Event-wise or activity-wise photo album */
export interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverImagePath: string;
  eventTitle?: string;
  eventId?: string;
  eventDate?: string;
  photoCount: number;
  photos: GalleryPhoto[];
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
}

/** Legacy flat gallery item representation */
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
  campus?: string;
  contactEmail?: string;
  instagramUrl: string;
  linkedinUrl: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: "new" | "reviewed" | "resolved";
  createdAt?: string;
}
