<script lang="ts">
  import { onMount } from 'svelte';
  import Stack from "$lib/components/layout/+stack.svelte";
  import Text from "$lib/components/display/+text.svelte";
  import { type Keyword, Direction, TextType } from "$lib/types";
  
  export let keywords: Keyword[] = [];
  export let main_keyword: Keyword | null = null;

  onMount(() => {
    console.log("Keywords:", JSON.stringify(keywords));
  });
</script>

<Stack spacing={0.35}>
  <Text type={TextType.Callout} className={"description"}><strong>Keywords</strong></Text>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    {#if main_keyword}
    <Text className="label">{main_keyword.keyword}</Text>
   {/if}
    {#if keywords && keywords.length > 0}
      {#each keywords as keyword}
        {#if keyword.id !== main_keyword?.id}
          <Text className="label">{keyword.keyword}</Text>
        {/if}
      {/each}
    {:else}
      <p>No keywords available</p>
    {/if}
  </Stack>
</Stack>

<style>
:global(.description) {
  color: rgba(0, 0, 0, 0.935);
}
</style>
