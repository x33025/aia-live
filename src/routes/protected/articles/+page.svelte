<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // To access $page.data
  import { articles } from '$lib/stores/+articles'; // Global articles store
  import { get } from 'svelte/store'; // To access the value of the store
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { writers } from '$lib/stores/+users'; // Import users store
    import SearchBar from '$lib/views/search/+search-bar.svelte';

  // Set articles when the component mounts
  onMount(() => {
    articles.set($page.data.articles); // Set articles from $page.data
  });

  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
  };
</script>

<Stack spacing={1}>
  <SearchBar onSearch={handleSearch} />
  <Stack spacing={0.5} class="scrollable-stack">
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
