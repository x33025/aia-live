// File: src/lib/stores/dropdownStore.ts
import { writable } from 'svelte/store';

export const openDropdownId = writable<string | null>(null);

export function closeDropdown() {
  openDropdownId.set(null);
}

export function openDropdown(id: string) {
  openDropdownId.set(id);
}