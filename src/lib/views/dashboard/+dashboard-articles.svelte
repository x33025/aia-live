<script lang="ts">
  import { TextType } from '$lib/types';
  import Text from '$lib/components/display/+text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import type { Article } from '$lib/types'; 

  // Accept the draftedThisMonth prop
  export let draftedThisMonth: { items: Article[] } = { items: [] };

  // Extract the items array
  const articles = draftedThisMonth.items;

  $: console.log(articles);
</script>


<Stack style="background-color: white;">
  <Text type={TextType.Subheadline} style="padding: 0.5em; border-bottom: 1px solid var(--gray-2)">
    Articles This Week
  </Text>

  <Stack spacing={0.3} style="padding: 0.3em;">
    {#if articles.length > 0} 
      {#each articles as article (article.id)}
        <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">
          {article.title}
        </Text>
      {/each}
    {:else}
      <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">
        No articles drafted this month
      </Text>
    {/if}
  </Stack>
</Stack>
