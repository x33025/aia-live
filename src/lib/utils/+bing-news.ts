import { BING_NEWS_API_KEY } from '$env/static/private';

export function fetchBingNews(fetch: typeof globalThis.fetch, searchQuery: string = 'Latest News'): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const subscriptionKey = BING_NEWS_API_KEY; // Get the Bing API key from the .env file
        const endpoint = 'https://api.bing.microsoft.com/v7.0/news/search'; // Bing News Search API endpoint
        const queryParams = `?q=${encodeURIComponent(searchQuery)}&count=5&mkt=en-US&setLang=EN`; // Customize the query as needed

        try {
            const response = await fetch(`${endpoint}${queryParams}`, {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }

            const data = await response.json();

            // Parse the relevant fields from the Bing News API response
            const newsItems = data.value.map((item: any) => ({
                title: item.name, // The news title
                url: item.url,    // The news article URL
                description: item.description || 'No description available', // News description
                datePublished: item.datePublished, // Date of publication
            }));

            resolve(newsItems); // Resolve the promise with newsItems
        } catch (error) {
            console.error('Error fetching or processing news stream:', error);
            reject(error); // Reject the promise if an error occurs
        }
    });
}
