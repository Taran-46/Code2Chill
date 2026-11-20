# ARCHITECTURE.md — Technical architecture

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui where it improves consistency
- Motion for animation
- Lucide React icons
- Supabase PostgreSQL, Auth and Storage
- Zod validation
- React Hook Form for complex forms
- Vercel deployment
- GitHub source control

Use compatible stable versions at setup time; exact versions are recorded in package.json and the lockfile.

## High-level structure
- Public routes render published content.
- Admin routes require authenticated sessions.
- Server components are the default for data-heavy pages.
- Client components are limited to interactive UI such as menus, tabs, countdowns, forms and lightboxes.
- Server-side code performs privileged operations and validates input.
- Supabase RLS is the final database access boundary.

## Suggested source structure
src/
  app/
    (public)/
      page.tsx
      team/page.tsx
      events/page.tsx
      events/[slug]/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      gallery/page.tsx
      join/page.tsx
    admin/
      login/page.tsx
      (protected)/
        layout.tsx
        dashboard/page.tsx
        events/
        team/
        projects/
        gallery/
        announcements/
        admins/
        settings/
    api/                 # only when a route handler is justified
  components/
    layout/
    home/
    team/
    events/
    projects/
    gallery/
    admin/
    ui/
  lib/
    supabase/
    auth/
    validations/
    data/
    utils/
  types/
  config/

supabase/
  migrations/
  seed.sql              # development-only sample data, never production fake content

## Data flow
1. Public page requests published data from server-side queries.
2. Admin submits a form.
3. Server validates with Zod and verifies the current user's role.
4. Server performs the database/storage operation.
5. RLS independently checks database permissions.
6. UI revalidates or refreshes affected content.

## Supabase clients
Use separate browser and server client utilities following current Supabase SSR guidance. Do not use service-role credentials in browser code. Keep cookie/session handling aligned with the current supported Supabase/Next.js integration.

## Caching and freshness
Choose caching deliberately. Public content can be cached with revalidation; admin mutations must invalidate relevant paths/tags. If near-instant event updates are required, consider Supabase Realtime; do not add it without a concrete need. A countdown is client display logic, not a substitute for server-side date/status logic.

## Deployment
Vercel hosts the Next.js app. Supabase hosts database/auth/storage. Configure separate development and production environments. Keep secrets in environment settings, not source control.
