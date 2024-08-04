<script lang="ts">
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let keywords: Keyword[] = data.keywords;
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
