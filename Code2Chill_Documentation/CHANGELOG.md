# CHANGELOG.md

All notable project changes should be recorded here. Keep entries factual and concise.

- Real Team Data Integration, Content Audit & Phase 3/4 Backend Implementation:
  1. **Real Team Data Integrated**: Integrated the 7 verified student coordinators from official club records into `mockTeamMembers`, `TeamPage`, and `seed.sql`:
     - Lakshay Kalra (President)
     - Jiya Arora (Vice President)
     - Samanyu Thakur (Technical Head)
     - Bhupinder Singh (Technical Head)
     - Jashan Bhalla (Social Media Head)
     - Ayush Sharma (Content Head)
     - Tamanna Kakkar (Content Head)
     Added verified LinkedIn links, exact descriptions, clean initial monograms, and non-empty category grouping (`Leadership`, `Core Leads`). All faculty references eliminated.
  2. **Sample Event Content Removed**: Eliminated the sample Next.js workshop, sample venue, and placeholder registration form from the public website. Built an elegant, polished empty state for upcoming sessions pointing to official Instagram and LinkedIn channels.
  3. **Public Claims Neutralized**: Audited and replaced unverified claims across all pages (FAQs, hero sub-meta, activity cards, and marquee):
     - Removed "all club events are free", "all years and branches", "systems architecture", "open source sprints", "peer code reviews", and "mentoring circles".
     - Standardized on confirmed, neutral, and realistic university student community messaging.
  4. **Activity Marquee Refined**: Replaced repeated unverified activities with confirmed club items; added `aria-hidden="true"` to duplicate tracks to prevent screen-reader repetition; added pause-on-hover.
  5. **Supabase Schema & Seed Migration**: Updated `supabase/migrations/00001_initial_schema.sql` with all 11 tables, RLS policies, and storage bucket definitions. Created `supabase/seed.sql` with the 7 verified team members and initial site settings.
  6. **Edge Route Protection Middleware**: Added `src/middleware.ts` protecting all `/admin/*` routes with session verification via `@supabase/ssr`, redirecting unauthenticated visitors to `/admin/login`.
  7. **Complete Coordinator Admin Dashboard Built**:
     - `/admin/login`: Coordinator login form wrapped in Suspense boundary.
     - `/admin/layout.tsx`: Dark admin navigation shell with sign-out and public site shortcut.
     - `/admin`: Overview dashboard with published/unpublished content metrics.
     - `/admin/team`: Team member management with publication toggles and order tracking.
     - `/admin/events`: Workshop and session scheduling interface.
     - `/admin/projects`: Project showcase management with repository privacy (`is_repo_public`) and consent flags.
     - `/admin/gallery`: Event-based photo album & photo collections management.
     - `/admin/announcements`: Header banner announcement management with automatic expiry.
     - `/admin/inquiries`: Confidential inquiries inbox with status review (new, reviewed, resolved).
     - `/admin/settings`: Official social channels management and super_admin bootstrapping guide.
  8. **Production Build Verified**: Next.js 14 production build succeeded with 24/24 routes passing and 0 TypeScript errors.

