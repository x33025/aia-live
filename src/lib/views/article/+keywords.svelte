<script lang="ts">
  import { writable } from 'svelte/store';
  import type { Keyword } from "$lib/utils/interfaces/metadata/+keyword";
  import { debounce } from 'lodash-es';

  export let keywords: Keyword[] = [];
  export let articleMetadataId: string;

  const searchResults = writable<Keyword[]>([]);
  let searchQuery = '';
  let loading = false;

  const fetchKeywords = debounce(async (query: string) => {
    if (query.length < 3) {
      searchResults.set([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/keywords?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch keywords');
      }
      const result: Keyword[] = await response.json();
      searchResults.set(result);
    } catch (error) {
      console.error('Error fetching keywords:', error);
      searchResults.set([]);
    }
  }, 300);

  function handleInput(event: Event) {
    searchQuery = (event.target as HTMLInputElement).value;
    fetchKeywords(searchQuery);
  }

  async function createKeyword() {
    if (!searchQuery) return;

    loading = true;
    try {
      const response = await fetch('http://localhost:3000/api/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: searchQuery })
      });

      if (!response.ok) {
        throw new Error('Failed to create keyword');
      }

      const newKeyword: Keyword = await response.json();
      
      // Add the keyword to the article metadata
      await addKeywordToArticleMetadata(newKeyword.keyword_id);

      keywords = [...keywords, newKeyword];
      searchResults.set([]);
      searchQuery = '';
    } catch (error) {
      console.error('Error creating keyword:', error);
    } finally {
      loading = false;
    }
  }

  async function addKeywordToArticleMetadata(keywordId: string) {
    try {
      const response = await fetch('http://localhost:3000/api/article-metadata/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ article_metadata_id: articleMetadataId, keyword_id: keywordId })
      });

      if (!response.ok) {
        throw new Error('Failed to add keyword to article metadata');
      }
    } catch (error) {
      console.error('Error adding keyword to article metadata:', error);
    }
  }
</script>

<div class="keywords-search">
  <input type="text" placeholder="Search keywords..." on:input={handleInput} bind:value={searchQuery} />
  {#if $searchResults.length > 0 || searchQuery.length >= 3}
    <div class="search-results">
      {#if $searchResults.length > 0}
        {#each $searchResults as keyword (keyword.keyword_id)}
          <div class="keyword" on:click={() => addKeywordToArticleMetadata(keyword.keyword_id)}>{keyword.keyword}</div>
        {/each}
      {:else}
        <p>No keywords found.</p>
        <button on:click={createKeyword} disabled={loading}>Add "{searchQuery}"</button>
      {/if}
    </div>
  {/if}
</div>

<div class="keywords-container">
  {#each keywords as keyword (keyword.keyword_id)}
    <div class="keyword">{keyword.keyword}</div>
  {/each}
</div>

<style>
  .keywords-search {
    position: relative;
    margin-bottom: 1em;
  }

  .keywords-search input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    margin-bottom: 1em;
  }

  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 0.5em;
  }

  .search-results .keyword {
    padding: 0.5em;
    cursor: pointer;
  }

  .search-results .keyword:hover {
    background-color: var(--gray-1);
  }

  .search-results p {
    margin: 0;
    padding: 0.5em 0;
  }

  .search-results button {
    display: block;
    width: 100%;
    padding: 0.5em;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
  }

  .search-results button:disabled {
    background-color: var(--gray-3);
    cursor: not-allowed;
  }

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
  }

  p {
    margin: 0;
  }
</style>
