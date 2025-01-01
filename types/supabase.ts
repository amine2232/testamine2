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
      assistants: {
        Row: {
          id: string
          name: string
          company_name: string | null
          user_id: string
          created_at: string
          updated_at: string
          who_speaks_first: string
          welcome_message: string
          script: string | null
        }
        Insert: {
          id?: string
          name: string
          company_name?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
          who_speaks_first?: string
          welcome_message?: string
          script?: string | null
        }
        Update: {
          id?: string
          name?: string
          company_name?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
          who_speaks_first?: string
          welcome_message?: string
          script?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}