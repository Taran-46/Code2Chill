# ENVIRONMENT.md

Copy `.env.example` to `.env.local` for local development. Obtain values from the project owner's Supabase/Vercel dashboards; never invent or commit secrets.

## Expected variables
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase publishable/anon key intended for client use, protected by RLS.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only privileged key, only if a specific trusted server operation requires it. Prefer user-scoped server clients where possible. Never expose to client.
- `NEXT_PUBLIC_SITE_URL`: canonical public site URL for metadata/links.

Use current Supabase key naming from the project dashboard. Do not assume legacy key formats if the project provides newer publishable/secret keys.

## Rules
- `.env.local` must be ignored by Git.
- `.env.example` contains variable names and explanatory placeholders, never real credentials.
- Configure production values in Vercel project settings.
- Never paste secrets into AI prompts, screenshots, issues or public repositories.
