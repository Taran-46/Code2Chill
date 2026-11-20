# API.md — Backend interface conventions

Prefer server components and server actions for internal application mutations. Add Route Handlers only for external integrations, webhooks or interfaces that need HTTP endpoints.

## Conventions
- Validate every input with Zod on the server.
- Authenticate and authorize before mutation.
- Return predictable success/error results.
- Do not leak stack traces, secrets or database internals.
- Use appropriate HTTP status codes for Route Handlers.
- Revalidate affected routes/tags after successful content changes.
- Use pagination for growing collections.

## Logical operations
- Events: list published, get by slug, create, update, publish, cancel/archive.
- Team: list published, create, update, reorder, hide.
- Projects: list published, get by slug, create, update, publish/archive.
- Gallery: list published, upload, reorder, delete.
- Announcements: list active, create, update, publish/unpublish.
- Settings: read public settings; restricted update.

## External registration
Store a validated HTTPS registration URL. Do not proxy registration data or claim completion.

## Internal registration (future)
Before implementation define:
- Required participant fields.
- Consent/privacy notice.
- Duplicate registration policy.
- Capacity and waitlist rules.
- Deadline and cancellation behaviour.
- Admin export permissions.
- Data retention/deletion process.
- Rate limiting and abuse protection.

## Uploads
- Restrict allowed MIME types and file size.
- Generate safe unique storage paths.
- Verify user role before upload/delete.
- Do not trust filename extensions alone.
- Use appropriate public/private bucket strategy.
