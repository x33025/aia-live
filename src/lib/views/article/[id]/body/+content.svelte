<script lang="ts">
  import { debounce } from 'lodash-es';
  import { Editor } from './editor'; // Import the Editor class
  import Stack from '$lib/components/layout/+stack.svelte';
  import Toolbar from './+toolbar.svelte'; // Import the toolbar component
  import { Direction } from '$lib/types';

  export let content: string;
  export let onPublishUpdate: (updatedContent: string) => void;
  export let onSelectionChange: (selection: { text: string, start: number, end: number } | null) => void;

  const editor = new Editor(); // Create an instance of the Editor class

  // Debounced function to publish updates
  const debouncedSave = debounce(() => {
    const updatedContent = document.querySelector('.editable-content')?.innerHTML || '';
    if (updatedContent !== content) {
      onPublishUpdate(updatedContent);
    }
  }, 600);

  function handleInput() {
    debouncedSave();
  }

  function handleSelectionChange() {
    onSelectionChange(null);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === '1') {
        event.preventDefault();
        document.execCommand('formatBlock', false, 'h1');
      } else if (event.key === '2') {
        event.preventDefault();
        document.execCommand('formatBlock', false, 'h2');
      } else if (event.key === 'p') {
        event.preventDefault();
        document.execCommand('formatBlock', false, 'p');
      } else if (event.key === 'b' || event.key === 'B') {
        event.preventDefault();
        editor.toggleBold(); // Use the Editor class to toggle bold
      } else if (event.key === 'i' || event.key === 'I') {
        event.preventDefault();
        editor.toggleItalic(); // Use the Editor class to toggle italic
      }
    }
  }

  function handleLinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      event.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        window.open(href, '_blank');
      }
    }
  }
</script>

<Stack spacing={1}>
  <Toolbar {editor} />

  <div 
    class="editable-content" 
    contenteditable="true" 
    on:input={handleInput} 
    on:selectionchange={handleSelectionChange} 
    on:keydown={handleKeydown} 
    on:paste={(event) => editor.handlePaste(event)}
    on:click={handleLinkClick} 
  >
    {@html content}
  </div>
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
    font-size: 1.2em;
    line-height: 1.6em;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    resize: vertical;
    max-height: 600px;
  }
</style>
