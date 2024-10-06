import type { Keyword } from '$lib/types';
import { writable, derived } from 'svelte/store';

// Initialize the keywords store with an empty array or null
export const keywords = writable<Keyword[]>([]);

export const selectedKeywords = writable<Keyword[]>([]);

// Derived store to sort keywords by created date in reverse order
export const sortedKeywords = derived(keywords, $keywords => {
    return $keywords.slice().sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
});
