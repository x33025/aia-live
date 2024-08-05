<script lang="ts">
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let keywords: KeywordWithRelations[] = data.keywords;
  let countries: Country[] = data.countries; // Assuming countries data is part of PageData
</script>

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
          {#each keywords as keyword (keyword.id)}
            <KeywordRow {keyword} {countries} />
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

<style>
  .table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-grow: 1;
  }

  .table-wrapper {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
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
