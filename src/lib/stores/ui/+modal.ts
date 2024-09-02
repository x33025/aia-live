import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

interface ModalContent {
    component: ComponentType;
    props: Record<string, any>;
}

export const modalVisible = writable(false);
export const modalContent = writable<ModalContent | null>(null);

export function openModal(component: ComponentType, props: Record<string, any> = {}) {
    console.log("Opening modal with component:", component.name, "and props:", props);
    modalContent.set({ component, props });
    modalVisible.set(true);
    console.log("Modal is now visible:", true);
}

export function closeModal() {
    console.log("Closing modal");
    modalContent.set(null);
    modalVisible.set(false);
    console.log("Modal is now visible:", false);
}
