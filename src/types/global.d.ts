declare global {
  interface Identifiable {
    id: number | string;
    name: string;
  }

  export interface User {
    id: string;
    first_name: string; // Required field
    last_name: string; // Required field
    author_name: String;
    avatar: string; // File path, empty string if not provided
    role: Role | null; // Optional, can be null if not provided
  }

  export interface ActivityData {
    id: string;
    created: Date; // Creation timestamp
    updated: Date; // Last update timestamp
    deleted: Date | null; // Can be null if not provided
    deleted_by: User | null; // Can be null if not provided
    created_by: User; // Required field
    updated_by: User | null; // Can be null if not provided
  }

  export interface Article {
    id: string;
    created: Date; // Creation timestamp
    updated: Date; // Last update timestamp
    description: string; // Required field
    content: string; // Required field
    word_count: number; // 0 if not provided
    target_word_count: number; // 0 if not provided
    keywords: Keyword[]; // Must be an array, empty if no keywords
    activity: ActivityData; // Required field
    semrush_score: number; // 0 if not provided
    category: Category | null; // Optional, can be null
    status: Status | null; // Optional, can be null
    website: Website | null; // Optional, can be null
  }

  export interface Keyword {
    id: string;
    created: Date; // Creation timestamp
    updated: Date; // Last update timestamp
    keyword: string; // Empty string if not provided
    density: number; // 0 if not provided
    volume: number; // 0 if not provided
    evergreen: boolean; // false if not provided
    activity: ActivityData; // Required field
    country: Country | null; // Optional, can be null
  }

  export interface Category extends Identifiable {
    id: string;
    name: string;
  }
  
  export interface Country extends Identifiable {
    id: string;
    name: string;
  }
  
  export interface Role extends Identifiable {
    id: string;
    name: string;
  }
  
  export interface Status extends Identifiable {
    id: string;
    name: string;
  }
  
  export interface Website extends Identifiable {
    id: string;
    name: string;
    url: string;
  }
}

export {};
