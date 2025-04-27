export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          education: Json[]
          skills: string[]
          experiences: Json[]
          interests: string[]
          career_goals: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          education?: Json[]
          skills?: string[]
          experiences?: Json[]
          interests?: string[]
          career_goals?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          education?: Json[]
          skills?: string[]
          experiences?: Json[]
          interests?: string[]
          career_goals?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      career_paths: {
        Row: {
          id: string
          title: string
          description: string
          required_skills: string[]
          education_requirements: string[]
          salary_range: Json
          job_outlook: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          required_skills?: string[]
          education_requirements?: string[]
          salary_range?: Json
          job_outlook?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          required_skills?: string[]
          education_requirements?: string[]
          salary_range?: Json
          job_outlook?: string
          created_at?: string
          updated_at?: string
        }
      }
      educational_resources: {
        Row: {
          id: string
          title: string
          description: string
          url: string
          resource_type: string
          career_path_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          url: string
          resource_type: string
          career_path_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          url?: string
          resource_type?: string
          career_path_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      job_opportunities: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          description: string
          requirements: string[]
          salary_range: Json | null
          application_url: string
          career_path_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          description: string
          requirements?: string[]
          salary_range?: Json | null
          application_url: string
          career_path_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          description?: string
          requirements?: string[]
          salary_range?: Json | null
          application_url?: string
          career_path_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_bookmarks: {
        Row: {
          id: string
          user_id: string
          career_path_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_path_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_path_id?: string
          created_at?: string
        }
      }
      assessment_results: {
        Row: {
          id: string
          user_id: string
          assessment_type: string
          results: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_type: string
          results: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_type?: string
          results?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
