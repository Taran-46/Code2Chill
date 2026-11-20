# DECISIONS.md — Decision register

## Confirmed by project owner
| Topic | Decision |
|---|---|
| Club name | Code2Chill |
| Existing logo | Yes; use as the starting brand asset |
| Visual theme | Light |
| Website access | Public |
| Administrators | Multiple authorized administrators |
| Required extra features | Projects showcase, event registration, announcements |
| University details | University name is available; exact public wording to confirm |
| Social | Club Instagram available; member LinkedIn links may be collected |

## Recommended decisions for approval / implementation
| Topic | Recommendation |
|---|---|
| Framework | Next.js App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Motion, restrained |
| Backend | Supabase |
| Database | PostgreSQL |
| Auth | Supabase Auth |
| Media | Supabase Storage |
| Hosting | Vercel |
| Version control | GitHub |
| Admin roles | super_admin and editor initially |
| Registration | External URL initially; internal registration later if needed |
| Public routes | Home, Team, Events, Projects, Gallery, Join/Contact |
| Event status | Draft/published/cancelled plus date-derived temporal status |

## Decision change process
When changing a decision:
1. Explain why the existing decision no longer fits.
2. Identify affected code, docs, migrations and deployment settings.
3. Obtain project-owner approval for material changes.
4. Update this file and relevant docs.
5. Record migration/rollback implications.

Do not silently replace the agreed stack or visual direction.
