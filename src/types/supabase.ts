export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _ArticleKeywords: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_ArticleKeywords_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "ArticleMetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_ArticleKeywords_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "Keyword"
            referencedColumns: ["id"]
          },
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      ActivityData: {
        Row: {
          created_by_id: string
          deleted_by_id: string | null
          id: string
          last_modified_by_id: string
        }
        Insert: {
          created_by_id: string
          deleted_by_id?: string | null
          id?: string
          last_modified_by_id: string
        }
        Update: {
          created_by_id?: string
          deleted_by_id?: string | null
          id?: string
          last_modified_by_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ActivityData_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ActivityData_deleted_by_id_fkey"
            columns: ["deleted_by_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ActivityData_last_modified_by_id_fkey"
            columns: ["last_modified_by_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Article: {
        Row: {
          content: string
          description: string
          id: string
          quick_look: string
          word_count: number
        }
        Insert: {
          content?: string
          description?: string
          id?: string
          quick_look?: string
          word_count?: number
        }
        Update: {
          content?: string
          description?: string
          id?: string
          quick_look?: string
          word_count?: number
        }
        Relationships: []
      }
      ArticleMetadata: {
        Row: {
          activity_data_id: string
          article_id: string
          author_id: string | null
          category_id: string | null
          id: string
          main_keyword_id: string | null
          semrush_score: number
          status_id: string | null
          target_word_count: number
          time_data_id: string
          title: string
          website_id: string | null
        }
        Insert: {
          activity_data_id: string
          article_id: string
          author_id?: string | null
          category_id?: string | null
          id?: string
          main_keyword_id?: string | null
          semrush_score?: number
          status_id?: string | null
          target_word_count?: number
          time_data_id: string
          title?: string
          website_id?: string | null
        }
        Update: {
          activity_data_id?: string
          article_id?: string
          author_id?: string | null
          category_id?: string | null
          id?: string
          main_keyword_id?: string | null
          semrush_score?: number
          status_id?: string | null
          target_word_count?: number
          time_data_id?: string
          title?: string
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ArticleMetadata_activity_data_id_fkey"
            columns: ["activity_data_id"]
            isOneToOne: false
            referencedRelation: "ActivityData"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "Article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_main_keyword_id_fkey"
            columns: ["main_keyword_id"]
            isOneToOne: false
            referencedRelation: "Keyword"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "Status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_time_data_id_fkey"
            columns: ["time_data_id"]
            isOneToOne: false
            referencedRelation: "TimeData"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ArticleMetadata_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "Website"
            referencedColumns: ["id"]
          },
        ]
      }
      Category: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Country: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Keyword: {
        Row: {
          country_id: string | null
          evergreen: boolean
          id: string
          keyword: string
          keyword_density: number
          time_data_id: string
          volume: number
        }
        Insert: {
          country_id?: string | null
          evergreen?: boolean
          id?: string
          keyword?: string
          keyword_density?: number
          time_data_id: string
          volume?: number
        }
        Update: {
          country_id?: string | null
          evergreen?: boolean
          id?: string
          keyword?: string
          keyword_density?: number
          time_data_id?: string
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "Keyword_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "Country"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Keyword_time_data_id_fkey"
            columns: ["time_data_id"]
            isOneToOne: false
            referencedRelation: "TimeData"
            referencedColumns: ["id"]
          },
        ]
      }
      Role: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Status: {
        Row: {
          id: string
          name: string
          timestamp: string
        }
        Insert: {
          id?: string
          name?: string
          timestamp?: string
        }
        Update: {
          id?: string
          name?: string
          timestamp?: string
        }
        Relationships: []
      }
      TimeData: {
        Row: {
          date_created: string
          date_deleted: string | null
          date_updated: string
          id: string
        }
        Insert: {
          date_created?: string
          date_deleted?: string | null
          date_updated: string
          id?: string
        }
        Update: {
          date_created?: string
          date_deleted?: string | null
          date_updated?: string
          id?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          author_name: string
          email: string
          id: string
          last_active_at: string | null
          last_name: string
          name: string
          role_id: string | null
        }
        Insert: {
          author_name?: string
          email?: string
          id?: string
          last_active_at?: string | null
          last_name?: string
          name?: string
          role_id?: string | null
        }
        Update: {
          author_name?: string
          email?: string
          id?: string
          last_active_at?: string | null
          last_name?: string
          name?: string
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "User_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Role"
            referencedColumns: ["id"]
          },
        ]
      }
      Website: {
        Row: {
          id: string
          name: string
          url: string
        }
        Insert: {
          id?: string
          name?: string
          url?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never