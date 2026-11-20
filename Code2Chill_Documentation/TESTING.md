# TESTING.md — Quality plan

## Automated checks
- TypeScript typecheck.
- Lint.
- Unit tests for date classification, validation and utility logic.
- Component tests for important interactive states where useful.
- End-to-end tests for public journeys and admin workflows.
- Production build.

## Public-site test cases
- Homepage loads with no published content errors.
- Navigation works on desktop and mobile.
- Only published team/events/projects/announcements appear.
- Event detail slug resolves; unknown slug gives a proper not-found page.
- Upcoming/past classification respects timezone and event dates.
- Countdown handles past, ongoing and future events.
- External registration button only appears when valid and open.
- Gallery images have alt text and open/close accessibly.
- Social links point to verified URLs.

## Admin/security test cases
- Anonymous user cannot access admin pages or mutations.
- Authenticated non-admin cannot perform admin mutations.
- Editor can manage permitted content but cannot manage admins/settings.
- Super admin can manage admin access.
- User cannot self-promote by changing profile or request payload.
- RLS denies unauthorized writes even if requests bypass the UI.
- Upload policies reject unauthorized users and disallowed files.
- Secrets are absent from client bundles and repository.

## Responsive/accessibility
- Test narrow mobile, mobile, tablet, desktop and wide desktop.
- Keyboard-only navigation.
- Visible focus.
- Form labels and validation announcements.
- Contrast and reduced-motion behaviour.
- No horizontal overflow.

## Release gate
Do not launch with critical security failures, broken core routes, fake content, non-working primary actions or failing production build.
Record actual test commands/results in the handover notes.
