import { writable } from 'svelte/store';
import { Editor } from './editor';

export const editorStore = writable<Editor | null>(null);
