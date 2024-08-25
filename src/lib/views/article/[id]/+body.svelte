<script lang="ts">
  import { debounce, trimEnd } from 'lodash-es';
  import Stack from '$lib/components/layout/+stack.svelte'; // Import the custom Stack component
    import { Direction } from '$lib/types';

  export let content: string;
  export let onPublishUpdate: (updatedContent: string) => void;

  // Debounced function to publish updates
  const debouncedSave = debounce(() => {
    const updatedContent = document.querySelector('.editable-content')?.innerHTML || '';
    if (updatedContent !== content) {
      onPublishUpdate(updatedContent);
    }
  }, 600); // 600ms debounce

  // Function to handle content changes
  function handleInput() {
    debouncedSave();
  }
</script>


    <div class="editable-content" contenteditable="true" on:input={handleInput}>
      {@html content}
    </div>

 


<style>
  .editable-content {
    background-color: var(--gray-1);
    border-radius: 0.5em;
    outline: none;
    padding: 1em;
    height: 100%;
    overflow: auto;
    /* Additional styles */
  }
</style>
