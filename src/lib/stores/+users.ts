import { writable } from 'svelte/store';
import type { User } from '$lib/types'; // Adjust the type path as necessary

// Writable store for articles
export const users = writable<User[]>([]);
