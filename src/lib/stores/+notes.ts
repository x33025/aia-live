import { writable } from 'svelte/store';
import type Note from '$lib/views/notes/+note.svelte';

// Writable store for articles
export const notes = writable<Note[]>([]);
