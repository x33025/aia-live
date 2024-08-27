<script lang="ts">
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction, TextType } from '$lib/types';
    import { Editor } from './editor';
    import { onDestroy } from 'svelte';
    import Text from '$lib/components/display/+text.svelte'; // Assuming you have a Text component
  
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
    <button class="label edge-highlight" on:click={() => editor.toggleBold()}>
      <Text type={TextType.Callout}><strong>Bold</strong></Text>
    </button>
    <button class="label edge-highlight" on:click={() => editor.toggleItalic()}>
      <Text type={TextType.Callout}><i>Italic</i></Text>
    </button>
    <button class="label edge-highlight" on:click={() => editor.attachLink()}>
      <Text type={TextType.Callout}>Attach Link</Text>
    </button>
    <button class="label edge-highlight" on:click={() => editor.toggleSmartStyle()}>
      <Text type={TextType.Callout}>Smart Style: {smartStyleEnabled ? 'On' : 'Off'}</Text>
    </button>
  </Stack>
  
  <style>
    .label {
      padding: 0.3em 0.5em;
      border-radius: 0.5em;
      background-color: white;
    }
  </style>
  