import { writable } from 'svelte/store';
import { Editor } from '.';

export const editorStore = writable<Editor | null>(null);
