// Common Identifiable interface
export interface Identifiable {
  id: string;
  name: string; // For dropdowns and other components
}

// User interface based on PocketBase schema
export interface User {
  id: string;
  first_name: string; // Required field
  last_name: string; // Required field
  author_name: string | null; // Optional field
  avatar: string | null; // File path, optional
  role: string | null; // Role ID, optional
  last_active: Date | null;

  expand: {
    role: Role;
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
  };
}

// Article interface with relationships and new fields
export interface Article {
  id: string;
  title: string; // Required field
  content: string; // Required field
  description: string; // Optional field
  word_count: number; // Optional, defaults to 0
  target_word_count: number; // Optional, defaults to 0
  semrush_score: number; // Optional, defaults to 0
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
    keywords: Keyword[]; // Expanded keyword objects
    main_keyword: Keyword | null; // Expanded main keyword object
    main_image: Image | null; // Expanded main image object
    category: Category | null; // Expanded category object
  };
}

// Keyword interface
export interface Keyword {
  id: string;
  keyword: string;
  density: number | null; // Optional, defaults to 0
  volume: number | null; // Optional, defaults to 0
  evergreen: boolean | null; // Optional, defaults to false
  activity: string; // ID as string, required
  country: string | null; // ID as string, optional
  notes: string[];

  expand: {
    activity: ActivityData;
    notes: Notes[];
  };
}

// Category interface
export interface Category extends Identifiable {
  subcategories: string[]; // Array of subcategory IDs

  expand: {
    subcategories: Category[]; // Expanded subcategory objects
  };
}

// Country interface
export interface Country extends Identifiable {}

// Role interface
export interface Role extends Identifiable {}

// Status interface
export interface Status extends Identifiable {}

// Website interface
export interface Website extends Identifiable {
  url: string;
}

// Image interface
export interface Image {
  id: string;
  file: string; // File path
  description: string | null; // Optional description
  activity: string; // ID as string, required
  notes: string[];

  expand: {
    activity: ActivityData;
    notes: Notes[];
  };
}

// Notes interface
export interface Notes {
  id: string;
  content: string; // Editor field
  activity: string; // ID as string, required

  expand: {
    activity: ActivityData;
  };
}

// New Collection Interfaces

// News interface
export interface News {
  id: string;
  url: string;
  title: string;
  content: string | null; // Optional
  rewritten_title: string | null; // Optional
  rewritten_content: string | null; // Optional
  notes: string[];
  activity: string; // ID as string, required

  expand: {
    activity: ActivityData;
    notes: Notes[];
  };
}

// Prompts interface
export interface Prompts {
  id: string;
  prompt: string; // Optional field
  activity: string; // ID as string, required

  expand: {
    activity: ActivityData;
  };
}

// Raw Data interface
export interface RawData {
  id: string;
  name: string; // Required field
  source: string; // Editor type field
  extracted_data: Record<string, any> | null; // Optional JSON
  activity: string; // ID as string, required
  notes: string[];

  expand: {
    activity: ActivityData;
    notes: Notes[];
  };
}

// Utility types
export type IdentifiableUser = Omit<User, "first_name" | "last_name"> & {
  name: string; // Derived full name
};

export function toIdentifiableUser(user: User): IdentifiableUser {
  return {
    ...user,
    name: `${user.first_name} ${user.last_name}`,
  };
}
