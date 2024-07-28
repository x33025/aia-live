// src/lib/stores/country-dropdown.ts
import { writable } from 'svelte/store';

export const openDropdownId = writable<string | null>(null);
