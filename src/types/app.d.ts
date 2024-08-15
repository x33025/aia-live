declare global {
  namespace App {
    interface Locals {
      pb: typeof pb; // Reference to the PocketBase client (server-side)
      user: AuthModel | null; // The authenticated user, if any, minimal auth data
    }

    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
