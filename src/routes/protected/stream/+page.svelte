<script lang="ts">
    import Spacer from "$lib/components/layout/+spacer.svelte";
    import Stack from "$lib/components/layout/+stack.svelte";
    import { Alignment, Direction } from "$lib/types";
    import NewsStream from "$lib/views/stream/+news-stream.svelte";
    import { timer } from "$lib/stores/logic/+timer";
    import { news } from "$lib/stores/+news"; // News store
    import { onMount, onDestroy } from 'svelte';

    let elapsedTime = 0;
    let isFetching = false; // Prevent multiple fetches simultaneously

    // Function to fetch and process streaming news
    async function fetchBingNews() {
        try {
            const response = await fetch(`/protected/stream?q=Latest%20News`);
            console.log('API Response:', response); // Log the raw response

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            const reader = response.body?.getReader();
            if (!reader) {
                console.error('No readable stream available');
                return [];
            }

            const decoder = new TextDecoder();
            let newsItems: any[] = [];
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
                            newsItems.push(parsedChunk.news);
                        }
                    } catch (error) {
                        console.error('Error parsing JSON chunk:', error);
                    }
                }
                buffer = parts[parts.length - 1]; // Keep the remainder in the buffer
            }

            return newsItems;
        } catch (error) {
            console.error('Error fetching or processing news stream:', error);
            return [];
        }
    }

    async function createNewsInterface() {
        // Prevent multiple simultaneous fetches
        if (isFetching) return;
        isFetching = true;

        // Fetch news articles from the backend API
        const fetchedNews = await fetchBingNews();

        // Log the fetched news
        console.log('Fetched news:', fetchedNews);

        // Update the news store with fetched articles
        if (Array.isArray(fetchedNews) && fetchedNews.length > 0) {
            news.update(items => [...items, ...fetchedNews]);
        }

        console.log('News interface updated with new articles');
        isFetching = false; // Reset the flag after fetch is complete
    }

    // Set up news fetching logic on mount
    onMount(() => {
        createNewsInterface(); // Initial fetch

        // Subscribe to the news store and log its content whenever it updates
        const unsubscribeNews = news.subscribe((newsItems) => {
            console.log('News store updated:', newsItems);
        });

        // Subscribe to the timer store and trigger fetch every 5 minutes
        const unsubscribeTimer = timer.subscribe(value => {
            elapsedTime = value.elapsedTime;
            if (elapsedTime % 300 === 0 && elapsedTime > 0 && !isFetching) {
                createNewsInterface(); // Fetch news every 5 minutes
            }
        });

        // Cleanup on destroy
        onDestroy(() => {
            unsubscribeNews(); // Unsubscribe from the news store
            unsubscribeTimer(); // Unsubscribe from the timer store
        });
    });
</script>

<Stack direction={Direction.Horizontal} alignment={Alignment.Start} spacing={1}>
    <Spacer />
  
    <Stack spacing={1} style="width: 1200px;">
        <NewsStream />
    </Stack>
    
    <Spacer />
</Stack>
