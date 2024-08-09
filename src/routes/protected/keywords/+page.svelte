<script lang="ts">
  import InfiniteLoading from 'svelte-infinite-loading';
  import { supabase } from '$lib/config/supabase';
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';

  let keywordsList: KeywordWithRelations[] = [];
  let page = 1;
  const PAGE_SIZE = 20;

  async function loadMoreKeywords(event: CustomEvent<{ loaded: () => void; complete: () => void }>) {
    const { loaded, complete } = event.detail;

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: newKeywords, error } = await supabase
      .from('Keyword')
      .select(`
        *,
        ActivityData (*),
        Country (*),
        TimeData (*)
      `)
      .range(from, to);

    if (error) {
      console.error('Error fetching more keywords:', error);
      complete();
      return;
    }

    if (newKeywords.length < PAGE_SIZE) {
      complete();
    }

    keywordsList = [...keywordsList, ...newKeywords];
    page++;
    loaded();
  }
</script>

<div class="table-container">
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
      {#each keywordsList as keyword (keyword.id)}
        <KeywordRow {keyword} />
      {/each}
    </tbody>
  </table>
  
  <InfiniteLoading on:infinite={loadMoreKeywords} />
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
