<!-- <script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { article } from '$lib/stores/+article'; // Adjust the path as needed
  import type { Article } from '$lib/utils/interfaces/+article';

  let source: string = '';

  // Subscribe to the store and keep the source in sync
  const unsubscribe = article.subscribe((value: Article) => {
   
    source = value.source ?? '';

  });

  // Cleanup subscription on component destroy
  onDestroy(() => {
    unsubscribe();
  });

  // Function to update the source in the article store
  function updateSource(event: Event) {
    const target = event.target as HTMLTextAreaElement | null;
    if (target) {
      article.update(current => ({
        ...current,
        source: target.value
      }));
    }
  }
</script>

<textarea
  id="source"
  bind:value={source}
  class="resizable-textarea"
  placeholder="Put your sources here"
  required
  on:input={updateSource}
></textarea>

<style>
  .resizable-textarea {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    resize: none;
    flex-grow: 1; /* Ensure it grows to fill the parent */
    border: none;
    background-color: var(--gray-1);
    border-radius: 0.5em;
  }

  textarea:focus {
    border: none;
  }
</style> -->
