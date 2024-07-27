// src/app.d.ts
import type { User, Keyword, Country, GetInfo } from '@prisma/client';
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
}

export {};
