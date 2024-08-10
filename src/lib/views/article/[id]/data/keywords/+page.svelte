<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { article } from '$lib/stores/+article';
  import { get } from 'svelte/store';
  import { patchArticle } from '$lib/api/+article';
  import debounce from 'lodash-es/debounce';
  import type { Article } from '$lib/utils/interfaces/+article';
  import type { Keyword } from '$lib/utils/interfaces/metadata/+keyword';

  let newKeyword = '';
  let inputElement: HTMLInputElement;

  const saveKeywords = debounce(async (keywords: Keyword[]) => {
    await patchArticle({ keywords });
  }, 600);

  function addKeyword() {
    if (newKeyword.trim()) {
      article.update(currentArticle => {
        const updatedArticle = { ...currentArticle };
        if (!Array.isArray(updatedArticle.keywords)) {
          updatedArticle.keywords = [];
        }
   
        
        saveKeywords(updatedArticle.keywords); // Debounced save
        return updatedArticle;
      });
      newKeyword = '';
      updateInputWidth();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      addKeyword();
    } else if (event.key === 'Backspace' && newKeyword === '') {
      article.update(currentArticle => {
        const updatedArticle = { ...currentArticle };
        if (!Array.isArray(updatedArticle.keywords)) {
          updatedArticle.keywords = [];
        }
        if (updatedArticle.keywords.length > 0) {
          newKeyword = updatedArticle.keywords.pop()?.keyword || '';
          saveKeywords(updatedArticle.keywords); // Debounced save
        }
        return updatedArticle;
      });
    }
    updateInputWidth();
  }

  function updateKeyword(index: number, event: Event) {
    const updatedKeyword = (event.target as HTMLDivElement).textContent?.trim() || '';
    article.update(currentArticle => {
      const updatedArticle = { ...currentArticle };
      if (!Array.isArray(updatedArticle.keywords)) {
        updatedArticle.keywords = [];
      }
      if (updatedKeyword) {
        updatedArticle.keywords[index].keyword = updatedKeyword;
      } else {
        updatedArticle.keywords.splice(index, 1);
      }
      saveKeywords(updatedArticle.keywords); // Debounced save
      return updatedArticle;
    });
  }

  function updateInputWidth() {
    if (inputElement) {
      const placeholderWidth = inputElement.placeholder.length + 1;
      const inputWidth = (newKeyword.length + 1);
      const width = Math.max(placeholderWidth, inputWidth) + 'ch';
      inputElement.style.width = width;
    }
  }

  onMount(() => {
    updateInputWidth();
  });
</script>

<div class="keywords-container">
  {#each $article.keywords as keyword, index (keyword.keyword_id)}
    <div
      class="keyword"
      contenteditable="true"
      on:input={(event) => updateKeyword(index, event)}
    >{keyword.keyword}</div>
  {/each}
  <input
    class="keyword-input"
    type="text"
    bind:value={newKeyword}
    on:keydown={handleKeyDown}
    on:input={updateInputWidth}
    placeholder="Add keyword"
    bind:this={inputElement}
  />
</div>

<style>
  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 100%;
    background-color: white;
  }

  .keyword {
    padding: 0.5em;
    margin: 0.25em;
    background-color: var(--gray-1);
    color: black;
    border-radius: 0.5em;
    white-space: nowrap;
    outline: none;
  }

  .keyword:focus {
    background-color: var(--gray-2);
  }

  .keyword-input {
    flex-shrink: 0;
    padding: 0.5em;
    margin: 0.25em;
    border: none;
    outline: none;
    font-size: 1em;
    background: none;
    background-color: var(--gray-1);
    border-radius: 0.5em;
    width: auto;
    transition: width 0.2s; /* Smooth width transition */
  }
</style> -->