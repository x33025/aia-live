<script lang="ts">
    import Text from "$lib/core/display/+text.svelte";
    import Stack from "$lib/core/layout/+stack.svelte";
    import { news as newsStore } from "$lib/stores/data/+news"; // Import the news store
    import { TextType, type News } from "$lib/types"; // Import your News type
    import NewsArticle from "./news-article/+news-article.svelte";

    export let newsItems: News[] = [];

    // Subscribe to the news store
    newsStore.subscribe(value => {
        newsItems = value;
    });
</script>

<style>
    :global(.scrollable-container) {
     
        overflow-y: auto;
    }
</style>

<Stack class="scrollable-container" spacing={1}>
    {#if newsItems.length === 0}
        <Text type={TextType.Subheadline} style="color: var(--gray-5); font-weight: bold;">No News Available</Text>
    {:else}
        <Text type={TextType.Subheadline} style="color: var(--gray-5); font-weight: bold;">News Streaming</Text>

       
            {#each newsItems as newsItem}
                <NewsArticle news={newsItem}/>
            {/each}
     
    {/if}
</Stack>
