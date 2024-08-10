<script lang="ts">
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  import ArticleInputRow from '$lib/views/article/+article-input-row.svelte';
  import InfiniteLoading from 'svelte-infinite-loading';
  import { writable } from 'svelte/store';
  import Stack from '$lib/components/layout/+stack.svelte';

  export let data: LayoutData;
  
  let writers: UserWithRole[] = [];
  let articles = writable(data.articles);
  let page = data.page;
  let hasMore = true;
  let loading = false;

  $: {
    if (Array.isArray(data.allUsers)) {
      writers = data.allUsers.filter((user: UserWithRole) => user.role?.name === 'Writer');
    }
  }

  async function loadMoreArticles(event: CustomEvent) {
  if (loading || !hasMore) return;
  loading = true;

  try {
    const res = await fetch(`?page=${page + 1}`);
    const newData = await res.json();

    if (newData.articles.length) {
      articles.update(curr => [...curr, ...newData.articles]);
      page += 1;
    } else {
      hasMore = false;
    }
  } catch (err) {
    console.error('Failed to load more articles:', err);
    hasMore = false;
  } finally {
    if (event.target && typeof event.target.complete === 'function') {
      event.target.complete(hasMore); // Inform the infinite loader that the operation is complete
    }
    loading = false;
  }
}


  function createNewArticle() {
    // Logic to create a new article
  }
</script>

<Stack>
  <ArticleInputRow 
    {writers} 
    categories={data.categories} 
    statuses={data.statuses}
    on:create={createNewArticle}
  />

  <InfiniteLoading
    on:infinite={loadMoreArticles}
  >
    {#each $articles as article, index (article.id)}
      <ArticleRow 
        {article} 
        {writers} 
        categories={data.categories} 
        statuses={data.statuses}
      />
      {#if index < $articles.length - 1}
        <div class="divider"></div>
      {/if}
    {/each}

    <div slot="loading">Loading more articles...</div>
    <div slot="noMore">No more articles available.</div>
  </InfiniteLoading>
</Stack>

<style>
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 1em 0;
  }
</style>
