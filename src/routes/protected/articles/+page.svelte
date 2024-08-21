<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // To access $page.data.articles
  import { articles } from '$lib/stores/+articles'; // Articles store
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';

  // Set articles when the component mounts
  onMount(() => {
    articles.set($page.data.articles); // Set articles from $page.data
  });
</script>

<Stack spacing={0.5}>

  {#each $page.data.articles as article, index (article.id)}
    <ArticleRow 
      {article}
      categories={$page.data.categories}
      statuses={$page.data.statuses}
      writers={$page.data.users}
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
    margin: 0.5em 0;
  }
</style>
