<script lang="ts">
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { Editor } from './editor';
    import { onDestroy } from 'svelte';
  
    export let editor: Editor;
  
    // Smart style state
    let smartStyleEnabled = false;
  
    // Subscribe to the smartStyleState store from the editor
    const unsubscribe = editor.smartStyleState.subscribe(value => {
      smartStyleEnabled = value;
    });
  
    // Clean up when the component is destroyed
    onDestroy(() => {
      unsubscribe();
    });
  </script>
  
  <Stack direction={Direction.Horizontal} wrap={true} spacing={1}>
    <button class="label edge-highlight" on:click={() => editor.toggleBold()}><strong>Bold</strong></button>
    <button class="label edge-highlight" on:click={() => editor.toggleItalic()}><i>Italic</i></button>
    <button class="label edge-highlight" on:click={() => editor.attachLink()}>Attach Link</button>
    <button class="label edge-highlight" on:click={() => editor.toggleSmartStyle()}>
      Smart Style: {smartStyleEnabled ? 'On' : 'Off'}
    </button>
  </Stack>
  
  <style>
    .label {
      padding: 0.3em 0.5em;
      border-radius: 0.5em;
      background-color: white;
    }
  </style>
  