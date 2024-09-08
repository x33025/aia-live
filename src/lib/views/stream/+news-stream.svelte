<script lang="ts">
    import Stack from "$lib/components/layout/+stack.svelte";
    import { news as newsStore } from "$lib/stores/+news"; // Import the news store
    import type { News } from "$lib/types"; // Import your News type
    import NewsArticle from "./news-article/+news-article.svelte";

    export let newsItems: News[] = [];

    // Subscribe to the news store
    newsStore.subscribe(value => {
        newsItems = value;
    });
</script>

<Stack spacing={1}>
    {#if newsItems.length === 0}
        <p>No news available</p>
    {:else}
        {#each newsItems as newsItem}
            <NewsArticle news={newsItem}/>
        {/each}
    {/if}
</Stack>
