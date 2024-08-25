import { writable } from 'svelte/store';
import type { Article } from '$lib/types'; // Adjust the type path as necessary

// Writable store for articles
export const article = writable<Article>();
