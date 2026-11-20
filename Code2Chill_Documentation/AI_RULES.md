# AI_RULES.md — Rules for every coding agent

## Before changing code
1. Read `PROJECT.md`, `DECISIONS.md`, `FEATURES.md`, `TASKS.md` and relevant technical/design documents.
2. Inspect the existing repository and current implementation. Do not assume the project is empty.
3. Identify the exact task, acceptance criteria, affected files and risks.
4. If a requirement is ambiguous or requires real club information, ask or use a clearly marked placeholder. Never fabricate facts.

## Implementation rules
- Work in small, verifiable stages. Do not generate the entire application in one pass.
- Preserve working functionality. Avoid unrelated rewrites and unnecessary refactors.
- Use TypeScript; avoid `any` unless justified and documented.
- Keep components focused and reusable where reuse is real.
- Follow the existing naming, formatting and package-manager conventions.
- Do not add dependencies without explaining the need and checking whether the current stack already solves it.
- Do not duplicate source-of-truth content in multiple places.
- Use server components by default; add client components only for actual interactivity.
- Validate all untrusted input on the server.
- Handle loading, empty, success and error states.
- Make every visible interactive control perform its stated action.
- Do not leave fake buttons, dead links, TODO-only functionality or simulated backend behaviour in production paths.
- Do not use generated images as substitutes for actual club members, events, awards or university identity.
- Use supplied assets and verified content. Clearly label placeholders.

## Design rules
- Follow `UI_UX_GUIDE.md`.
- Light editorial visual direction; the existing logo is the identity anchor.
- Do not default to generic AI landing-page patterns, purple gradients, excessive glassmorphism, random blobs or repeated identical card grids.
- Prioritize typography, whitespace, composition, real photography, hierarchy and responsive behaviour.
- Motion must be purposeful, subtle, performant and respect reduced-motion preferences.
- Do not create a visual identity that conflicts with the actual logo or university brand rules.

## Security rules
- Never expose Supabase service-role keys, private tokens, passwords or secrets to client code.
- Never trust client-side role checks as authorization.
- Enforce authorization in server-side operations and Supabase RLS.
- Public users may read only published/public content.
- Admin creation must be invitation/provisioning only; never allow public self-registration as an admin.
- Avoid collecting unnecessary personal data.
- Do not log passwords, tokens or sensitive participant information.

## Testing and completion
- Run relevant lint, typecheck, tests and production build commands when available.
- Test affected routes and roles, including unauthorized access.
- Report exactly what changed, what was tested, what failed and what remains.
- Update `TASKS.md`, `BUGS.md`, `CHANGELOG.md` and relevant docs when applicable.
- Never claim a test passed unless it was actually run.
