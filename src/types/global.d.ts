interface Identifiable {
    id: number | string;
    name: string;
  }

  export interface User {
    id: string;
    name: string; // Empty string if not provided
    avatar: string; // File path, empty string if not provided
    role: Role; // Role must be provided, even if it's an empty object
  }
  
  export interface ActivityData {
    id: string;
    created_at: Date; // Creation timestamp
    updated_at: Date; // Last update timestamp
    deleted_by: User; // Must be defined, even if it's an empty User object
    created_by: User;
    updated_by: User; // Must be defined, even if it's an empty User object
  }
  
  export interface Article {
    id: string;
    created_at: Date; // Creation timestamp
    updated_at: Date; // Last update timestamp
    description: string; // Empty string if not provided
    content: string; // Empty string if not provided
    word_count: number; // 0 if not provided
    target_word_count: number; // 0 if not provided
    keywords: Keyword[]; // Must be an array, empty if no keywords
    activity_data: ActivityData; // Must be provided
    semrush_score: number; // 0 if not provided
  }
  
  export interface Keyword {
    id: string;
    created_at: Date; // Creation timestamp
    updated_at: Date; // Last update timestamp
    keyword: string; // Empty string if not provided
    density: number; // 0 if not provided
    volume: number; // 0 if not provided
    evergreen: boolean; // false if not provided
  }
  
  export interface Category {
    id: string;
    name: string; // Empty string if not provided
  }
  
  export interface Country {
    id: string;
    name: string; // Empty string if not provided
  }
  
  export interface Role {
    id: string;
    name: string; // Empty string if not provided
  }
  
  export interface Status {
    id: string;
    name: string; // Empty string if not provided
  }
  