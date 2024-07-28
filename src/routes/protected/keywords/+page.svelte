<script lang="ts">
  import { debounce } from 'lodash-es';
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import { onMount } from 'svelte';

  export let data: {
    keywords: KeywordWithData[];
    total: number;
    skip: number;
    take: number;
  };

  let keywords: KeywordWithData[] = data.keywords || [];
  let total = data.total || 0;
  let skip = data.skip || 0;
  let take = data.take || 20;

  let loading = false;
  let allKeywordsLoaded = false;

  async function loadMore() {
    if (loading || allKeywordsLoaded) return;
    loading = true;

    const res = await fetch(`/keywords?skip=${keywords.length}`);
    const data = await res.json();

    keywords = [...keywords, ...data.keywords];
    skip = data.skip;
    take = data.take;
    loading = false;

    if (keywords.length >= total) {
      allKeywordsLoaded = true;
    }
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMore();
    }
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<style>
  .table-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: auto;
  }

  .table-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
  }

  table {
    width: 100%;
    min-width: 66.67%;
    border-collapse: collapse;
  }

  th {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    text-align: left;
    border-right: none;
  }

  td, th {
    padding: 8px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  td {
    border-top: none;
  }
</style>


<h1>Keywords</h1>

<div class="table-container">
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Evergreen</th>
          <th>Country</th>
          <th>Volume</th>
          <th>Keyword Density</th>
        </tr>
      </thead>
      <tbody>
        {#if keywords && keywords.length > 0}
          {#each keywords as keyword}
            <KeywordRow {keyword} />
          {/each}
        {:else}
          <tr>
            <td colspan="5">No keywords found</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

{#if loading}
  <p>Loading more keywords...</p>
{/if}

{#if allKeywordsLoaded}
  <p>All keywords loaded.</p>
{/if}
