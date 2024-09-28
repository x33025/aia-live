<script lang="ts">
  import { Direction, TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import type { Article } from '$lib/types'; 
    import Avatar from '../user/+avatar.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import TimeFrameSelector from '$lib/components/dashboard/+time-frame-selector.svelte';
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
    import NotesButton from '../notes/+notes-button.svelte';
    import ChevronUpDown from '$lib/core/ui/icons/+chevron-up-down.svelte';
  // Accept the draftedThisMonth prop
  export let draftedThisMonth: { items: Article[] } = { items: [] };

  // Extract the items array
  const articles = draftedThisMonth.items;

</script>


<Stack style="background-color: white; border-left: 1px solid var(--gray-2);">

  <TimeFrameSelector />
  <Stack spacing={0.3} style="padding: 0.3em;">
    {#if articles.length > 0} 
      {#each articles as article (article.id)}

        <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">
          <Stack direction={Direction.Horizontal} wrap={true} spacing={0.5}>
          {article.title} 
    
          <Spacer />
 
          <Avatar userId={article.author ?? 'defaultUserId'} size={1.75} />  
         

        </Stack>
      </Text>
      <Stack direction={Direction.Horizontal} wrap={true} spacing={0.5}>
        <NotesButton notes={article.expand?.notes ?? []} parent={article} parent_collection="articles" />
        <Spacer />
        <OpenArticleButton articleId={article.id} />
      </Stack>

      {/each}
    {:else}
      <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">
        No articles drafted this month
      </Text>
    {/if}
  </Stack>
</Stack>
