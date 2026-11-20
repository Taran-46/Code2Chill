# USER_FLOWS.md

## Visitor: discover the club
1. Opens homepage.
2. Understands what Code2Chill is from hero/about content.
3. Explores activities and featured event/projects.
4. Opens Team, Events, Projects or Gallery.
5. Uses official social/contact links to connect.

## Visitor: register for an event (external mode)
1. Opens Events.
2. Selects an upcoming published event.
3. Reviews date, venue, details and registration state.
4. Clicks the official registration URL when registration is open.
5. Completes registration on the external provider.
The website must not claim the visitor is registered because it cannot verify external completion.

## Visitor: view a past event
1. Opens Events > Past.
2. Selects an event.
3. Reviews summary, highlights, photos and results if supplied.

## Visitor: explore a project
1. Opens Projects.
2. Filters/browses published projects.
3. Opens a project detail page.
4. Follows GitHub/demo links if available.

## Admin: sign in
1. Opens `/admin/login`.
2. Signs in using an invited/provisioned account.
3. Server verifies session and role.
4. Authorized admin enters dashboard; others receive a safe denial/redirect.

## Admin: publish an event
1. Opens dashboard > Events > Create.
2. Enters required fields and optional poster/registration details.
3. Server validates fields and permissions.
4. Saves as draft or publishes.
5. Public event listing updates after revalidation.
6. Admin can edit, cancel or archive; event history is retained.

## Admin: update team
1. Opens Team management.
2. Adds/edits a member, role, photo and approved public links.
3. Sets display order and visibility.
4. Saves; public team page updates.

## Admin: publish announcement
1. Creates title and content.
2. Sets publish state and optional expiry.
3. Publishes.
4. Active announcement appears publicly until expiry/unpublish.

## Error and recovery
- Expired session: request sign-in.
- Insufficient role: deny operation and explain access is restricted.
- Validation failure: show field-level messages.
- Upload failure: preserve form values and allow retry.
- Network/server failure: show a useful error; never falsely show success.
