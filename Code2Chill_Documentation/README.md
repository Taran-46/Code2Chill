# Code2Chill — Official Club Website

A public-facing website and content-management platform for the Code2Chill university technical club.

## Project goals
- Explain the club's identity, activities and community.
- Publish leadership/team information, events, projects, announcements and event photography.
- Let authorized club administrators maintain content without editing source code.
- Provide a responsive, accessible and maintainable experience for future club teams.

## Planned stack
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Motion for restrained animation
- Supabase: PostgreSQL, Auth and Storage
- Zod for validation; React Hook Form where forms justify it
- Vercel hosting; GitHub version control

Do not assume versions. Use stable compatible versions available when implementation begins and record exact versions in `package.json`.

## Getting started
1. Install the current supported Node.js LTS version.
2. Install dependencies using the package manager indicated by the lockfile.
3. Copy `.env.example` to `.env.local`.
4. Create/configure a Supabase project and fill in the required environment variables.
5. Apply SQL migrations in `supabase/migrations/`.
6. Run the development server using the package script defined in `package.json`.

## Documentation order
Read `PROJECT.md`, `AI_RULES.md`, `DECISIONS.md`, `FEATURES.md`, `UI_UX_GUIDE.md`, `ARCHITECTURE.md`, `ROADMAP.md` and `TASKS.md`. Read the database/security/API documents before changing related functionality.

## Content integrity
All club names, roles, dates, statistics, event details, achievements, contact details and links must be supplied or verified by the club. Never invent them. Use clearly labelled placeholders until confirmed.
