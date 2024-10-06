import { writable } from 'svelte/store';

export type ContextMenuOption = {
  label: string;
  action: () => void;
};

export type ContextMenuState = {
  show: boolean;
  x: number;
  y: number;
  options: ContextMenuOption[];
};

// Initial store state
const initialState: ContextMenuState = {
  show: false,
  x: 0,
  y: 0,
  options: [],
};

export const contextMenuStore = writable<ContextMenuState>(initialState);

export function openContextMenu(x: number, y: number, options: ContextMenuOption[]) {
  contextMenuStore.set({ show: true, x, y, options });
}

export function closeContextMenu() {
  contextMenuStore.set({ show: false, x: 0, y: 0, options: [] });
}
