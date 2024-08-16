<script lang="ts">
  import { page } from '$app/stores'; // Import the page store to access data directly
  import ArticleRow from '$lib/views/article/+article-row.svelte';

  import Stack from '$lib/components/layout/+stack.svelte';
</script>

<Stack>

  {#each $page.data.articles as article, index (article.id)}
    <ArticleRow 
      {article}
      writers={$page.data.writers}
      categories={$page.data.categories}
      statuses={$page.data.statuses}
    />
    {#if index < $page.data.articles.length - 1}
      <div class="divider"></div>
    {/if}
  {/each}
</Stack>

<style>
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 1em 0;
  }
</style>
