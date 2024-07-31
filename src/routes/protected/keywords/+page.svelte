<script lang="ts">
  import { debounce } from 'lodash-es';
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let { keywords, total, skip, take } = data;

  let loading = false;
  let allKeywordsLoaded = false;

  async function loadMore() {
    if (loading || allKeywordsLoaded) return;
    loading = true;

    const res = await fetch(`/keywords?skip=${keywords.length}`);
    const newData = await res.json();

    if (newData.keywords.length > 0) {
      keywords = [...keywords, ...newData.keywords];
      skip = newData.skip;
      take = newData.take;
    } else {
      allKeywordsLoaded = true;
    }

    loading = false;
  }

  const handleScroll = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMore();
    }
  }, 200);

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<style>
  .table-container {
    display: flex;
    flex-direction: column;
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
            {keyword.id}
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
