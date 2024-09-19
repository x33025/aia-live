// Base interface for common fields (ID, created, updated)
export interface BaseModel {
  id: string;
  created: Date; // Creation timestamp
  updated: Date; // Last update timestamp
}

// Base interface for identifiable models with a name
export interface Identifiable extends BaseModel {
  name: string; // For dropdowns and other components
}

// User interface based on PocketBase schema
export interface User extends BaseModel {
  first_name: string; // Required field
  last_name: string; // Required field
  author_name: string | null; // Optional field
  avatar: string | null; // File path, optional
  role: string[]; // Role ID, optional
  last_active: Date | null;
  last_login: Date | null;

  expand?: {
    role?: Role[];
  };
}

// ActivityData with relationships
export interface ActivityData extends BaseModel {
  deleted: Date | null; // Can be null if not provided
  deleted_by: string | null; // ID as string, optional
  created_by: string; // ID as string, required
  updated_by: string[]; // ID as string, optional

  expand?: {
    deleted_by?: User | null; // Expanded deleted_by user
    created_by?: User; // Expanded created_by user
    updated_by?: User[]; // Expanded updated_by user
  };
}


export interface Schedule extends BaseModel {
  article_id: string; // Foreign key to the Article
  status: string | null; // Enum for status
  website: string | null; // Foreign key to website
  schedule_date: Date; // Initially planned schedule date

  expand?: {
    article?: Article;
    website?: Website;
  };
}


// Article interface with relationships and new fields
export interface Article extends BaseModel {
  title: string; // Required field
  content: string; // Required field
  description: string; // Optional field
  word_count: number; // Optional, defaults to 0
  target_word_count: number; // Optional, defaults to 0
  semrush_score: number; // Optional, defaults to 0
  activity: string; // ID as string, required
  category: string | null; // ID as string, optional
  author: string | null; // ID as string, optional
  main_image: string | null; // ID as string, optional
  keywords: string[]; // Array of keyword IDs
  main_keyword: string | null; // ID of the main keyword
  notes: string[];
  raw_data: string[];
  schedule: string[];

  expand?: {
    activity?: ActivityData;
    notes?: Note[];
    keywords?: Keyword[]; // Expanded keyword objects
    main_keyword?: Keyword | null; // Expanded main keyword object
    main_image?: Image | null; // Expanded main image object
    category?: Category | null; // Expanded category object
    raw_data?: RawData[]; // Expanded raw data objects
    schedule?: Schedule[]; // Expanded schedule objects
    author?: User | null; // Expanded author object
  };
}

// Keyword interface
export interface Keyword extends BaseModel {
  keyword: string;
  density: number | null; // Optional, defaults to 0
  volume: number | null; // Optional, defaults to 0
  evergreen: boolean | null; // Optional, defaults to false
  activity: string; // ID as string, required
  country: string | null; // ID as string, optional
  notes: string[];

  expand?: {
    activity?: ActivityData;
    notes?: Note[];
  };
}

// Category interface
export interface Category extends Identifiable {
  parent: string | null;
  children: string[];

  expand?: {
    parent?: Category | null; // Expanded parent category object
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
export interface Image extends BaseModel {
  file: string; // File path
  description: string | null; // Optional description
  activity: string; // ID as string, required
  notes: string[];

  expand?: {
    activity?: ActivityData;
    notes?: Note[];
  };
}

// Notes interface
export interface Note extends BaseModel {
  content: string; // Editor field
  activity: string; // ID as string, required

  expand?: {
    activity?: ActivityData;
  };
}

// News interface
export interface News extends BaseModel {
  url: string;
  title: string;
  description: string;
  content: string | null; // Optional
  rewritten_title: string | null; // Optional
  rewritten_content: string | null; // Optional
  notes: string[];
  activity: string; // ID as string, required

  expand?: {
    activity?: ActivityData;
    notes?: Note[];
  };
}

// Prompts interface
export interface Prompts extends BaseModel {
  prompt: string; // Optional field
  activity: string; // ID as string, required

  expand?: {
    activity?: ActivityData;
  };
}

// Raw Data interface
export interface RawData extends BaseModel {
  name: string; // Required field
  source: string; // Editor type field
  extracted_data: Record<string, any> | null; // Optional JSON
  activity: string; // ID as string, required
  notes: string[];

  expand?: {
    activity?: ActivityData;
    notes?: Note[];
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
