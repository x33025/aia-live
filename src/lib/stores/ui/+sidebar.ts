// src/lib/stores/ui/+sidebar.ts
import { writable } from 'svelte/store';

export const sidebarVisible = writable(false);

export function openSidebar() {
    sidebarVisible.set(true);
}

export function closeSidebar() {
    sidebarVisible.set(false);
}
