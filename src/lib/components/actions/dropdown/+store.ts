import { writable } from 'svelte/store';

export const showPicker = writable(false);
export const pickerPosition = writable({ top: 0, right: 0 });
export const selectedOption = writable<MenuItem | null>(null);

