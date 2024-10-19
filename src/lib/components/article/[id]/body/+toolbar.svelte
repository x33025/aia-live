<script lang="ts">
  import { TextEditor } from '@x33025/components'; // Correct store import
  import { editor as editorStore } from '@x33025/components'; // Correct store import
  import { onDestroy } from 'svelte';


  import { NumericTarget } from '@x33025/components';
  import { article } from '$lib/stores/data/+articles';

  
  let editor;
  let smartStyleEnabled = false;
  let unsubscribe: (() => void) | null = null; // Explicitly type unsubscribe

  // Initialize the editor and set up a subscription
  $: editor = $editorStore;
  
  $: {
    if (editor) {
      unsubscribe = editor.smartStyleState.subscribe((value: boolean) => {
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
    <p class="callout"><strong>Bold</strong></p>
  </button>
  <button class="label" on:click={() => editor?.textFormatter.toggleItalic()}>
    <p class="callout"><i>Italic</i></p>
  </button>
  <button class="label" on:click={() => editor?.textFormatter.toggleUnderline()}>
    <p class="callout"><u>Underline</u></p>
  </button>

  <button class="label" on:click={() => editor?.linkHandler.attachLink()}>
    <p class="callout">Attach Link</p>
  </button>
  <button class="label" on:click={() => editor?.toggleSmartStyle()}>
      <p class="callout">Smart Style: {smartStyleEnabled ? 'On' : 'Off'}</p>
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
