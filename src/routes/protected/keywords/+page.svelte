<script lang="ts">
  import type { PageData } from './$types';
  import KeywordRow from "$lib/views/keyword/+keyword-row.svelte";

  export let data: PageData;

  // Destructure the keywords from the PageData
  const { keywords } = data;
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Keyword</th>
        <th>Evergreen</th>
        <th>Country</th>
        <th>Volume</th>
        <th>Density</th>
      </tr>
    </thead>
    <tbody>
      {#each keywords as keyword (keyword.id)}
        <KeywordRow {keyword} />
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
