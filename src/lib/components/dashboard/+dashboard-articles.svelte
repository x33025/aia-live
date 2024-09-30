<script lang="ts">
  import {  TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import type { Article } from '$lib/types'; 
    import Avatar from '../user/+avatar.svelte';

    import TimeFrameSelector from '$lib/components/dashboard/+time-frame-selector.svelte';
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
    import NotesButton from '../notes/+notes-button.svelte';
  // Accept the draftedThisMonth prop
  export let draftedThisMonth: { items: Article[] } = { items: [] };

  // Extract the items array
  const articles = draftedThisMonth.items;

</script>


<div class="stack expand" style="--direction: column; --justify: start; --gap: 0.5em; border-left: 1px solid var(--gray-2);">

  <div class="stack" style="--direction: row; --justify: space-between; padding: 0.5em;">
    <TimeFrameSelector />
  </div>
  <div class="stack" style=" padding: 0.5em; border-top: 1px solid var(--gray-1)">
    {#if articles.length > 0} 
      {#each articles as article (article.id)}

       <div class="stack" style="--direction: column; --gap: 0.5em;">
          <div class="stack" style="--direction: row; --align: center; --justify: space-between; padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em;">
        
          {article.title} 
    
           <div class="spacer" />
 
          <Avatar userId={article.author ?? 'defaultUserId'} size={1.75} />  
         
          

        </div>
   
        <div class="stack" style="--direction: row; --justify: space-between; --align: center; width: 100%;">
          <NotesButton notes={article.expand?.notes ?? []} parent={article} parent_collection="articles" />
      
          <OpenArticleButton articleId={article.id} />
        </div>
      </div>
      {/each}
    {:else}
      <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600;">
        No articles drafted this month
      </Text>
    {/if}
  </div>
</div>