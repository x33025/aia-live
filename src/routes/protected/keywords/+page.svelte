<script lang="ts">
  import { debounce } from 'lodash-es';
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import { onMount } from 'svelte';
  import type { Country } from '@prisma/client';

  export let data: {
    keywords: KeywordWithData[];
    countries: Country[];
    total: number;
    skip: number;
    take: number;
  };

  let keywords: KeywordWithData[] = data.keywords;
  let countries: Country[] = data.countries;
  console.log('Received countries:', countries); // Log the received countries
  let total = data.total;
  let skip = data.skip;
  let take = data.take;

  let loading = false;
  let allKeywordsLoaded = false;

  function groupByDate(keywords: KeywordWithData[]) {
    return keywords.reduce((groups, keyword) => {
      const date = new Date(keyword.get_info?.date_created ?? '').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(keyword);
      return groups;
    }, {} as Record<string, KeywordWithData[]>);
  }

  let groupedKeywords = groupByDate(keywords);

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

    groupedKeywords = groupByDate(keywords);
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
    height: 100vh; /* Full height of the viewport */
    overflow-x: auto; /* Enable horizontal scrolling if needed */
  }

  .table-wrapper {
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling in the wrapper */
    flex-grow: 1; /* Allow the table wrapper to take up remaining space */
  }

  table {
    width: 100%;
    min-width: 66.67%; /* Minimum width of 2/3rd of the screen */
    border-collapse: collapse;
  }

  th {
    position: sticky;
    top: 0;
    background-color: white; /* Adjust background as needed */
    z-index: 1;
    text-align: left; /* Align headers to the left */
    border-right: none; /* Remove vertical dividers */
  }

  td, th {
    padding: 8px;
    border-top: 1px solid #ddd; /* Adjust border as needed */
    border-bottom: 1px solid #ddd;
    text-align: left; /* Align cells to the left */
  }

  td {
    border-top: none; /* Remove top border from cells */
  }

  .date-row {
    font-weight: bold;
    color: var(--blue);
  }

</style>

<h1>Keywords</h1>

<div class="table-container">
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Keyword</th>
          <th>Evergreen</th>
          <th>Country</th>
          <th>Volume</th>
          <th>Keyword Density</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(groupedKeywords) as date}
          <tr class="date-row">
            <td colspan="6">{date}</td>
          </tr>
          {#each groupedKeywords[date] as keyword}
            <KeywordRow {keyword} {countries} />
          {/each}
        {/each}
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
