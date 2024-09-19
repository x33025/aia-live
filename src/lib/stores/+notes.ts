import { writable } from 'svelte/store';
import type { Note } from '$lib/types';

// Writable store for articles
export const notes = writable<Note[]>([]);
