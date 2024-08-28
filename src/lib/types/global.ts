// Common Identifiable interface
export interface Identifiable {
  id: string;
  name: string; // For dropdowns and other components
}

// User interface based on the schema
export interface User {
  id: string;
  first_name: string; // Required field
  last_name: string; // Required field
  author_name: string | null; // Optional field
  avatar: string | null; // File path, optional
  role: string | null; // ID as string, optional
  last_active: Date | null;

  expand: {
    role: Role;
  }
}

// Utility type to convert a User to an Identifiable by combining first_name and last_name
export type IdentifiableUser = Omit<User, "first_name" | "last_name"> & {
  name: string; // Derived full name for dropdown
};

// Function to convert User to IdentifiableUser
export function toIdentifiableUser(user: User): IdentifiableUser {
  return {
    ...user,
    name: `${user.first_name} ${user.last_name}`, // Derive full name
  };
}

// ActivityData with relationships
export interface ActivityData {
  id: string;
  created: Date; // Creation timestamp
  updated: Date; // Last update timestamp
  deleted: Date | null; // Can be null if not provided
  deleted_by: string | null; // ID as string, optional
  created_by: string; // ID as string, required
  updated_by: string | null; // ID as string, optional

  expand: {
    deleted_by: User | null; // Expanded deleted_by user
    created_by: User; // Expanded created_by user
    updated_by: User | null; // Expanded updated_by user
  }
}

// Article interface with relationships and the new fields
export interface Article {
  id: string;
  created: Date; // Creation timestamp
  updated: Date; // Last update timestamp
  title: string; // Required field
  content: string; // Required field (could be rich text in editor type)
  description: string; // Optional field
  word_count: number; // Optional, defaults to 0 if not provided
  target_word_count: number; // Optional, defaults to 0 if not provided
  semrush_score: number; // Optional, defaults to 0 if not provided
  activity: string; // ID as string, required
  category: string | null; // ID as string, optional
  status: string | null; // ID as string, optional
  website: string | null; // ID as string, optional
  author: string | null; // ID as string, optional
  main_image: string | null; // ID as string, optional
  keywords: string[]; // Array of keyword IDs
  main_keyword: string | null; // ID of the main keyword
  notes: string[];

  expand: {
    activity: ActivityData;
    notes: Notes[];
    keywords: Keyword[]; // Expanded full keyword objects
    main_keyword: Keyword | null; // Expanded main keyword object
    main_image: Image | null; // Expanded main image object
    category: Category | null; // Expanded category object
  };
}

// Keyword interface
export interface Keyword {
  id: string;
  keyword: string;
  density: number | null; // Optional, defaults to 0 if not provided
  volume: number | null; // Optional, defaults to 0 if not provided
  evergreen: boolean | null; // Optional, defaults to false if not provided
  activity: string; // ID as string, required
  country: string | null; // ID as string, optional
  notes: string[];

  expand: {
    activity: ActivityData;
    notes: Notes[];
  };
}

// Category interface
export interface Category extends Identifiable {}

// Country interface
export interface Country extends Identifiable {}

// Role interface
export interface Role extends Identifiable {}

// Status interface
export interface Status extends Identifiable {}

// Website interface with the added url field
export interface Website extends Identifiable {
  url: string;
}

// Image interface for main_image in articles
export interface Image {
  id: string;
  image: string; // File path
  description: string | null; // Optional description
  activity: string; // ID as string, required

  expand: {
    activity: ActivityData;
  };
}

// Notes interface
export interface Notes {
  id: string;
  content: string; // Editor type field
  activity: string; // ID as string, required

  expand: {
    activity: ActivityData;
  };
}
