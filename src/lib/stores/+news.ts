import type { News } from '$lib/types';
import { writable } from 'svelte/store';



// Create a writable store for news
export const news = writable<News[]>([]);

// You can add more functionality like adding, removing, or updating news items here
