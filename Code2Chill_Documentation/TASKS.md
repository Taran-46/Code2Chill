# TASKS.md — Live project tracker

Status key: [ ] not started · [~] in progress · [x] complete · [!] blocked

## Discovery and content
- [x] Confirm university affiliation (Chitkara University, Punjab, India)
- [x] Integrate verified circular Code2Chill logo
- [x] Confirm official Instagram URL (`https://www.instagram.com/code2chill.osl/`)
- [x] Remove placeholder email addresses across all pages and metadata
- [x] Remove fake physical room/office locations
- [x] Remove fake/unverified GitHub organization links
- [x] Define student project repository privacy and consent model
- [x] Restructure gallery into event-based photo albums

## Phase 1 — Foundation
- [x] Initialize Next.js App Router + TypeScript
- [x] Configure linting and formatting
- [x] Configure Tailwind and design tokens
- [x] Add approved fonts and logo
- [x] Build responsive header and footer
- [x] Build shared UI components
- [x] Verify mobile navigation and accessibility

## Phase 2 — Public pages & Refinements
- [x] Home (Hero, About, Activities, Featured Event, Student Team Preview, FAQ, Contact — Project showcase consolidated to dedicated /projects directory)
- [x] Team directory (Student Leadership, Track Leads & Mentors)
- [x] Events listing (Upcoming, Past, Category filters)
- [x] Event detail with clean sans-serif typography, schedule, and countdown timer
- [x] Projects listing with category filtering and privacy-respecting repository links
- [x] Project detail with "Problem It Solves", tech stack, contributor consent, and repository privacy indicator
- [x] Gallery with event-wise photo album cards
- [x] Interactive Album Modal viewer with keyboard, touch swipe, and counter
- [x] Contact page with official Instagram, university affiliation, and queued inquiry submission
- [x] Comprehensive Typography audit: removed artificial monospace from all normal UI elements, headings, event dates/times/venues, badges, and buttons

## Phase 3 — Backend & Security (Completed & Prepared)
- [x] Full PostgreSQL Relational Schema (`supabase/migrations/00001_initial_schema.sql`):
  - `profiles` & `admin_memberships` (super_admin, editor)
  - `team_members` with consent tracking & ordering
  - `events` with date range constraints & status
  - `projects` with `problem_solved`, `is_repo_public`, `has_repo_consent`
  - `project_contributors` with consent enforcement
  - `gallery_albums` & `gallery_photos` (event-wise photo collections)
  - `announcements` with publish & expiry scheduling
  - `site_settings` (Instagram, LinkedIn)
  - `contact_inquiries` with strict admin-only read access
- [x] Row Level Security (RLS) configured across all 11 tables
- [x] Supabase Storage buckets & policies documented (`event-media`, `project-media`, `gallery-albums`, `team-photos`)
- [x] Real team seed data script created (`supabase/seed.sql`) with 7 verified members
- [x] Edge route protection middleware (`src/middleware.ts`) for all `/admin/*` routes
- [x] Supabase status utility (`src/lib/supabase/status.ts`) safely falling back when unconfigured
- [ ] Configure live `.env.local` with user's Supabase project credentials (Awaiting user Supabase project creation)

## Phase 4 — Admin Dashboard (Completed)
- [x] Coordinator authentication login portal (`/admin/login`) with Suspense boundary
- [x] Protected admin layout shell (`/admin/layout.tsx`) with responsive navigation and sign-out
- [x] Dashboard overview with published/unpublished metrics (`/admin`)
- [x] Team member management interface (`/admin/team`)
- [x] Event & workshop scheduling interface (`/admin/events`)
- [x] Project privacy & repository visibility management (`/admin/projects`)
- [x] Gallery album & photo collections management (`/admin/gallery`)
- [x] Announcement banner manager with automatic expiry (`/admin/announcements`)
- [x] Confidential inquiries inbox with status review (`/admin/inquiries`)
- [x] Social links & super_admin provisioning guide (`/admin/settings`)

## Current status
- **Real Team Data**: 7 confirmed student coordinators integrated with verified LinkedIn profiles, roles, and bios.
- **Unverified Content Eliminated**: Sample Next.js workshop and fake venue removed. Polished empty states active.
- **Public Claims Neutralized**: Unverified claims ("all events free", "open source sprints", "mentoring circles") removed.
- **Admin Dashboard Active**: Full coordinator portal built and verified with Next.js production build (24/24 routes passing, 0 errors).
- **Supabase Backend Ready**: SQL migration (`00001_initial_schema.sql`) and seed script (`seed.sql`) ready for execution once user creates their Supabase project.
