// src/app.d.ts
import type { User } from '@prisma/client';
import type { PrismaClient } from '@prisma/client';

declare global {
  namespace App {
    interface Locals {
      user: User | null;
    }
    // You can uncomment these and extend as needed
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }

  var prisma: PrismaClient;
}

export {};
