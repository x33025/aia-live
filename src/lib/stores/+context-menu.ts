import { writable } from 'svelte/store';

interface ContextMenuState<T = any> {
  visible: boolean;
  items: Array<{ label: string, action: () => void }>;
  pos: { top: number; left: number };
  data?: T;
}

function createContextMenuStore() {
  const { subscribe, set, update } = writable<ContextMenuState>({
    visible: false,
    items: [],
    pos: { top: 0, left: 0 }
  });

  return {
    subscribe,
    show: <T>(items: Array<{ label: string, action: () => void }>, pos: { top: number; left: number }, data?: T) =>
      set({ visible: true, items, pos, data }),
    hide: () => set({ visible: false, items: [], pos: { top: 0, left: 0 } })
  };
}

export const contextMenuStore = createContextMenuStore();
