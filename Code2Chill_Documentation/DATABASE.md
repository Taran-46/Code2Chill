# DATABASE.md — Proposed Supabase schema

This is the logical schema. Implement it through versioned SQL migrations; do not manually create an undocumented production schema.

## 1. profiles
- id uuid primary key references auth.users(id) on delete cascade
- display_name text
- created_at timestamptz default now()

## 2. admin_memberships
- user_id uuid references auth.users(id) on delete cascade
- role text check in ('super_admin','editor')
- created_at timestamptz default now()
- primary key (user_id)
Only a trusted provisioning process/super_admin may grant or change roles. Do not let users update their own role.

## 3. team_members
- id uuid primary key default gen_random_uuid()
- name text not null
- slug text unique
- designation text not null
- group_name text
- bio text
- photo_path text
- linkedin_url text
- email_public text
- display_order integer default 0
- is_published boolean default false
- created_at, updated_at timestamptz

## 4. events
- id uuid primary key default gen_random_uuid()
- title text not null
- slug text unique not null
- summary text
- description text
- category text
- poster_path text
- start_at timestamptz not null
- end_at timestamptz
- timezone text default 'Asia/Kolkata' (confirm event timezone)
- venue text
- registration_mode text check in ('none','external','internal')
- registration_url text
- registration_deadline timestamptz
- capacity integer nullable
- status text check in ('draft','published','cancelled')
- featured boolean default false
- created_at, updated_at timestamptz
Validate end_at >= start_at and require registration_url for external mode.

## 5. event_gallery
- id uuid primary key default gen_random_uuid()
- event_id uuid references events(id) on delete set null
- image_path text not null
- alt_text text
- caption text
- display_order integer default 0
- is_published boolean default false
- created_at timestamptz

## 6. projects
- id uuid primary key default gen_random_uuid()
- title text not null
- slug text unique not null
- summary text
- description text
- category text
- cover_path text
- tech_stack text[] default '{}'
- github_url text
- demo_url text
- status text check in ('draft','published','archived')
- featured boolean default false
- created_at, updated_at timestamptz

## 7. project_contributors
- id uuid primary key default gen_random_uuid()
- project_id uuid references projects(id) on delete cascade
- team_member_id uuid references team_members(id) on delete set null
- contributor_name text
- display_order integer default 0
Use either linked member or contributor_name; do not require a public team profile for every contributor.

## 8. announcements
- id uuid primary key default gen_random_uuid()
- title text not null
- body text not null
- target_url text
- published boolean default false
- publish_at timestamptz
- expires_at timestamptz
- created_at, updated_at timestamptz

## 9. registrations (only when internal registration is implemented)
- id uuid primary key default gen_random_uuid()
- event_id uuid references events(id)
- full_name text not null
- email text not null
- optional fields only when justified
- consent_at timestamptz
- created_at timestamptz
Define retention, duplicate handling, export permissions and privacy notice before enabling this table.

## 10. site_settings
Prefer a controlled key/value or typed settings model for public settings such as club description, university label, Instagram URL and contact email. Restrict writes to super_admin.

## Indexes and constraints
- Unique indexes on slugs.
- Index event start_at/status and published fields used in public queries.
- Index announcement publish_at/expires_at.
- Add created_at/updated_at maintenance strategy.
- Validate URLs and required combinations server-side.
- Use foreign keys and sensible delete behaviour.

## RLS policy principles
- Anonymous: SELECT only published public rows.
- Authenticated non-admin: no content writes.
- Editor: write permitted content tables only.
- Super admin: full approved administrative operations.
- Role checks must use a secure database function/policy pattern that cannot be self-escalated.
- Storage policies must mirror content permissions.
- Never expose service-role credentials to the browser.

Exact SQL and policies must be reviewed and tested before production.
