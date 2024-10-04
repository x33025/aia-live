import { writable } from 'svelte/store';
import type { Country } from '$lib/types';

export const countries = writable<Country[]>([]);
