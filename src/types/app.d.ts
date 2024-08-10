declare global {
  namespace App {
    interface Locals {
      pb: typeof pb; // Reference to the PocketBase client
      user: AuthModel | null; // The authenticated user, if any
    }

    interface PageData {
      user: AuthModel | null; // The authenticated user, if any
      session: any | null; // You can remove this if you don't need session management
    }

    // Add other custom interfaces here
    // interface Error {}
  
    // interface Platform {}
  }
}

export {};
