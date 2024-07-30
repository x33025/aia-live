import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { PrismaClient, Keyword, Country, GetInfo, ArticleMetadata } from '@prisma/client';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
    }
    interface PageData {
      session: Session | null;
    }
    // Add other custom interfaces here
    // interface Error {}
  
    // interface Platform {}
  }

  var prisma: PrismaClient;

  // Define your custom type here
  type KeywordWithData = Keyword & {
    country: Country | null;
    get_info: GetInfo;
  };

  type ArticleMetadataWithRelated = ArticleMetadata & {
    keywords: Keyword[];
    get_info: GetInfo;
  };

  // Define the DropdownOption type
  type DropdownOption = {
    id: string | number;
    name: string;
    [key: string]: any; // Allow additional properties
  };
}

export {};
