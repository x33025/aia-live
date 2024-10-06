import { writable } from 'svelte/store';

export const contextMenuStore = writable({
  isOpen: false,
  x: 0,
  y: 0,
  menuId: 'default',
  contextData: {},
});
