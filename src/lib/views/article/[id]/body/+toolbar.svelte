<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import { editorStore } from './editor/+text-editor'; // Correct store import
  import { onDestroy } from 'svelte';
  import Text from '$lib/components/display/+text.svelte';

  
  let editor;
  let smartStyleEnabled = false;
  let unsubscribe: (() => void) | null = null; // Explicitly type unsubscribe

  // Initialize the editor and set up a subscription
  $: editor = $editorStore;
  
  $: {
    if (editor) {
      unsubscribe = editor.smartStyleState.subscribe(value => {
        smartStyleEnabled = value;
      });
    }
  }

  // Clean up when the component is destroyed
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<Stack direction={Direction.Horizontal} wrap={true} spacing={1}>
  <button class="label border-highlight" on:click={() => editor?.toggleBold()}>
    <Text type={TextType.Callout}><strong>Bold</strong></Text>
  </button>
  <button class="label border-highlight" on:click={() => editor?.toggleItalic()}>
    <Text type={TextType.Callout}><i>Italic</i></Text>
  </button>
  <button class="label border-highlight" on:click={() => editor?.attachLink()}>
    <Text type={TextType.Callout}>Attach Link</Text>
  </button>
  <button class="label border-highlight" on:click={() => editor?.toggleSmartStyle()}>
    <Text type={TextType.Callout}>Smart Style: {smartStyleEnabled ? 'On' : 'Off'}</Text>
  </button>
</Stack>

<style>
  .label {
    border-radius: 0.5em;
    background-color: white;
  }
</style>
