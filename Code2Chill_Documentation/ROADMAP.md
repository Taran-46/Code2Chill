# ROADMAP.md — Delivery plan

## Phase 0 — Discovery and assets
- Confirm official club description, tagline and university naming.
- Collect logo in SVG/PNG and brand usage guidance.
- Collect approved photos and member information/consent.
- Confirm social links, contact details and domain ownership.
- Decide registration mode per event.
**Exit:** content inventory and approved design direction exist.

## Phase 1 — Design system and shell
- Establish typography, colour tokens, spacing and breakpoints.
- Build header, footer, navigation, buttons and common layouts.
- Create responsive homepage visual prototype using approved assets or labelled placeholders.
**Exit:** design is approved on mobile and desktop.

## Phase 2 — Public frontend
- Home, Team, Events listing/detail, Projects listing/detail, Gallery, Announcements, Join/Contact.
- Accessible loading, empty and error states.
- SEO metadata and social previews.
**Exit:** all routes work with structured mock data.

## Phase 3 — Supabase foundation
- Configure environment variables and Supabase clients.
- Create migrations, tables, indexes, constraints and RLS.
- Configure storage buckets and upload policies.
- Seed only clearly labelled sample data in development.
**Exit:** public reads and protected writes are verified.

## Phase 4 — Admin
- Auth and protected routes.
- Role checks on server and database.
- Dashboard and content management for each content type.
**Exit:** authorized admins can maintain all required content; unauthorized users cannot.

## Phase 5 — Dynamic behaviour
- Event date classification, countdown and registration states.
- Featured content and announcements.
- Image management and gallery.
- Optional Realtime or periodic refresh where useful.
**Exit:** changes made in admin appear correctly on public pages.

## Phase 6 — Quality and launch
- Functional, responsive, accessibility, security and performance testing.
- Verify all links and public content.
- Configure production environment, domain and backups.
- Deploy and smoke-test.
**Exit:** launch checklist signed off.

## Later releases
- Built-in registration, emails, certificates, newsletter, sponsors and richer analytics only when there is a real operational need.

## Release discipline
Do not begin a later phase while critical acceptance criteria in the current phase are failing. Update `TASKS.md` after each work session.
