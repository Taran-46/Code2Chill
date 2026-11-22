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

## Phase 3 — Backend (Next Phase)
- [ ] Create Supabase project
- [ ] Configure local environment variables (`.env.local`)
- [ ] Create SQL migrations for tables:
  - `site_settings`
  - `events`
  - `team_members`
  - `projects` (including `problem_solved`, `is_repo_public`, `has_repo_consent`)
  - `gallery_albums` and `gallery_photos`
  - `announcements`
  - `inquiries`
- [ ] Configure Row Level Security (RLS) for public read & admin-only write
- [ ] Configure Supabase Storage buckets (`event-media`, `project-media`, `gallery-albums`) and storage RLS
- [ ] Verify public read queries and secured administrative mutations

## Phase 4 — Admin
- [ ] Configure Supabase Auth
- [ ] Implement role checks (`super_admin`, `editor`)
- [ ] Build admin layout/dashboard
- [ ] Event CRUD
- [ ] Team CRUD
- [ ] Project CRUD with repository privacy and consent controls
- [ ] Gallery Album & Photo CRUD (upload multiple photos, set cover, reorder, delete)
- [ ] Announcements CRUD
- [ ] Inquiries inbox for authorized coordinators
- [ ] Confirm destructive actions and show feedback

## Current status
Phase 2 targeted refinement complete:
- Unavailable official email, room address, and GitHub org links eliminated.
- Clean sans-serif typography standardized across entire site.
- Student project repository privacy model fully applied.
- Gallery restructured into event-wise photo albums with full-screen interactive viewer.
- TypeScript checks clean (0 errors).
- Application verified and ready for Phase 3 Supabase backend integration.
