<script lang="ts">
  import { onMount } from 'svelte';
  import Stack from "$lib/core/layout/+stack.svelte";
  import Text from "$lib/core/display/+text.svelte";
  import { type Keyword, Direction, TextType } from "$lib/types";
  // Removed Label import
  // import Label from '$lib/components/display/+label.svelte';
  
  export let keywords: Keyword[] = [];
  export let main_keyword: Keyword | null = null;

</script>

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
  {/if}
  {#if !main_keyword && (!keywords || keywords.length === 0)}
    <p>No keywords available</p>
  {/if}
</Stack>

<style>
  :global(.label) {
    border-radius: 0.5em;
    background-color: var(--gray-1);
    padding: 0.5em;
  }

  :global(.scrollable-stack) {
    overflow-y: auto;
  }
</style>
