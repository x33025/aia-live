<script lang="ts">
  import type { Keyword } from '@prisma/client';
  import { contextMenuStore } from '$lib/stores/+context-menu';

  export let keywords: Keyword[] = [];
  export let mainKeywordId: string | null = null;

  // Sort the keywords to ensure the main keyword is always first
  $: sortedKeywords = keywords.slice().sort((a, b) => {
    if (a.id === mainKeywordId) return -1;
    if (b.id === mainKeywordId) return 1;
    return 0;
  });

  function handleRightClick(event: MouseEvent, keyword: Keyword) {
    event.preventDefault();
    contextMenuStore.show([
      { label: 'Make Main Keyword', action: () => handleMakeMain(keyword.id) }
    ], { top: event.clientY, left: event.clientX }, keyword);
  }

  function handleMakeMain(id: string) {
    // Update the main keyword logic here
    console.log('Make main keyword:', id);
    mainKeywordId = id;
    contextMenuStore.hide();
  }

  function handleKeyDown(event: KeyboardEvent, keyword: Keyword) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRightClick(event as unknown as MouseEvent, keyword);
    }
  }
</script>

<div class="keywords-container">
  {#each sortedKeywords as keyword (keyword.id)}
    <div class="keyword {keyword.id === mainKeywordId ? 'main-keyword' : ''}"
         role="button"
         tabindex="0"
         on:contextmenu={(event) => handleRightClick(event, keyword)}
         on:keydown={(event) => handleKeyDown(event, keyword)}>
      {keyword.keyword}
    </div>
  {/each}
</div>

<style>
  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    overflow-y: auto;
    max-height: 100%;
    background-color: white;
  }

  .keyword {
    padding: 0.5em;
    background-color: var(--gray-1);
    color: black;
    border-radius: 0.5em;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
  }

  .main-keyword {
    color: var(--yellow); /* Apply yellow color to main keyword text */
  }
</style>
