import { writable } from 'svelte/store';
import type { Image } from '$lib/types';

// Store for holding images
export const images = writable<Image[]>([]);

export const selected_image = writable<Image | null>(null);

export const selected_image_crop = writable<string | null>(null);