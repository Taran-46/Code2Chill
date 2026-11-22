# PROJECT.md — Code2Chill

## 1. Project identity
- Project name: Code2Chill
- Project type: Official university technical-club website and content platform
- University: Chitkara University (Punjab, India) — student-led community affiliation; no permanent room, office or physical building is claimed.
- Audience: University students, prospective members, alumni, collaborators and the technical community.
- Access: Public read access; restricted multi-administrator area.
- Verified brand assets: Official club logo. Confirmed official Instagram: `https://www.instagram.com/code2chill.osl/`.
- Verified constraints:
  - No official club email address currently exists (removed all placeholders; direct contact via Instagram or queued inquiry form).
  - No permanent club office or physical room exists on campus (university affiliation only).
  - No official GitHub organization or repository currently exists.
  - Member project repositories are private by default and require contributor consent before publication.

## 2. Purpose
Code2Chill is an active student technical community at Chitkara University. The website communicates what the club stands for, documents its activities, showcases work by its members with strict privacy protection, and makes it easy to discover events and connect via official channels.

Suggested positioning:
“Learn. Build. Connect.”

Description:
“Code2Chill is an active student-driven technical community at Chitkara University. We bring curious minds together to explore modern engineering, build practical software, and collaborate across technical disciplines.”

## 3. Outcomes
1. Visitors can understand the club within a few seconds without artificial AI tropes.
2. Visitors can discover current and previous workshops, hackathons, and sessions.
3. Visitors can learn about student leads and track mentors.
4. Visitors can explore student projects with privacy and ownership respected (no forced public repos).
5. Visitors can browse event-based photo albums documenting community memories.
6. Visitors can connect directly via verified Instagram or submit inquiries for coordinator review.
7. Authorized administrators can update website content safely via Supabase backend.
8. Future club teams can inherit and operate the site seamlessly.

## 4. Scope
### Initial release
- Home (Hero, About, Activities, Featured Event, Selected Projects, Team Preview, FAQ, Contact)
- Team directory (categorized student leads and track coordinators)
- Events: upcoming, past, and event details with live countdown timer
- Projects: student showcase with Problem Solved, tech stack, optional live demo, and strict repository privacy controls
- Gallery: event-wise photo albums with cover photos, photo counts, and interactive modal viewer
- Contact: official Instagram integration and queued inquiry submission
- Admin login and role-protected dashboard (Phase 4)
- Content management for events, team, projects, albums/photos, and announcements (Phase 4)

### Later / optional
- Built-in event registration and participant management
- Member accounts
- Certificates of participation
- Newsletter

## 5. Non-goals
- Do not build a social network or chat platform.
- Do not add public user accounts unless separately approved.
- Do not invent fake emails, rooms, phone numbers, or GitHub links.
- Do not force students to make personal code repositories public.
- Do not use stereotypical AI-generated decorative monospace typography on normal UI elements.

## 6. Success criteria
- The site works responsively on mobile, tablet, and desktop.
- Clean, natural typography: modern sans-serif (Inter) for headings, body, cards, and details; monospace reserved strictly for actual code.
- Public content is database-driven after Supabase backend integration.
- Admin actions are authenticated and authorized on the server/database.
- No secrets are exposed in browser bundles or public repositories.
- Zero broken links or placeholder emails.
