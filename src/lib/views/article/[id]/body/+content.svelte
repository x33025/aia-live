<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import Toolbar from './+toolbar.svelte'; // Import the toolbar component
  import TextEditor from './editor/+text-editor.svelte'; // Import the TextEditor component

  export let content: string;
  export let onPublishUpdate: (updatedContent: string) => void;
  export let onSelectionChange: (selection: { text: string, start: number, end: number } | null) => void;
</script>

<Stack spacing={1}>
  <Toolbar />

  <TextEditor 
    {content} 
    onPublishUpdate={onPublishUpdate} 
    onSelectionChange={onSelectionChange} 
  />
</Stack>

<style>
  .editable-content {
    background-color: white;
    border-radius: 0.5em;
    outline: none;
    padding: 1em;
    height: 100%;
    overflow: auto;
    font-family: 'Noto Serif', serif;
    line-height: 1.6em;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
