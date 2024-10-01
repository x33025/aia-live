<script lang="ts">
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
  import NotesButton from '$lib/components/notes/+notes-button.svelte';
  import Avatar from '$lib/components/user/+avatar.svelte';
  import type { Article } from "$lib/types";

  export let article: Article;
</script>

<div class="stack expand" style="--direction: column; --gap: 0.5em;  ">
    <div class="stack" style="--direction: row; --align: center; --justify: space-between; padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; width: 100%;">
  
    {article.title} 

     <div class="spacer"  />

     {#if article.author || article.expand?.activity?.created_by}
    <Avatar userId={article.author ?? article.expand?.activity?.created_by ?? ''} size={1.75} />  
   {/if}
    

  </div>

  <div class="stack" style="--direction: row; --justify: space-between; --align: center;  width: 100%;">
    <NotesButton notes={article.expand?.notes ?? []} parent={article} parent_collection="articles" />

    <OpenArticleButton articleId={article.id} />
  </div>
</div>