## Unreleased
- Initial Code2Chill project documentation and implementation plan created.
- Completed Phase 0 (Workspace alignment, mirrored .agent/ to workspace root).
- Completed Phase 1 (Next.js 14 App Router, TypeScript, Tailwind design tokens, typography, brand logo SVG, responsive Header/Footer, Mobile Nav drawer, UI component primitives, Asia/Kolkata date & registration helpers, typed mock layer, and initial Supabase SQL schema with super_admin bootstrap documentation).
- Completed Phase 2 (Built authentic public Home landing page, Team directory by group, Events listing with upcoming/past archive and category filtering, Event Details page with live countdown timer and registration action, Projects showcase & Project Details case study pages, Photo Gallery with interactive Lightbox modal, and moved design system showcase to dedicated /design-system route).
- Refined Phase 2 per user review: replaced Join with dedicated /contact page with direct inquiry mailto workflow and official channels, redesigned and simplified Homepage into an introductory portal (Hero with visual code card, About narrative, 4 compact activity blocks, ONE featured event, 2 selected projects, team preview, accessible FAQ accordion, and final Contact CTA), removed excessive monospace fonts across badges and UI, relaxed heading typography and tracking, and audited all internal navigation links to match: Home | Team | Events | Projects | Gallery | Contact.
- Applied Official Code2Chill Logo & Brand System: integrated the official circular logo asset in the Header, Footer, Hero, and browser favicon; derived a cohesive Midnight Navy (#070B16 / #0B1224) and Electric Cerulean Blue (#2563EB to #38BDF8) palette with light Slate canvas (#F8FAFC) for high readability; completely removed all faculty-related sections, roles, and references to establish a 100% student-driven technical community identity; resolved duplicate team preview on the homepage into a single student community section.
- Dark Void & Luminous Blue Aesthetic Transformation (Option A): Pivoted design system to a deep obsidian void (`#030712` / `#080E1E`) inspired by peer Chitkara squad DGIT Squad (dgitsquad.vercel.app) and high-compute infrastructure NODDAL (noddal.xyz), coupled with tactile editorial micro-craftsmanship inspired by Ksen Panchenko (ksenpanchenko.com). Integrated razor-sharp borders (`border-white/8`), electric cyan/blue glows, pre-cropped circular logo with transparency, dark glass navigation, smooth image hover zooms (`duration-700 hover:scale-110`), dark interactive accordion, and dark contact form with official Instagram link (`https://www.instagram.com/code2chill.osl/`). All routes verified at HTTP 200 with 0 TypeScript errors.
- Code2Chill Final Content, Typography, Projects & Gallery Refinement:
  1. **Removed Projects from Homepage**: Consolidated student projects to the dedicated `/projects` showcase route, streamlining the homepage flow into: Hero -> Philosophy -> Activities -> Featured Workshop -> Student Leadership -> FAQ -> Contact CTA.
  2. **Bespoke Kinetic Inversion Cursor**: Replaced the previous cyan circle + dot (which resembled DGIT Squad's style) with a custom Awwwards-caliber **Kinetic Inversion Lens** featuring `mix-blend-difference` typography inversion, a trailing atmospheric blue aura, and a tactile click snap with instant zero-latency tracking.
  3. **Removed Unavailable Official Contact Info**: Eliminated all placeholder email addresses (`info@code2chill.org`, `contact@code2chill.org`) from footer, contact page, and metadata. Removed fake campus office locations ("Academic Block · Turing / Newton Hall") and unverified GitHub organization links. Set official Instagram (`https://www.instagram.com/code2chill.osl/`) as primary verified contact channel.
  4. **Comprehensive Typography Refinement**: Audited the entire website and removed artificial, decorative monospace typography (`font-mono`) from normal headings, descriptions, event schedule grids, dates, times, venues, cards, badges, and buttons. Standardized on a clean, modern sans-serif (Inter) hierarchy across Home, Team, Events, Event Details, Projects, Project Details, Gallery, Contact, and 404 pages. Monospace is strictly reserved for genuine code syntax.
  5. **Projects Privacy & Student Ownership**: Redesigned the project showcase model to respect student privacy. Added `problemSolved` field. Repositories are private by default (`isRepoPublic: false`, `hasRepoConsent: false`). GitHub links are optional and only rendered when explicitly authorized by the project contributor and published by an administrator. Added a clear lock indicator for private source code.
  6. **Gallery Event-Wise Photo Albums**: Transitioned gallery from flat loose photographs into structured, event-based photo albums/collections (e.g. Next.js Architecture Workshop, ChillHack Winter Hackathon, Git & GitHub Jumpstart, Club Activities). Each album features a cover image, title, description, event date, and photo count badge. Built an interactive `AlbumModal` viewer supporting album-isolated browsing, Prev/Next navigation, "Photo X of Y" counter, image captions, keyboard navigation (ArrowLeft, ArrowRight, Escape), and mobile touch swipe gestures.
  7. **Contact Page Refinement**: Streamlined contact options to highlight confirmed Instagram and Chitkara University affiliation. Revamped inquiry submission form to state truthfully that submissions are queued securely for authorized student coordinators to review, eliminating false claims of email delivery.
  8. **Documentation & Schema Update**: Updated `PROJECT.md`, `DECISIONS.md`, `FEATURES.md`, `TASKS.md`, and `CHANGELOG.md` to reflect all architectural rules and prepare for Phase 3 Supabase backend integration. Verified with `npx tsc --noEmit` (0 errors).
