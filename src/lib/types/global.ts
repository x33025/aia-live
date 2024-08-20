// Common Identifiable interface
export interface Identifiable {
  id: string;
  name: string; // For dropdowns and other components
}

// User interface without the "name" field
export interface User {
  id: string;
  first_name: string; // Required field
  last_name: string; // Required field
  avatar: string; // File path, empty string if not provided
  role: string | Role | null; // ID or Role object, optional
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
  deleted_by: string | User | null; // ID or User object, optional
  created_by: string | User; // ID or User object, required
  updated_by: string | User | null; // ID or User object, optional
}

// Article interface with relationships
export interface Article {
  id: string;
  created: Date; // Creation timestamp
  updated: Date; // Last update timestamp
  title: string; // Required field
  content: string; // Required field
  description: string; // Required field
  word_count: number; // 0 if not provided
  target_word_count: number; // 0 if not provided
  keywords: Keyword[]; // Must be an array, empty if no keywords
  activity: ActivityData; // Required field
  semrush_score: number; // 0 if not provided
  category: string | Category | null; // ID or Category object, optional
  status: string | Status | null; // ID or Status object, optional
  website: string | Website | null; // ID or Website object, optional
  author: string | User | null; // ID or User object, optional
}

// Keyword interface
export interface Keyword {
  id: string;
  created: Date; // Creation timestamp
  updated: Date; // Last update timestamp
  keyword: string; // Empty string if not provided
  density: number; // 0 if not provided
  volume: number; // 0 if not provided
  evergreen: boolean; // false if not provided
  activity: ActivityData; // Required field
  country: string | Country | null; // ID or Country object, optional
}

// Identifiable-based interfaces for related entities
export interface Category extends Identifiable {}

export interface Country extends Identifiable {}

export interface Role extends Identifiable {}

export interface Status extends Identifiable {}

export interface Website extends Identifiable {
  url: string;
}
