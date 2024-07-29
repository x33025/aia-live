// src/app.d.ts
import type { User, Keyword, Country, GetInfo, ArticleMetadata } from '@prisma/client';
import type { PrismaClient } from '@prisma/client';

declare global {
  namespace App {
    interface Locals {
      user: User | null;
    }

    // Add other custom interfaces here
    // interface Error {}
    // interface PageData {}
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
