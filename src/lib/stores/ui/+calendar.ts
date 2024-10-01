import { writable } from 'svelte/store';

// Create a writable store for the selected day
export const selectedDay = writable(new Date());

// Optional: you could store year and month too
export const year = writable(new Date().getFullYear());
export const month = writable(new Date().getMonth() + 1);
