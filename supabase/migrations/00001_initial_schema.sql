-- Code2Chill Initial Schema Migration
-- Version: 00001_initial_schema.sql
-- Description: Core tables, indexes, security helper functions, and Row Level Security (RLS) policies

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. ADMIN_MEMBERSHIPS (Role-Based Access Control)
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

-- 3. TEAM_MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  designation TEXT NOT NULL,
  group_name TEXT NOT NULL CHECK (group_name IN ('Faculty Coordinator', 'Leadership', 'Core Team', 'Alumni')),
  bio TEXT,
  photo_path TEXT,
  linkedin_url TEXT,
  email_public TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  category TEXT NOT NULL,
  poster_path TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  timezone TEXT DEFAULT 'Asia/Kolkata' NOT NULL,
  venue TEXT NOT NULL,
  registration_mode TEXT DEFAULT 'none' NOT NULL CHECK (registration_mode IN ('none', 'external', 'internal')),
  registration_url TEXT,
  registration_deadline TIMESTAMPTZ,
  capacity INTEGER,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'cancelled')),
  featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT chk_event_dates CHECK (end_at IS NULL OR end_at >= start_at)
);

-- 5. EVENT_GALLERY
CREATE TABLE IF NOT EXISTS public.event_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  image_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_path TEXT,
  tech_stack TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. PROJECT_CONTRIBUTORS
CREATE TABLE IF NOT EXISTS public.project_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  team_member_id UUID REFERENCES public.team_members(id) ON DELETE SET NULL,
  contributor_name TEXT NOT NULL,
  role TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL
);

-- 8. ANNOUNCEMENTS
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

-- 9. SITE_SETTINGS (Single row or key-value for public parameters)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- INDEXES FOR HIGH-THROUGHPUT PUBLIC QUERIES
CREATE INDEX IF NOT EXISTS idx_events_start_status ON public.events(start_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_team_published ON public.team_members(is_published, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status, featured DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.announcements(published, publish_at, expires_at);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

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

-- 5. Event Gallery Policies
CREATE POLICY "Public visitors can view published gallery photos"
  ON public.event_gallery FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can manage gallery"
  ON public.event_gallery FOR ALL TO authenticated USING (public.is_admin());

-- 6. Projects & Contributors Policies
CREATE POLICY "Public visitors can view published projects"
  ON public.projects FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Public visitors can view contributors of published projects"
  ON public.project_contributors FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_contributors.project_id AND (projects.status = 'published' OR public.is_admin()))
  );
CREATE POLICY "Admins can manage project contributors"
  ON public.project_contributors FOR ALL TO authenticated USING (public.is_admin());

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
