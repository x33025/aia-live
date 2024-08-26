<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // To access $page.data
  import { articles } from '$lib/stores/+articles'; // Global articles store
  import { get } from 'svelte/store'; // To access the value of the store
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { users } from '$lib/stores/+users'; // Import users store

  // Function to filter users with role name "Writer"
  function filterWriters() {
    return get(users).filter(user => 
      user.expand?.role?.some(role => role.name === "Writer")
    );
  }

  // Set articles when the component mounts
  onMount(() => {
    articles.set($page.data.articles); // Set articles from $page.data
  });
</script>

<Stack spacing={0.5}>

  {#each $articles as article, index (article.id)}
    <ArticleRow 
      {article}
      categories={$page.data.categories}
      statuses={$page.data.statuses}
      writers={filterWriters()}
    />
    {#if index < $articles.length - 1}
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
