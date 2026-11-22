-- Code2Chill Production Database Schema Migration
-- Version: 00001_initial_schema.sql
-- Description: Core tables, relational constraints, security helper functions, Row Level Security (RLS) policies, and Supabase Storage bucket definitions

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES (Extends Supabase auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 2. ADMIN_MEMBERSHIPS (Role-Based Access Control)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_memberships (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Security helper functions (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_memberships
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_memberships
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 3. TEAM_MEMBERS (100% Student-Driven: No Faculty Members)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  designation TEXT NOT NULL,
  group_name TEXT NOT NULL CHECK (group_name IN ('Leadership', 'Core Leads', 'Track Leads', 'Core Team', 'Alumni')),
  bio TEXT,
  photo_path TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  has_consent BOOLEAN DEFAULT true NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 4. EVENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Workshop', 'Hackathon', 'Tech Talk', 'Community')),
  poster_path TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  timezone TEXT DEFAULT 'Asia/Kolkata' NOT NULL,
  venue TEXT,
  registration_mode TEXT DEFAULT 'none' NOT NULL CHECK (registration_mode IN ('none', 'external', 'internal')),
  registration_url TEXT,
  registration_deadline TIMESTAMPTZ,
  capacity INTEGER,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'cancelled', 'archived')),
  featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT chk_event_dates CHECK (end_at IS NULL OR end_at >= start_at)
);

-- ==============================================================================
-- 5. PROJECTS (With Strict Privacy and Consent Controls)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  problem_solved TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_path TEXT,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  is_repo_public BOOLEAN DEFAULT false NOT NULL,
  has_repo_consent BOOLEAN DEFAULT false NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. PROJECT_CONTRIBUTORS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.project_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  contributor_name TEXT NOT NULL,
  role TEXT,
  has_consent BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL
);

-- ==============================================================================
-- 7. GALLERY_ALBUMS (Event-Wise Photo Collections)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_photo_path TEXT NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  event_date DATE,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 8. GALLERY_PHOTOS (Photographs Belonging to Specific Albums)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_published BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 9. ANNOUNCEMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  target_url TEXT,
  target_label TEXT,
  published BOOLEAN DEFAULT false NOT NULL,
  publish_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 10. SITE_SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 11. CONTACT_INQUIRIES (Admin-Only Review, Never Publicly Readable)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE & RELIABILITY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_events_start_status ON public.events(start_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_team_published ON public.team_members(is_published, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status, featured DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_albums_published ON public.gallery_albums(is_published, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_album ON public.gallery_photos(album_id, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.announcements(published, publish_at, expires_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.contact_inquiries(status, created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are readable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. Admin Memberships Policies (Strictly super_admin managed)
CREATE POLICY "Admins can view admin memberships"
  ON public.admin_memberships FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Only super_admins can insert or modify admin memberships"
  ON public.admin_memberships FOR ALL TO authenticated USING (public.is_super_admin());

-- 3. Team Members Policies
CREATE POLICY "Public visitors can view published team members"
  ON public.team_members FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can manage team members"
  ON public.team_members FOR ALL TO authenticated USING (public.is_admin());

-- 4. Events Policies
CREATE POLICY "Public visitors can view published events"
  ON public.events FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins can manage events"
  ON public.events FOR ALL TO authenticated USING (public.is_admin());

-- 5. Projects & Contributors Policies
CREATE POLICY "Public visitors can view published projects"
  ON public.projects FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Public visitors can view contributors of published projects"
  ON public.project_contributors FOR SELECT USING (
    has_consent = true AND EXISTS (
      SELECT 1 FROM public.projects WHERE projects.id = project_contributors.project_id AND (projects.status = 'published' OR public.is_admin())
    )
  );
CREATE POLICY "Admins can manage project contributors"
  ON public.project_contributors FOR ALL TO authenticated USING (public.is_admin());

-- 6. Gallery Albums & Photos Policies
CREATE POLICY "Public visitors can view published albums"
  ON public.gallery_albums FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can manage gallery albums"
  ON public.gallery_albums FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Public visitors can view published album photos"
  ON public.gallery_photos FOR SELECT USING (
    is_published = true AND EXISTS (
      SELECT 1 FROM public.gallery_albums WHERE gallery_albums.id = gallery_photos.album_id AND (gallery_albums.is_published = true OR public.is_admin())
    )
  );
CREATE POLICY "Admins can manage gallery photos"
  ON public.gallery_photos FOR ALL TO authenticated USING (public.is_admin());

-- 7. Announcements Policies
CREATE POLICY "Public visitors can view active announcements"
  ON public.announcements FOR SELECT USING (
    (published = true AND (publish_at IS NULL OR publish_at <= NOW()) AND (expires_at IS NULL OR expires_at > NOW()))
    OR public.is_admin()
  );
CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL TO authenticated USING (public.is_admin());

-- 8. Site Settings Policies
CREATE POLICY "Public visitors can read site settings"
  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Only super_admins can modify site settings"
  ON public.site_settings FOR ALL TO authenticated USING (public.is_super_admin());

-- 9. Contact Inquiries Policies
-- Strict Privacy: Public visitors CANNOT read inquiries!
CREATE POLICY "Admins can view contact inquiries"
  ON public.contact_inquiries FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can update inquiry status"
  ON public.contact_inquiries FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Public visitors can submit inquiries"
  ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- 12. STORAGE BUCKET CONFIGURATION & POLICIES
-- ==============================================================================
-- Buckets to be created in Supabase Dashboard or via Storage API:
-- 1. 'team-photos' (Public read for published members, 5MB max, image/jpeg, image/png, image/webp)
-- 2. 'event-media' (Public read for event covers, 10MB max)
-- 3. 'project-media' (Public read for project covers, 10MB max)
-- 4. 'gallery-albums' (Public read for album photographs, 15MB max)

-- Storage RLS (Insert / Update / Delete restricted to authenticated admins):
-- Example policy for 'gallery-albums':
-- CREATE POLICY "Public read on gallery-albums" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-albums');
-- CREATE POLICY "Admin upload to gallery-albums" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery-albums' AND public.is_admin());
-- CREATE POLICY "Admin delete from gallery-albums" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery-albums' AND public.is_admin());
