# Code2Chill — Administrator Security & Bootstrap Architecture

## 1. Multi-Administrator Security Model

The administration system supports two discrete administrative roles:
1. **`super_admin`**: Full platform authority. Can invite/provision new administrators, alter administrative roles, configure university/club site settings, and perform all content operations.
2. **`editor`**: Content management authority. Can create, edit, publish, archive, and delete events, team profiles, member projects, photo gallery items, and announcements. Cannot view or alter administrative memberships or security credentials.

### Access Control Principles
- **No Public Signup**: There is strictly no public registration route for administrators. Admin accounts can only be provisioned via the Supabase Auth Admin API or invited by an existing `super_admin`.
- **Database Boundary (RLS)**: Row Level Security policies enforce role checks at the database layer using `SECURITY DEFINER` helper functions (`is_admin()` and `is_super_admin()`).
- **Server-Side Validation**: All admin mutations (via Next.js Server Actions) verify the user session and role on the server before executing queries. Client-side UI state is never trusted as authorization.
- **No Self-Privilege Escalation**: RLS prevents any user from updating their own row in the `admin_memberships` table.

---

## 2. Procedure for Bootstrapping the First `super_admin`

Because public admin registration is blocked, creating the very first administrator requires a controlled out-of-band bootstrap procedure.

### Step 1: Create the User in Supabase Auth
In your development or production Supabase Dashboard:
1. Navigate to **Authentication > Users**.
2. Click **Add User > Invite user** (or **Create user** with a strong password).
3. Enter the official club administrator email (e.g. `lead.admin@chitkara.edu.in`).
4. Note the generated User `UUID` (e.g. `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

### Step 2: Grant `super_admin` Role via Migration / SQL Console
Execute the following secure SQL snippet in the Supabase SQL Editor (or via `supabase/migrations/`):

```sql
-- Step 2: Provision the initial super_admin safely
-- Replace with the exact UUID of the user created in Step 1
DO $$
DECLARE
  target_user_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::UUID;
BEGIN
  -- Verify user exists in auth.users
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) THEN
    -- Ensure profile exists
    INSERT INTO public.profiles (id, display_name)
    VALUES (target_user_id, 'Primary Super Administrator')
    ON CONFLICT (id) DO NOTHING;

    -- Assign super_admin role
    INSERT INTO public.admin_memberships (user_id, role)
    VALUES (target_user_id, 'super_admin')
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'super_admin';
    
    RAISE NOTICE 'User % has been successfully provisioned as super_admin.', target_user_id;
  ELSE
    RAISE EXCEPTION 'Target user ID % does not exist in auth.users. Create the auth user first.', target_user_id;
  END IF;
END $$;
```

### Step 3: Subsequent Admin Invitations
Once the first `super_admin` is created:
1. The `super_admin` logs into `/admin/login`.
2. In the Admin Dashboard under **Settings > Administrators**, the `super_admin` enters the colleague's university email and selects the role (`editor` or `super_admin`).
3. The server action calls Supabase Auth Admin invite and inserts the row into `public.admin_memberships`.
