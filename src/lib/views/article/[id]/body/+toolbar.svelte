<script lang="ts">
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { Editor } from './editor'; // Import the Editor class
    
    export let editor: Editor; // Pass the editor instance as a prop
  
    // Optional: You can emit events from this toolbar, e.g., for tracking actions
    // export let onAction: (action: string) => void;
  </script>
  
  <Stack direction={Direction.Horizontal} wrap={true} spacing={1}>
    <!-- Buttons for text formatting and link attachment -->
    <button class="label edge-highlight" on:click={() => editor.toggleBold()}><strong>Bold</strong></button>
    <button class="label edge-highlight" on:click={() => editor.toggleItalic()}><i>Italic</i></button>
    <button class="label edge-highlight" on:click={() => editor.attachLink()}>Attach Link</button>
    <button class="label edge-highlight" on:click={() => editor.toggleSmartStyle()}>
      Smart Style: {editor.isSmartStyleEnabled ? 'On' : 'Off'}
    </button>
  </Stack>
  
  <style>
    .label {
      padding: 0.3em 0.5em;
      border-radius: 0.5em;
      background-color: white;
    }
  </style>
  