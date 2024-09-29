<script lang="ts">
  import Toolbar from './+toolbar.svelte'; // Import the toolbar component
  import TextEditor from '$lib/core/advanced-input/editor/+text-editor.svelte'; // Import the TextEditor component

  export let content: string;
  export let onPublishUpdate: (updatedContent: string) => void;
  export let onSelectionChange: (selection: { text: string, start: number, end: number } | null) => void;
</script>

<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 40%;">
  <Toolbar />

  <TextEditor 
    {content} 
    onPublishUpdate={onPublishUpdate} 
    onSelectionChange={onSelectionChange} 
    placeholder="Start writing..."
  />
</div>

