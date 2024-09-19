<script lang="ts">
  import Stack from '$lib/core/layout/+stack.svelte';
  import Toolbar from './+toolbar.svelte'; // Import the toolbar component
  import TextEditor from '$lib/core/advanced-input/editor/+text-editor.svelte'; // Import the TextEditor component

  export let content: string;
  export let onPublishUpdate: (updatedContent: string) => void;
  export let onSelectionChange: (selection: { text: string, start: number, end: number } | null) => void;
</script>

<Stack spacing={0.5}>
  <Toolbar />

  <TextEditor 
    {content} 
    onPublishUpdate={onPublishUpdate} 
    onSelectionChange={onSelectionChange} 
    placeholder="Start writing..."
  />
</Stack>

