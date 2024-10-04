<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import KeywordRow from '$lib/components/keyword/+keyword-row.svelte';
  import { keywords } from '$lib/stores/data/+keywords';

  import AddKeyword from '$lib/components/keyword/+add-keyword.svelte';
  const headers = ["Keyword", "Evergreen", "Country", "Volume", "Density", "Notes"];


  // Set initial keywords in the store
  onMount(() => {

      keywords.set($page.data.keywords);
 
  });



</script>

<div class="stack expand" style="--align: flex-start; " >


    <AddKeyword />  
 
  <!-- Table for Displaying Keywords -->

    <table >
      <thead>
        <tr>
          {#each headers as header, index}
            <th style={index === 0 ? "padding-left: 2em;" : ""}>
              <Text type={TextType.Subheadline} style="font-weight: bold;">{header}</Text>
            </th>
          {/each}
        </tr>
      </thead>

      <tbody>
        {#each $keywords as keyword (keyword.id)}
          <KeywordRow {keyword} />
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
