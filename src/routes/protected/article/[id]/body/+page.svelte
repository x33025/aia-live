<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { debounce } from 'lodash-es';

  const content = writable('');

  function saveSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    const ranges = [];
    for (let i = 0; i < selection.rangeCount; i++) {
      ranges.push(selection.getRangeAt(i));
    }
    return ranges;
  }

  function restoreSelection(savedSel: Range[] | null) {
    if (!savedSel) {
      return;
    }
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    selection.removeAllRanges();
    for (const range of savedSel) {
      selection.addRange(range);
    }
  }

  function handleInput(event: Event) {
    try {
      const target = event.target as HTMLDivElement;
      const newContent = target.innerHTML;
      const savedSel = saveSelection();
      console.log('Content updated:', newContent);
      content.set(newContent);
      restoreSelection(savedSel);
    } catch (error) {
      console.error("Error handling input:", error);
    }
  }

  onMount(() => {
    try {
      const unsubscribeContent = content.subscribe(value => {
        console.log('Content store updated:', value);
      });

      return () => {
        unsubscribeContent();
      };
    } catch (error) {
      console.error("Error during onMount:", error);
    }
  });
</script>

<div class="text-editor-wrapper">
  <div
    contenteditable="true"
    bind:innerHTML={$content}
    on:input={handleInput}
    class="text-editor"
  ></div>
</div>

<style>
  .text-editor-wrapper {
    position: relative;
    height: 100%;
  }

  .text-editor {
    background-color: white;
    border-radius: 1em;
    padding: 1em;
    min-height: 100px;
    outline: none;
    overflow-y: auto; /* Ensure it's scrollable */
    height: calc(100% - 2em); /* Adjust height to fit the container */
    width: 100%;
    box-sizing: border-box;
    font-size: 1em;
    border: none; /* Remove border */
  }
</style>
