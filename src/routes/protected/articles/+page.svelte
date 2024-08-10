<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  import ArticleInputRow from '$lib/views/article/+article-input-row.svelte'; // Import ArticleInputRow
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

  async function loadMoreArticles(done: (more: boolean) => void) {
    if (loading || !hasMore) return;
    loading = true;

    try {
      const res = await fetch(`?page=${page + 1}`);
      const newData = await res.json();

      if (newData.articles.length) {
        articles.update(curr => [...curr, ...newData.articles]);
        page += 1;
        done(true); // Signal that more data is available
      } else {
        hasMore = false;
        done(false); // Signal that no more data is available
      }
    } catch (err) {
      console.error('Failed to load more articles:', err);
      hasMore = false;
      done(false); // Signal that no more data is available
    } finally {
      loading = false;
    }
  }

  function createNewArticle() {

  
    // Here you would also call the server to persist the new article
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
    hasMore={hasMore}
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
    <div slot="no-more">No more articles available.</div>
  </InfiniteLoading>
</Stack>

<style>
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 1em 0;
  }

  .create-article-button {
    margin-bottom: 1em;
    background-color: #4CAF50;
    color: white;
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .create-article-button:hover {
    background-color: #45a049;
  }
</style> -->
