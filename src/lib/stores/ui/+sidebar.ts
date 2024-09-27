import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';
import { SidebarOrientation } from '$lib/types';


interface SidebarContent {
    component: ComponentType;
    props: Record<string, any>;
    orientation: SidebarOrientation;
}

export const sidebarVisible = writable(false);
export const sidebarContent = writable<SidebarContent | null>(null);

export function openSidebar(component: ComponentType, props: Record<string, any> = {}, orientation: SidebarOrientation = SidebarOrientation.Right) {
    console.log("Opening sidebar with orientation:", orientation);
    sidebarContent.set({ component, props, orientation });
    sidebarVisible.set(true);
}

export function closeSidebar() {
    sidebarContent.set(null);
    sidebarVisible.set(false);
}
