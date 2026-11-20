---
description: Review Code2Chill before merging or deploying a release.
---

1. Read `TESTING.md` and `SECURITY.md`.
2. Inspect the diff for unrelated changes, secrets, fabricated content and dead controls.
3. Run lint, typecheck, tests and production build.
4. Check public routes, mobile layout, keyboard access, empty/error states and external links.
5. Verify admin role enforcement on server operations and Supabase RLS.
6. Verify storage policies and environment variable handling.
7. Confirm only approved content is public.
8. Update `BUGS.md` and `CHANGELOG.md`.
9. Produce a release report with passed checks, failed checks and unresolved risks.
