# FEATURES.md — Product requirements

Priority labels: P0 = required for initial release; P1 = valuable initial/near-term feature; P2 = later enhancement.

## Global layout (P0)
- Responsive header with logo, navigation and clear active state.
- Mobile navigation with keyboard support.
- Footer with verified university/club identity, social links and navigation.
- Consistent typography, buttons, form controls and spacing.
- Useful page titles, metadata, favicon and social sharing metadata.

## Home (P0)
- Hero: approved club statement, logo, primary CTA and secondary CTA.
- About: accurate summary of Code2Chill.
- Activity areas: only club-confirmed activities (e.g. workshops, coding sessions, hackathons, tech talks, project collaboration, peer learning).
- Featured upcoming event, sourced from published database content.
- Selected projects, sourced from published projects.
- Selected gallery images.
- Join/contact CTA.
- No fabricated statistics, testimonials, awards or sponsors.

## Team (P0)
- Group members by approved categories such as faculty coordinator, leadership and core team.
- Each profile may contain name, designation, photo, short bio and public LinkedIn URL.
- Optional email only where explicitly approved for public display.
- Support display order and active/hidden status.
- Validate external URLs and use safe external-link behaviour.
- Do not publish personal data without consent.

## Events (P0)
- Events listing with Upcoming and Past views/tabs.
- Event cards: title, poster, date/time, venue, category, short description and registration state.
- Event detail route using a unique slug.
- Detail content: full description, schedule, rules, venue, FAQ, organizer contact and registration CTA where supplied.
- Past event archive remains available.
- Event status values should distinguish draft, published and cancelled. Temporal state (upcoming/ongoing/completed) is derived from dates, not manually guessed.
- Registration modes: none, external URL, internal (optional).
- Registration states: not required, upcoming, open, closed, full (only show full if capacity is actually managed).
- Store dates consistently with timezone information. Display in the event's intended local timezone (normally Asia/Kolkata, after confirmation).
- Countdown is calculated from the event start time in the browser/UI; server data remains the source of truth.
- Do not move/delete records when events pass. Past/upcoming classification is derived from dates and status.

## Projects (P0)
- Projects listing and detail route.
- Fields: title, slug, summary, full description, cover, gallery/screenshots, category, tech stack, contributors, GitHub URL, demo URL, publication status.
- Only published projects appear publicly.
- Do not claim a project is deployed or open source unless the relevant link is verified.

## Gallery (P1)
- Responsive image gallery, optional event filter and lightbox.
- Images may be associated with an event.
- Alt text/captions and display order.
- Only approved photographs are published.

## Announcements (P0)
- Admin-created announcements with title, body, publish state, creation/publish time and optional expiry.
- Homepage announcement strip/section only when an active published announcement exists.
- Expired/unpublished announcements are hidden from public visitors.
- Important announcements should link to a relevant event or page.

## Join / Contact (P0)
- Explain how students can connect or apply.
- Use approved official contact details and social URLs.
- If recruitment is closed, say so rather than presenting a non-functional form.
- Membership form is optional and requires an approved data-handling plan.

## Admin (P0)
- Login route and protected dashboard.
- Roles: super_admin and editor initially. More granular roles may be introduced later.
- Manage events, team, projects, gallery and announcements.
- Upload and replace media.
- Preview draft content where feasible.
- Confirm destructive actions.
- Show validation and operation errors.
- Admin user management restricted to super_admin.
- Audit significant admin actions if feasible.

## Registration (P0 external; P2 internal)
- External: store a validated registration URL per event and open it clearly.
- Internal later: participant form, duplicate prevention, capacity, deadline, consent/privacy notice, export and confirmation workflow.
- Never collect more participant data than required.
