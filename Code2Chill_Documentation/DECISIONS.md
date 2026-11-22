# DECISIONS.md — Decision register

## Confirmed by project owner
| Topic | Decision |
|---|---|
| Club name | Code2Chill |
| University affiliation | Chitkara University (Punjab, India) — student community; no permanent physical room or office |
| Official contact | Official Instagram: `https://www.instagram.com/code2chill.osl/`. No official club email currently exists |
| Official GitHub | None currently exists; no fake org links |
| Brand logo | Official circular Code2Chill logo integrated across Header, Footer, Hero, and Favicon |
| Visual theme | Dark Void & Luminous Blue (#030712 / #080E1E / #2563EB / #38BDF8) with subtle glassmorphism |
| Typography standard | Clean sans-serif (Inter) across all normal headings, descriptions, dates, times, venue, and badges. Monospace prohibited except for actual code blocks |
| Project privacy model | Repositories private by default (`isRepoPublic: false`, `hasRepoConsent: false`). Projects showcased via problem statement, tech stack, screenshots, and live demo without forcing public source code |
| Gallery structure | Event-wise photo albums/collections (cover, title, description, date, photo count) with full-screen modal viewer (Prev/Next, counter, swipe, keyboard nav) |
| Inquiries mechanism | Inquiry form queues submissions for authorized admin review; does not claim email was sent |
| Website access | Public read access; multi-admin role-protected dashboard |

## Recommended decisions for approval / implementation
| Topic | Recommendation |
|---|---|
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Motion + CSS smooth transitions |
| Backend | Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Row Level Security) |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth (super_admin and editor roles) |
| Media | Supabase Storage (event banners, project covers, album photos) |
| Hosting | Vercel |
| Version control | GitHub |
| Registration | External URL initially; internal participant store later |
| Public routes | Home, Team, Events, Events/[slug], Projects, Projects/[slug], Gallery, Contact |

## Decision change process
When changing a decision:
1. Explain why the existing decision no longer fits.
2. Identify affected code, docs, migrations and deployment settings.
3. Obtain project-owner approval for material changes.
4. Update this file and relevant docs.
5. Record migration/rollback implications.
