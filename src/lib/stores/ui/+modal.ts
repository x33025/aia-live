import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

interface ModalContent {
    component: ComponentType;
    props: any;
    header: string;
    footer?: ComponentType; // New footer property
    footerProps?: any;      // Props for footer
}
export const modalVisible = writable(false);
export const modalContent = writable<ModalContent | null>(null);

export function openModal(
    component: ComponentType,
    header: string,
    props: any = {},
    footer?: ComponentType,
    footerProps: any = {}
) {
    console.log("Opening modal with component:", component.name, "header:", header, "and props:", props);
    modalContent.set({ component, props, header, footer, footerProps });
    modalVisible.set(true);
    console.log("Modal is now visible:", true);
}


export function closeModal() {
    console.log("Closing modal");
    modalContent.set(null);
    modalVisible.set(false);
    console.log("Modal is now visible:", false);
}
