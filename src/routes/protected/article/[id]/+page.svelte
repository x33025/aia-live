<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { article } from '$lib/stores/data/+articles';
  import Body from '$lib/components/article/[id]/body/+content.svelte';
  // Function to publish updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Set article from $page.data on mount
  onMount(() => {
    article.set($page.data.article);
  });
</script>


  <div class="stack expand" >
    {#if $article}
      <Body 
        content={$article.content} 
        onPublishUpdate={publishUpdate} 
        onSelectionChange={(selection) => console.log("Selection changed:", selection)} 
      />
    {/if}
  </div>


<style>
  :global(.article-title) {
    padding: 0.5em;
    background-color: white;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
