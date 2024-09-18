<script lang="ts">
    import Stack from "$lib/components/layout/+stack.svelte";
    import { news } from "$lib/stores/+news"; // News store
    import { Alignment, Direction, TextType, type News } from '$lib/types';
    import NewsStream from "$lib/views/stream/+news-stream.svelte";
    
    let isFetching = false; // Flag to prevent multiple fetches at the same time

    // Function to fetch and process streaming news
    async function getNews() {
        try {
            isFetching = true; // Indicate that the fetch is in progress
            const response = await fetch(`/protected/stream`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            const { news: fetchedNews } = await response.json();
            news.set(fetchedNews);
        } catch (error) {
            console.error('Error fetching or processing news stream:', error);
        } finally {
            isFetching = false; // Reset fetching flag
        }
    }

    // Trigger the fetch when the user clicks the button
    async function handleFetchNews() {
        if (!isFetching) {
            await getNews();
        }
    }
</script>

<!-- UI -->
<Stack direction={Direction.Horizontal} alignment={Alignment.Center} >

    <Stack direction={Direction.Vertical} style="max-width: 550px;" spacing={1}>
        <button on:click={handleFetchNews} disabled={isFetching}>
            {isFetching ? 'Fetching...' : 'Fetch News'}
        </button>
        <!-- Displaying the streamed news -->
        <NewsStream />
    </Stack>

</Stack>