<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import Text from '$lib/core/display/+text.svelte';
  import KeywordRow from '$lib/components/keyword/+keyword-row.svelte';
  import { keywords } from '$lib/stores/data/+keywords';
  import TextInput from '$lib/core/actions/+text-input.svelte';

  
  const headers = ["Keyword", "Evergreen", "Country", "Volume", "Density", "Notes"];




  // Set initial keywords in the store
  onMount(() => {

      keywords.set($page.data.keywords);
 
  });


  function handleNewKeyword(event: CustomEvent<string>) {
    console.log('New keyword:', event.detail);
  }
</script>

<div class="stack expand" style="--align: flex-start; --gap: 1em;" >
  <div class="stack">


  <TextInput id="new-keyword" label="New Keyword" on:input={handleNewKeyword} />
    
  </div>

  <!-- Table for Displaying Keywords -->

    <table >
      <thead>
        <tr>
          {#each headers as header}
            <th>
              <Text>{header}</Text>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $keywords as keyword (keyword.id)}
          <KeywordRow {keyword} countries={$page.data.countries} />
        {/each}
      </tbody>
    </table>
 
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
