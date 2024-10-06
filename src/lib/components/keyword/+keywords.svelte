<script lang="ts">
  import { type Keyword } from "$lib/types";
  import KeywordChip from "$lib/components/keyword/+keyword-chip.svelte";
  import PlusIcon from '$lib/core/ui/icons/+plus.svelte';

  export let keywords: Keyword[] = [];
  export let main_keyword: Keyword | null = null;


</script>

<div class="stack expand" style="--direction: row; --align: center;">
  <button class="add-keyword-button">    
    <PlusIcon size={1} color="var(--gray-6)" />
  </button>

  {#if main_keyword}

      <KeywordChip keyword={main_keyword} is_main={true} />

  {/if}
  {#if keywords && keywords.length > 0}
    {#each keywords as keyword}
      {#if keyword.id !== main_keyword?.id}
   
        <KeywordChip keyword={keyword} />
     
      {/if}
    {/each}
  {/if}
  {#if !main_keyword && (!keywords || keywords.length === 0)}
    <p class="callout">No keywords available</p>
  {/if}
</div>

<style> 
  .add-keyword-button {
    background-color: var(--gray-1);
    border: none;
    border-radius: 0.5em;
    padding: 0.5em;
    cursor: pointer;
  }
</style>