// src/lib/stores/+keywords.ts
import { writable } from 'svelte/store';

export const keywords = writable<KeywordWithRelations[]>([]);
