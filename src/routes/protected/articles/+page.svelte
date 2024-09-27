<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // To access $page.data
  import { articles } from '$lib/stores/data/+articles'; // Global articles store
  import { get } from 'svelte/store'; // To access the value of the store
  import ArticleRow from '$lib/components/article/+article-row.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { writers } from '$lib/stores/data/+users'; // Import users store
  // Set articles when the component mounts
  onMount(() => {
    articles.set($page.data.articles); // Set articles from $page.data
  });

</script>

<Stack spacing={1} class="scrollable-stack" style="margin: 1em;">

    {#each $articles as article, index (article.id)}
      <ArticleRow 
        {article}
        categories={$page.data.categories}
        writers={$writers}
      />
      {#if index < $articles.length - 1}
        <div class="divider"></div>
      {/if}
    {/each}


</Stack>


<style>

  /* Divider style */
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 0.5em 0;
  }

  /* Make the stack scrollable and fit into the parent */
  :global(.scrollable-stack) {
    flex-grow: 1; /* Grow to fill available space */
    overflow-y: auto; /* Enable scrolling */
    padding: 0; /* Ignore parent paddings */
    margin: 0;
  }
</style>
