import { writable } from 'svelte/store';
import type { Image } from '$lib/types';

// Store for holding images
export const images = writable<Image[]>([]);
