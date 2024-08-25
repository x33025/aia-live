<script lang="ts">
  import { onMount } from 'svelte';
  import Stack from "$lib/components/layout/+stack.svelte";
  import Text from "$lib/components/display/+text.svelte";
  import { type Keyword, Direction, TextType } from "$lib/types";
  
  export let keywords: Keyword[] = [];
  export let mainKeyword: Keyword | null = null;

  onMount(() => {
    console.log("Keywords:", JSON.stringify(keywords));
  });
</script>

<Stack spacing={0.35}>
  <Text type={TextType.Callout} className={"description"}><strong>Keywords</strong></Text>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    {#if mainKeyword}
      <Text className="label"><strong>{mainKeyword.country}</strong></Text>
    {/if}
    {#each keywords as keyword}
      <Text className="label">{keyword.evergreen}</Text>
    {/each}
  </Stack>
</Stack>

<style>
:global(.description) {
  color: rgba(0, 0, 0, 0.935);
}
</style>
