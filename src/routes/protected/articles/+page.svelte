<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // To access $page.data
  import { articles } from '$lib/stores/data/+articles'; // Global articles store
  import { get } from 'svelte/store'; // To access the value of the store
  import ArticleRow from '$lib/components/article/+article-row.svelte';
  import { writers } from '$lib/stores/data/+users'; // Import users store
  // Set articles when the component mounts
  onMount(() => {
    articles.set($page.data.articles); // Set articles from $page.data
  });

</script>

<div class="scrollable-stack expand" style="padding: 1em;" >

    {#each $articles as article, index (article.id)}
      <ArticleRow 
        {article}
        categories={$page.data.categories}
        writers={$writers}
        statuses={$page.data.statuses}
      />
  
    {/each}


</div>


