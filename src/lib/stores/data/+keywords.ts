import type { Keyword } from '$lib/types';
import { writable } from 'svelte/store';

// Initialize the keywords store with an empty array or null
export const keywords = writable<Keyword[]>([]);
