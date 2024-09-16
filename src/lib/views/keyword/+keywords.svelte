<script lang="ts">
  import { onMount } from 'svelte';
  import Stack from "$lib/components/layout/+stack.svelte";
  import Text from "$lib/components/display/+text.svelte";
  import { type Keyword, Direction, TextType } from "$lib/types";
  // Removed Label import
  // import Label from '$lib/components/display/+label.svelte';
  
  export let keywords: Keyword[] = [];
  export let main_keyword: Keyword | null = null;

</script>

<style>
  :global(.scrollable-stack) {
    overflow-y: auto;

  }
</style>

<Stack wrap={true} direction={Direction.Horizontal} spacing={0.5} class="scrollable-stack">
  {#if main_keyword}
    <Text type={TextType.Callout} class="label" style="color: var(--yellow);"><b>{main_keyword.keyword}</b></Text>
  {/if}
  {#if keywords && keywords.length > 0}
    {#each keywords as keyword}
      {#if keyword.id !== main_keyword?.id}
        <Text type={TextType.Callout} class="label">{keyword.keyword}</Text>
      {/if}
    {/each}
  {:else}
    <p>No keywords available</p>
  {/if}
</Stack>