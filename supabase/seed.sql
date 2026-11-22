-- ==============================================================================
-- Code2Chill Production Seed Script
-- File: supabase/seed.sql
-- ==============================================================================

-- 1. Insert Verified Site Settings
INSERT INTO public.site_settings (key, value, updated_at) VALUES
  ('official_channels', '{
    "club_name": "Code2Chill",
    "university": "Chitkara University",
    "instagram_url": "https://www.instagram.com/code2chill.osl/",
    "linkedin_url": "https://www.linkedin.com/company/code2chill/posts/"
  }'::jsonb, NOW())
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- 2. Insert Verified Student Team Members (Source of truth: Official November 2026 club roster)
-- All members are university students. No faculty members.
INSERT INTO public.team_members (
  id,
  name,
  slug,
  designation,
  group_name,
  bio,
  linkedin_url,
  display_order,
  has_consent,
  is_published,
  created_at,
  updated_at
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Lakshay Kalra',
    'lakshay-kalra',
    'President',
    'Leadership',
    'the backbone and the mastermind of Code2Chill, a leader and visionary that strives to take technical innovation to new heights.',
    'https://www.linkedin.com/in/lakshay-kalra-5667ba387/',
    1,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Jiya Arora',
    'jiya-arora',
    'Vice President',
    'Leadership',
    'The Universal support pillar and the one that makes sure code2chill runs smoothly with no bugs in the system 😉',
    'https://www.linkedin.com/in/jiya-arora-13b214377/',
    2,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Samanyu Thakur',
    'samanyu-thakur',
    'Technical Head',
    'Core Leads',
    'a Beast in the technical field with vast knowledge over the great spread of technical skills and a mentor that makes learning and refinement feel like a breeze.',
    'https://www.linkedin.com/in/samanyu-thakur-76622b386/',
    3,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Bhupinder Singh',
    'bhupinder-singh',
    'Technical Head',
    'Core Leads',
    'the epitome of discipline with technical knowledge that spans into the unknown, a proof that hard work and consistency never goes to waste.',
    'https://www.linkedin.com/in/bhupindersinghmann/',
    4,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Jashan Bhalla',
    'jashan-bhalla',
    'Social Media Head',
    'Core Leads',
    'the sunshine of code2chill, the man behind the camera making sure that Code2Chill always shines brightest in every way possible.',
    'https://www.linkedin.com/in/jashan-bhalla-7b6539213/',
    5,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Ayush Sharma',
    'ayush-sharma',
    'Content Head',
    'Core Leads',
    'Mastermind of all our ideas, the one that combines creativity with his extensive technical knowledge to make sure ‘Code’ and ‘Chill’ always go hand in hand',
    'https://www.linkedin.com/in/ayushthisside/',
    6,
    true,
    true,
    NOW(),
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'Tamanna Kakkar',
    'tamanna-kakkar',
    'Content Head',
    'Core Leads',
    'A beautiful combination of wits and creativity that makes sure that code2chill always stays ahead of the game and that every event is a massive success',
    'https://www.linkedin.com/in/tamanna-kakkar-995b73385/',
    7,
    true,
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  designation = EXCLUDED.designation,
  group_name = EXCLUDED.group_name,
  bio = EXCLUDED.bio,
  linkedin_url = EXCLUDED.linkedin_url,
  display_order = EXCLUDED.display_order,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- ==============================================================================
-- BOOTSTRAPPING INSTRUCTIONS FOR SUPER_ADMIN
-- ==============================================================================
-- To provision your initial super_admin account:
-- 1. Create a user via Supabase Dashboard -> Authentication -> Users -> "Invite User" or "Add User" (with email and password).
-- 2. Run the following SQL query in the Supabase SQL Editor replacing <USER_ID> with the created user's UUID:
--
--    INSERT INTO public.admin_memberships (user_id, role)
--    VALUES ('<USER_ID>', 'super_admin')
--    ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
--
-- 3. The user can now log into /admin/login with their email and password.
