# FEATURES.md — Product requirements

Priority labels: P0 = required for initial release; P1 = valuable initial/near-term feature; P2 = later enhancement.

## Global layout & Typography (P0)
- Clean, natural typography: modern sans-serif (Inter) across all normal headings, event details, dates, times, venues, cards, and badges. Monospace is strictly reserved for genuine code snippets.
- Responsive header with official Code2Chill logo, clean navigation, active states, and announcement banner.
- Responsive footer with verified Chitkara University affiliation, official Instagram link, and clean copyright. No placeholder emails or fake office addresses.
- Dark theme styling with deep void backdrop (`#030712`), luminous blue borders (`#080E1E`), and electric cyan highlights.

## Home (P0)
- Hero: student-driven positioning ("Learn. Build. Connect."), primary CTA, and secondary CTA.
- Philosophy & About: realistic student community narrative.
- Club activities: 4 core activity areas (Workshops, Hackathons, Systems & Architecture, Open Source).
- Featured upcoming event: dynamically selected from published events.
- Selected student projects: respects repository privacy.
- Student leadership preview: links to team directory.
- Accessible FAQ accordion & Contact CTA.

## Team (P0)
- Group student members by category: Leadership & Core, Track Leads & Mentors.
- Name, designation, student focus/track, and university affiliation.
- No unverified social links or placeholder emails.

## Events (P0)
- Events listing with Upcoming and Past archive.
- Category filters (Workshops, Hackathons, Technical Talks, Community).
- Event detail route (`/events/[slug]`): clean sans-serif event metadata (Date, Time, Venue, Capacity), full schedule breakdown, rules, and registration button.
- Live countdown timer with Asia/Kolkata timezone awareness.

## Projects — Privacy & Ownership (P0)
- Showcase student software, utilities, and applications.
- Fields: title, slug, summary, problem statement (`problemSolved`), full description, cover image, category, tech stack, contributors, optional demo URL, optional GitHub URL, publication status, repository consent status.
- Strict Privacy Controls:
  - Repositories are private by default.
  - GitHub repository links are optional and only rendered if explicitly consented to by the student owner (`hasRepoConsent: true`) and published by an administrator (`isRepoPublic: true`).
  - Projects can be showcased completely with screenshots, problem solved, and live demos without forcing students to expose source code.
  - Visual lock badge indicating source code privacy when repository is not published.

## Gallery — Event-wise Photo Albums (P0)
- Replaced flat photo stream with dedicated event-based albums/collections.
- Album cards: cover photograph, event/album title, description/caption, event date, photo count badge (e.g. "4 Photos").
- Interactive Album Lightbox Modal:
  - Opens photographs belonging strictly to the selected album.
  - Previous and Next buttons with cyclic looping.
  - Counter indicator: "Photo X of Y".
  - Caption and alt text display.
  - Keyboard navigation (ArrowLeft, ArrowRight, Escape).
  - Mobile touch/swipe navigation (`onTouchStart` / `onTouchEnd`).
  - Clear close button and backdrop click dismissal.
  - Body scroll lock when open.

## Contact & Inquiries (P0)
- Primary channel: Official Instagram (`@code2chill.osl`) with direct verified link.
- University affiliation: Chitkara University (Punjab, India).
- Inquiries submission form:
  - Clear explanation: submissions are queued securely for authorized student coordinators to review.
  - Does NOT falsely claim an email was sent.
  - Clean sans-serif form inputs with validation and instant confirmation message.

## Admin Dashboard (Phase 4 — P0)
- Supabase Auth integration with role checks (`super_admin`, `editor`).
- Management interfaces for:
  - Events (CRUD, registration link, draft/published status)
  - Team (members, roles, display order)
  - Projects (CRUD, problem statement, repository privacy toggle, contributor consent check)
  - Gallery Albums & Photographs (album creation, photo uploads to Supabase Storage, cover photo selection, reordering, deletion)
  - Announcements
  - Inquiries review
