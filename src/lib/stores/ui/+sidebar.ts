import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

interface SidebarContent {
    component: ComponentType;
    props: Record<string, any>;
}

export const sidebarVisible = writable(false);
export const sidebarContent = writable<SidebarContent | null>(null);

export function openSidebar(component: ComponentType, props: Record<string, any> = {}) {
    sidebarContent.set({ component, props });
    sidebarVisible.set(true);
}

export function closeSidebar() {
    sidebarContent.set(null);
    sidebarVisible.set(false);
}
