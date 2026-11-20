# SECURITY.md

## Authentication and authorization
- Admin access is invite/provisioning only.
- Never expose public admin signup.
- Verify session and role on the server for every protected operation.
- Enforce database permissions with RLS; UI hiding is not security.
- Prevent users from changing their own role.
- Use least privilege: editor cannot manage admin accounts or security settings.

## Secrets
- Keep `.env.local` out of Git.
- Commit `.env.example` with variable names and safe placeholders only.
- Never expose service-role keys or private tokens through `NEXT_PUBLIC_` variables.
- Rotate any secret accidentally committed or disclosed.

## Public data
- Only publish information intended for public viewing.
- Obtain permission for member photos, bios, LinkedIn URLs and contact details.
- Do not publish personal phone numbers or private student data.
- Avoid collecting participant data unless required.

## Input and output
- Validate all inputs server-side.
- Sanitize/secure rich text and external URLs.
- Avoid unsafe HTML rendering.
- Protect against spam and abuse on public forms.
- Apply sensible upload type/size limits.

## Operations
- Use separate development and production Supabase projects where feasible.
- Back up production data and test restore procedures.
- Keep dependencies updated.
- Review RLS and storage policies before launch.
- Log administrative actions without logging secrets or unnecessary personal data.
