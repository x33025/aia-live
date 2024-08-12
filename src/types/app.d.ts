declare global {
  namespace App {
    interface Locals {
      pb: typeof pb; // Reference to the PocketBase client
      user: AuthModel | null; // The authenticated user, if any, minimal auth data
      session: any | null; // Optional: Session data, if you manage sessions server-side
    }

    interface PageData {
      user?: User | null; // The authenticated user, detailed user data for the client-side
      session?: any | null; // Optional: Session data, only if needed on the client-side
    }

    // Add other custom interfaces here
    // interface Error {}
    // interface Platform {}
  }

  export enum NumberType {
    Integer = 'integer',
    Float = 'float'
  }

  export enum TextType {
    Title = 'title',
    Headline = 'headline',
    Subheadline = 'subheadline',
    Body = 'body',
    Callout = 'callout',
    Caption = 'caption',
  }

  export enum Alignment {
    Start = 'start',
    Center = 'center',
    End = 'end',
  }

  export enum Direction {
    Row = 'row',
    Column = 'column',
  }
}

export {};
