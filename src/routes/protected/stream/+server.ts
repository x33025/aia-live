import type { News } from '$lib/types';
import { fetchBingNews } from '$lib/utils/+bing-news';
import type { RequestEvent } from '@sveltejs/kit';

const encoder = new TextEncoder();

// Fetch and process news items
async function fetchAndProcessNews(fetch: typeof globalThis.fetch, searchQuery: string): Promise<News[]> {
    console.log("[GET]: Fetching and processing news...");

    // Fetch news using Bing API
    const newsItems = await fetchBingNews(fetch, searchQuery);

    // Process each news item by enhancing the object with additional properties
    const processedNews = newsItems.map((news: News) => ({
        ...news,
        content: news.content || 'No content available for now.',  // Add fallback content if missing
        rewritten_title: null,
        rewritten_content: null,
        notes: [],
        activity: '' // Placeholder for activity field
    }));

    return processedNews;
}

// Streaming function to fetch and send processed news
export async function GET(event: RequestEvent) {
    const { fetch } = event; // Use the event.fetch method
    const searchQuery = event.url.searchParams.get('q') || 'Latest News'; // Get the query or use default

    const stream = new ReadableStream({
        async start(controller) {
            try {
                // Fetch and process the news items
                const newsItems: News[] = await fetchAndProcessNews(fetch, searchQuery);

                // Stream each news item individually
                newsItems.forEach((news: News) => {
                    const newsChunk = JSON.stringify({ news, stage: 'Processed' }) + '\n';
                    controller.enqueue(encoder.encode(newsChunk));
                });

                controller.close();
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