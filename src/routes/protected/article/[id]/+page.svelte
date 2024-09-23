<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { article } from '$lib/stores/data/+articles';

  import Stack from '$lib/core/layout/+stack.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';
  import { Direction } from '$lib/types';

  import Body from '$lib/components/article/[id]/body/+content.svelte';
  import DataView from '$lib/components/article/[id]/data/+data-tab.svelte';

  // Function to publish updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Set article from $page.data on mount
  onMount(() => {
    article.set($page.data.article);
  });

</script>

  <Stack direction={Direction.Horizontal} spacing={1}>
  <Spacer />
    <Stack direction={Direction.Vertical} spacing={1}>
      {#if $article}
        <Body 
          content={$article.content} 
          onPublishUpdate={publishUpdate} 
          onSelectionChange={(selection) => console.log("Selection changed:", selection)} 
        />
      {/if}
    </Stack>
    <Spacer />
  </Stack>

<style>
  :global(.article-title) {
    padding: 0.5em;
    background-color: white;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>