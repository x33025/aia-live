import type { Session, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<{ session: Session | null; user: SupabaseUser | null }>;
      session: Session | null;
      user: SupabaseUser | null;
    }
    interface PageData {
      session: Session | null;
    }
    // Add other custom interfaces here
    // interface Error {}
  
    // interface Platform {}
  }



 
  
  // Define your custom types here
  type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

  // Basic Row Types
  type Keyword = Database['public']['Tables']['Keyword']['Row'];
  type Country = Database['public']['Tables']['Country']['Row'];
  type ArticleMetadata = Database['public']['Tables']['ArticleMetadata']['Row'];
  type Article = Database['public']['Tables']['Article']['Row'];
  type ActivityData = Database['public']['Tables']['ActivityData']['Row'];
  type Role = Database['public']['Tables']['Role']['Row'];
  type Status = Database['public']['Tables']['Status']['Row'];
  type TimeData = Database['public']['Tables']['TimeData']['Row'];
  type User = Database['public']['Tables']['User']['Row'];
  type Website = Database['public']['Tables']['Website']['Row'];
  type Category = Database['public']['Tables']['Category']['Row'];
  type _ArticleKeywords = Database['public']['Tables']['_ArticleKeywords']['Row'];

  // Relational Types
  type ActivityDataWithUser = ActivityData & {
    created_by: User;
    last_modified_by: User;
    deleted_by?: User | null;
  };

  type UserWithRole = User & {
    role: Role[];
  };

  type ArticleMetadataWithRelations = ArticleMetadata & {
    activity_data: ActivityDataWithUser;
    article: Article;
    author?: User | null;
    category?: Category | null;
    main_keyword?: Keyword | null;
    status?: Status | null;
    time_data: TimeData;
    website?: Website | null;
  };

  type KeywordWithRelations = Keyword & {
    activity_data: ActivityDataWithUser;
    country?: Country | null;
    time_data: TimeData;
  };

  type ArticleWithMetadata = Article & {
    metadata: ArticleMetadataWithRelations[];
  };

  type _ArticleKeywordsWithRelations = _ArticleKeywords & {
    A: ArticleMetadata;
    B: Keyword;
  };

  // Define the DropdownOption type
  type DropdownOption = {
    id: string | number;
    name: string;
    [key: string]: any; // Allow additional properties
  };

  enum TextType {
    Title = 'title',
    Headline = 'headline',
    Subheadline = 'subheadline',
    Body = 'body',
    Callout = 'callout',
    Caption = 'caption',
  }

  

}

export {};
