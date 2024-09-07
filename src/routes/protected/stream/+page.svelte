<script lang="ts">
    import Spacer from "$lib/components/layout/+spacer.svelte";
    import Stack from "$lib/components/layout/+stack.svelte";
    import { Alignment, Direction, TextType } from "$lib/types";
    import SearchBar from "$lib/views/search/+search-bar.svelte";
    import ArticleStream from "$lib/views/stream/+article-stream.svelte";
    import { timer } from "$lib/stores/logic/+timer";
    import { news } from "$lib/stores/+news"; // Import the news store
    import { onDestroy } from 'svelte';
    import type { News } from '$lib/types'; // Import News type

    let searchQuery = "";
    let elapsedTime: number = 0;
    let newsItems: News[] = [];

    // Subscribe to the timer store
    const unsubscribe = timer.subscribe(value => {
        elapsedTime = value.elapsedTime;
        if (elapsedTime % 60 === 0 && elapsedTime > 0) {
            createNewsInterface(); // Trigger the creation every minute
        }
    });

    function handleSearch(value: string) {
        searchQuery = value; // Update the search query
    }

    function createNewsInterface() {
        // Create a new news item with all required fields
        const newItem: News = {
            id: newsItems.length + 1,
            title: `News Item ${newsItems.length + 1}`,
            content: 'This is a dynamically created news item.',
            time: new Date().toLocaleTimeString(),
            url: `https://example.com/news/${newsItems.length + 1}`, // Example URL
            rewritten_title: `Rewritten News Item ${newsItems.length + 1}`,
            rewritten_content: 'This is rewritten content for the news item.',
            notes: 'Some additional notes.',
            author: 'Author Name'
        };

        // Add the new item to the local list
        newsItems.push(newItem);

        // Add the new item to the news store
        news.update(items => [...items, newItem]);

        console.log('Creating news interface');
    }

    // Cleanup subscription on destroy
    onDestroy(() => {
        unsubscribe();
    });
</script>

<Stack direction={Direction.Horizontal} alignment={Alignment.Start} spacing={1}>
    <Spacer />
  
    <Stack spacing={1} style="width: 1200px;">
        <SearchBar type={TextType.Headline} onSearch={handleSearch} />
        
        <!-- Pass the searchQuery to the ArticleStream -->
        <ArticleStream  />

    </Stack>
    
    <Spacer />
</Stack>
