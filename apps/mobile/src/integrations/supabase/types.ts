export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          appointment_time?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_tracking: {
        Row: {
          aches_pains: string[] | null
          created_at: string
          energy_level: number | null
          feelings: string[] | null
          gut_feeling: number | null
          id: string
          notes: string | null
          overall_mood: number | null
          quick_tags: string[] | null
          tracking_date: string
          updated_at: string
          user_id: string
          water_goal_met: boolean | null
        }
        Insert: {
          aches_pains?: string[] | null
          created_at?: string
          energy_level?: number | null
          feelings?: string[] | null
          gut_feeling?: number | null
          id?: string
          notes?: string | null
          overall_mood?: number | null
          quick_tags?: string[] | null
          tracking_date: string
          updated_at?: string
          user_id: string
          water_goal_met?: boolean | null
        }
        Update: {
          aches_pains?: string[] | null
          created_at?: string
          energy_level?: number | null
          feelings?: string[] | null
          gut_feeling?: number | null
          id?: string
          notes?: string | null
          overall_mood?: number | null
          quick_tags?: string[] | null
          tracking_date?: string
          updated_at?: string
          user_id?: string
          water_goal_met?: boolean | null
        }
        Relationships: []
      }
      medical_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          document_date: string | null
          file_name: string
          file_path: string
          file_size: number
          id: string
          mime_type: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          document_date?: string | null
          file_name: string
          file_path: string
          file_size: number
          id?: string
          mime_type: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          document_date?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          mime_type?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      menstrual_cycles: {
        Row: {
          created_at: string
          end_date: string
          flow_intensity: string | null
          id: string
          pain_level: number | null
          start_date: string
          symptoms: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          flow_intensity?: string | null
          id?: string
          pain_level?: number | null
          start_date: string
          symptoms?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          flow_intensity?: string | null
          id?: string
          pain_level?: number | null
          start_date?: string
          symptoms?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_tracking: {
        Row: {
          created_at: string
          id: string
          mood: string | null
          notes: string | null
          tracking_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood?: string | null
          notes?: string | null
          tracking_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood?: string | null
          notes?: string | null
          tracking_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          analytics_consent: boolean | null
          birth_date: string | null
          created_at: string
          current_treatment: string | null
          daily_activity_level: string | null
          exercise_frequency: string | null
          exercise_intensity: string | null
          health_conditions: string[] | null
          height_cm: number | null
          id: string
          marketing_consent: boolean | null
          name: string | null
          other_health_condition: string | null
          other_symptom_description: string | null
          perimenopause_knowledge: string | null
          perimenopause_stage: string | null
          physician_consultation: string | null
          privacy_consent: boolean
          symptom_assessment: string | null
          symptoms: string[] | null
          terms_consent: boolean
          treatment_details: string[] | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          analytics_consent?: boolean | null
          birth_date?: string | null
          created_at?: string
          current_treatment?: string | null
          daily_activity_level?: string | null
          exercise_frequency?: string | null
          exercise_intensity?: string | null
          health_conditions?: string[] | null
          height_cm?: number | null
          id: string
          marketing_consent?: boolean | null
          name?: string | null
          other_health_condition?: string | null
          other_symptom_description?: string | null
          perimenopause_knowledge?: string | null
          perimenopause_stage?: string | null
          physician_consultation?: string | null
          privacy_consent?: boolean
          symptom_assessment?: string | null
          symptoms?: string[] | null
          terms_consent?: boolean
          treatment_details?: string[] | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          analytics_consent?: boolean | null
          birth_date?: string | null
          created_at?: string
          current_treatment?: string | null
          daily_activity_level?: string | null
          exercise_frequency?: string | null
          exercise_intensity?: string | null
          health_conditions?: string[] | null
          height_cm?: number | null
          id?: string
          marketing_consent?: boolean | null
          name?: string | null
          other_health_condition?: string | null
          other_symptom_description?: string | null
          perimenopause_knowledge?: string | null
          perimenopause_stage?: string | null
          physician_consultation?: string | null
          privacy_consent?: boolean
          symptom_assessment?: string | null
          symptoms?: string[] | null
          terms_consent?: boolean
          treatment_details?: string[] | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      user_tips: {
        Row: {
          created_at: string
          id: string
          rating: string
          tip_content: string
          tip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rating: string
          tip_content: string
          tip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rating?: string
          tip_content?: string
          tip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never
