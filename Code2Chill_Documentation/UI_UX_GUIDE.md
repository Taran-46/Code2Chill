# UI_UX_GUIDE.md — Code2Chill visual system

## Direction
Light editorial + contemporary developer community. The website should feel like a credible student technology organization with a distinctive voice—not a generic SaaS template.

## Brand anchor
The existing Code2Chill logo is authoritative. Inspect its shape, colours and proportions before finalizing tokens. Do not recolour, distort or recreate it without approval. University branding rules take precedence where applicable.

## Provisional palette
These are starting tokens, not final brand colours:
- Warm background: #F7F7F2
- Main text / ink: #171717
- Secondary text: #62666B
- Accent lime: #D8F36A
- Soft blue: #DCE4EE
- Border: #E4E5DF
- Surface: #FFFFFF

Adjust accent and supporting colours after inspecting the real logo. Maintain WCAG contrast; never rely on colour alone to communicate status.

## Typography
- Display/headings: Space Grotesk or a comparable distinctive sans-serif.
- Body: Inter or a readable system sans-serif.
- Technical metadata: JetBrains Mono, used sparingly.
- Use a clear type scale and readable line lengths. Avoid oversized headings on small screens.

## Composition
- Use generous whitespace and strong editorial hierarchy.
- Vary section composition; do not repeat the same 3-card grid for every section.
- Use real event and member photography where permission exists.
- Use consistent image ratios and intentional crops.
- Use subtle grids, code motifs or technical labels only where they reinforce the story.
- Keep content scannable and avoid walls of text.

## Navigation
- Desktop: logo, Home, Team, Events, Projects, Gallery, Join/Contact.
- Announcements may appear as a homepage strip and/or a route if content volume warrants it.
- Mobile: accessible menu with visible focus and escape/close behaviour.
- Admin link should not be prominent in public navigation; admins can use the known login URL.

## Components
Define consistent variants for buttons, links, badges, cards, form fields, dialogs, tabs, pagination and empty states. Avoid one-off styling where a shared pattern is appropriate.

## Motion
- Use Motion only for purposeful transitions, reveals and feedback.
- Keep animations short and restrained.
- Respect `prefers-reduced-motion`.
- Avoid scroll hijacking, distracting parallax, constant motion and animation that blocks content.
- Ensure the site remains usable if animation fails.

## Responsive behaviour
- Design mobile-first.
- Test at narrow mobile, standard mobile, tablet, laptop and wide desktop.
- Prevent horizontal overflow.
- Use touch targets of comfortable size.
- Reflow grids and typography rather than shrinking desktop layouts.

## Accessibility
- Semantic headings and landmarks.
- Keyboard-operable navigation and dialogs.
- Visible focus states.
- Labels and helpful validation for forms.
- Alt text for meaningful images; decorative images have empty alt.
- Sufficient contrast and reduced-motion support.

## Content and imagery
- Never use AI imagery to represent actual club members, events, awards, university buildings or sponsors.
- Do not publish unapproved personal photos or profile links.
- Avoid fake testimonials, fake counters and fabricated event details.
- Use labelled placeholders until real content is supplied.

## Required states
Every data-driven view needs loading, empty, error and populated states. Forms need idle, submitting, success and failure states.
