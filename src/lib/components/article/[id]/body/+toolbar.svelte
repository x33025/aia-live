<script lang="ts">
  import { Direction, TextType } from '$lib/types';
  import { editorStore } from '$lib/core/advanced-input/editor/+store'; // Correct store import
  import { onDestroy } from 'svelte';
  import Text from '$lib/core/display/+text.svelte';

  import NumericTarget from '$lib/core/advanced-input/+numeric-target.svelte';
  import { article } from '$lib/stores/data/+articles';

  
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


    function updateTargetWordCount(value: number): void {
        throw new Error('Function not implemented.');
    }
</script>

<div class="stack" style="--direction: row; --justify: space-between;">
  <button class="label" on:click={() => editor?.textFormatter.toggleBold()}>
    <Text type={TextType.Callout}><strong>Bold</strong></Text>
  </button>
  <button class="label" on:click={() => editor?.textFormatter.toggleItalic()}>
    <Text type={TextType.Callout}><i>Italic</i></Text>
  </button>
  <button class="label" on:click={() => editor?.textFormatter.toggleUnderline()}>
    <Text type={TextType.Callout}><u>Underline</u></Text>
  </button>

  <button class="label" on:click={() => editor?.linkHandler.attachLink()}>
    <Text type={TextType.Callout}>Attach Link</Text>
  </button>
  <button class="label" on:click={() => editor?.toggleSmartStyle()}>
    <Text type={TextType.Callout}>Smart Style: {smartStyleEnabled ? 'On' : 'Off'}</Text>
  </button>
  <div class="spacer" />
  <NumericTarget
  bind:target={$article.target_word_count} 
  current={$article.word_count} 
/>
</div>

<style>
  .label {
    border-radius: 0.5em;
    background-color: white;
    padding: 0.25em 0.5em;
    border: 1px solid var(--gray-3);
  }
</style>
