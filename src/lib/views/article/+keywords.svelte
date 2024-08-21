<script lang="ts">
    import Stack from "$lib/components/layout/+stack.svelte";
    import Text from "$lib/components/display/+text.svelte";
    import { type Keyword, Direction, TextType } from "$lib/types";
  
    export let keywords: Keyword[] = [];
    export let mainKeyword: Keyword | null = null;
  </script>
  
  <Stack>
    <Text type={TextType.Callout} className={"description"}><strong>Keywords</strong></Text>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    {#if mainKeyword}
      <Text className="label"><strong>{mainKeyword.name}</strong></Text>
    {/if}
    {#each keywords as keyword}
      <Text className="label">{keyword.name}</Text>
    {/each}
  </Stack>
</Stack>
  
<style>
:global(.description) {
  color: rgba(0, 0, 0, 0.935);
}


</style>