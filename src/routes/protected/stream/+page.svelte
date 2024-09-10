<script lang="ts">
    import Stack from "$lib/components/layout/+stack.svelte";
    import { news } from "$lib/stores/+news"; // News store
    import { Alignment, Direction, TextType, type News } from '$lib/types';
    import SearchBar from "$lib/views/search/+search-bar.svelte";
    import NewsStream from "$lib/views/stream/+news-stream.svelte";
    
    let isFetching = false; // Flag to prevent multiple fetches at the same time

    // Function to fetch and process streaming news
    async function getNews() {
        try {
            isFetching = true; // Indicate that the fetch is in progress
            const response = await fetch(`/protected/stream?q=Latest%20News`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            const reader = response.body?.getReader();
            if (!reader) {
                console.error('No readable stream available');
                return;
            }

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                // Process complete JSON objects separated by newline
                let parts = buffer.split('\n');
                for (let i = 0; i < parts.length - 1; i++) {
                    try {
                        const parsedChunk = JSON.parse(parts[i]);
                        if (parsedChunk.news) {
                            const newsItem: News = parsedChunk.news;

                            // Update the news store with each new news item
                            news.update(items => [...items, newsItem]);

                            // Also handle other actions like updating local state if needed
                        }
                    } catch (error) {
                        console.error('Error parsing JSON chunk:', error);
                    }
                }
                buffer = parts[parts.length - 1]; // Keep the remainder in the buffer
            }
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
        <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} />
        <!-- Displaying the streamed news -->
        <NewsStream />
    </Stack>


</Stack>
