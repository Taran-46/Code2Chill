/**
 * Supabase Database TypeScript Definitions for Code2Chill
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AdminRole = 'super_admin' | 'editor';
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'archived';
export type RegistrationMode = 'none' | 'external' | 'internal';
export type ProjectStatus = 'draft' | 'published' | 'archived';
export type InquiryStatus = 'new' | 'reviewed' | 'resolved';

export interface Database {
  public: {
    Tables: {

      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          created_at?: string;
        };
      };
      admin_memberships: {
        Row: {
          user_id: string;
          role: AdminRole;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role: AdminRole;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: AdminRole;
          created_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          slug: string;
          designation: string;
          group_name: string;
          bio: string | null;
          photo_path: string | null;
          linkedin_url: string | null;
          display_order: number;
          has_consent: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          designation: string;
          group_name: string;
          bio?: string | null;
          photo_path?: string | null;
          linkedin_url?: string | null;
          display_order?: number;
          has_consent?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          designation?: string;
          group_name?: string;
          bio?: string | null;
          photo_path?: string | null;
          linkedin_url?: string | null;
          display_order?: number;
          has_consent?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string | null;
          description: string | null;
          category: string;
          poster_path: string | null;
          start_at: string;
          end_at: string | null;
          timezone: string;
          venue: string | null;
          registration_mode: RegistrationMode;
          registration_url: string | null;
          registration_deadline: string | null;
          capacity: number | null;
          status: EventStatus;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary?: string | null;
          description?: string | null;
          category: string;
          poster_path?: string | null;
          start_at: string;
          end_at?: string | null;
          timezone?: string;
          venue?: string | null;
          registration_mode?: RegistrationMode;
          registration_url?: string | null;
          registration_deadline?: string | null;
          capacity?: number | null;
          status?: EventStatus;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string | null;
          description?: string | null;
          category?: string;
          poster_path?: string | null;
          start_at?: string;
          end_at?: string | null;
          timezone?: string;
          venue?: string | null;
          registration_mode?: RegistrationMode;
          registration_url?: string | null;
          registration_deadline?: string | null;
          capacity?: number | null;
          status?: EventStatus;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          problem_solved: string | null;
          description: string;
          category: string;
          cover_path: string | null;
          tech_stack: string[];
          github_url: string | null;
          demo_url: string | null;
          is_repo_public: boolean;
          has_repo_consent: boolean;
          status: ProjectStatus;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          problem_solved?: string | null;
          description: string;
          category: string;
          cover_path?: string | null;
          tech_stack?: string[];
          github_url?: string | null;
          demo_url?: string | null;
          is_repo_public?: boolean;
          has_repo_consent?: boolean;
          status?: ProjectStatus;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          problem_solved?: string | null;
          description?: string;
          category?: string;
          cover_path?: string | null;
          tech_stack?: string[];
          github_url?: string | null;
          demo_url?: string | null;
          is_repo_public?: boolean;
          has_repo_consent?: boolean;
          status?: ProjectStatus;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_contributors: {
        Row: {
          id: string;
          project_id: string;
          contributor_name: string;
          role: string | null;
          has_consent: boolean;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          contributor_name: string;
          role?: string | null;
          has_consent?: boolean;
          display_order?: number;
        };
        Update: {
          id?: string;
          project_id?: string;
          contributor_name?: string;
          role?: string | null;
          has_consent?: boolean;
          display_order?: number;
        };
      };
      gallery_albums: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          cover_photo_path: string;
          event_id: string | null;
          event_date: string | null;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          cover_photo_path: string;
          event_id?: string | null;
          event_date?: string | null;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          cover_photo_path?: string;
          event_id?: string | null;
          event_date?: string | null;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery_photos: {
        Row: {
          id: string;
          album_id: string;
          storage_path: string;
          alt_text: string;
          caption: string | null;
          display_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          album_id: string;
          storage_path: string;
          alt_text: string;
          caption?: string | null;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          album_id?: string;
          storage_path?: string;
          alt_text?: string;
          caption?: string | null;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          body: string;
          target_url: string | null;
          target_label: string | null;
          published: boolean;
          publish_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          target_url?: string | null;
          target_label?: string | null;
          published?: boolean;
          publish_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string;
          target_url?: string | null;
          target_label?: string | null;
          published?: boolean;
          publish_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: InquiryStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: InquiryStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: InquiryStatus;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
