<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import KeywordRow from '$lib/components/keyword/+keyword-row.svelte';
  import { keywords, sortedKeywords } from '$lib/stores/data/+keywords';

  import AddKeyword from '$lib/components/keyword/+add-keyword.svelte';
  const headers = ["", "Keyword", "Evergreen", "Country", "Volume", "Density", "Notes"];


  // Set initial keywords in the store
  onMount(() => {

      keywords.set($page.data.keywords);
 
  });



</script>

<div class="stack expand" style="--align: flex-start; --justify: flex-start; " >


    <AddKeyword />  
 
  <!-- Table for Displaying Keywords -->
  {#if $sortedKeywords.length > 0}
    <table >
      <thead>
        <tr>
          {#each headers as header, index}
            <th style={index === 0 ? "padding-left: 2em;" : ""}>
              <p class="subheadline"  style="font-weight: bold;">{header}</p>
            </th>
          {/each}
        </tr>
      </thead>

      <tbody>
        {#each $sortedKeywords as keyword (keyword.id)}
          <KeywordRow {keyword} />
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="stack expand" style="--align: center; --justify: center; " >
      <p class="subheadline"  style="font-weight: bold; color: var(--gray-6);">No keywords found</p>
    </div>
  {/if}
 
</div>

<style>
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
    padding: 0.5em;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }


</style>
