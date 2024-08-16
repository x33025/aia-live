import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('FETCH_ARTICLES: Starting load function');
    
    // Fetching articles
    const page = Number(url.searchParams.get('page')) || 1;
    console.log(`FETCH_ARTICLES: Fetching page ${page} with page size ${PAGE_SIZE}`);

    const articlesResult = await pb.collection('articles').getList(page, PAGE_SIZE);
    console.log('FETCH_ARTICLES: Fetch request completed');

    if (!articlesResult) {
      console.error('FETCH_ARTICLES: No articles found, throwing an error');
      throw new Error("No articles returned");
    }

    const articles = articlesResult.items;
    const total = articlesResult.totalItems;

    console.log(`FETCH_ARTICLES: Retrieved ${articles.length} articles out of ${total} total items`);

    // Return the fetched articles data
    return {
      articles,
      total,
      page,
      title: "Articles",
    };
  } catch (error) {
    console.error('FETCH_ARTICLES: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
