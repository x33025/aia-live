<script lang="ts">
    import { TextType } from '$lib/types';
    import Text from '$lib/components/display/+text.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
  
    export let articlesByWeek: Record<number, any[]>;
  </script>
  
  <Stack style="background-color: white; border-radius: 0.5em; border: 1px solid var(--gray-2);">
    <Text type={TextType.Subheadline} style="padding: 0.5em; border-bottom: 1px solid var(--gray-2)">Articles This Week</Text>
    
    <Stack spacing={0.3} style="padding: 0.3em;">
      {#each Object.entries(articlesByWeek) as [weekNumber, articles]}
        {#each articles as article}
          <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">{article.title}</Text>
        {/each}
      {/each}
    </Stack>
  </Stack>