import type { News } from '$lib/types';
import { fetchBingNews } from '$lib/utils/+bing-news';
import type { RequestEvent } from '@sveltejs/kit';

const encoder = new TextEncoder();

// Fetch and process news items
async function fetchAndProcessNews(fetch: typeof globalThis.fetch, searchQuery: string): Promise<News[]> {
    console.log(`[GET]: Fetching news for query: ${searchQuery}`);

    // Fetch news using Bing API
    try {
        const newsItems = await fetchBingNews(fetch, searchQuery);
        console.log(`[GET]: Successfully fetched ${newsItems.length} news items`);

        // Process each news item by enhancing the object with additional properties
        const processedNews = newsItems.map((news: News) => ({
            ...news,
            content: news.content || 'No content available for now.',  // Add fallback content if missing
            rewritten_title: null,
            rewritten_content: null,
            notes: [],
            activity: '' // Placeholder for activity field
        }));

        console.log(`[GET]: Successfully processed ${processedNews.length} news items`);
        return processedNews;
    } catch (error) {
        console.error(`[GET]: Error fetching news: ${error}`);
        throw new Error(`Failed to fetch news: ${error}`);
    }
}

// Streaming function to fetch and send processed news
export async function GET(event: RequestEvent) {
    const { fetch } = event; // Use the event.fetch method
    const searchQuery = event.url.searchParams.get('q') || 'Latest News'; // Get the query or use default

    console.log(`[GET]: Streaming news for query: ${searchQuery}`);

    const stream = new ReadableStream({
        async start(controller) {
            try {
                // Fetch and process the news items
                const newsItems: News[] = await fetchAndProcessNews(fetch, searchQuery);
                console.log(`[GET]: Streaming ${newsItems.length} news items`);

                // Stream each news item individually
                for (const news of newsItems) {
                    const newsChunk = JSON.stringify({ news, stage: 'Processed' }) + '\n';
                    controller.enqueue(encoder.encode(newsChunk));
                    console.log(`[GET]: Enqueued news item: ${news.title}`);
                }

                controller.close();
                console.log(`[GET]: Finished streaming news items`);
            } catch (error) {
                console.error("[GET]: Error in news stream:", error);
                controller.enqueue(encoder.encode(JSON.stringify({ error: 'Failed to fetch news' })));
                controller.close();
            }
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked',
        }
    });
}
