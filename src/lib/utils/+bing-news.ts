
// Bing news fetch function with error handling
export async function fetchBingNews(fetch: typeof globalThis.fetch, searchQuery: string = 'Latest News') {
    try {
        // Adjust this to call the actual Bing News API (or local stream)
        const response = await fetch(`/protected/stream?q=${encodeURIComponent(searchQuery)}`);
        console.log('API Response:', response);

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
