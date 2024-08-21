import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('FETCH_DATA: Starting load function');
    
    // Fetching articles with expanded keywords
    const page = Number(url.searchParams.get('page')) || 1;
    console.log(`FETCH_DATA: Fetching articles page ${page} with page size ${PAGE_SIZE}`);

    // Expand the 'keywords' field to include the full keyword details rather than just IDs
    const articlesResult = await pb.collection('articles').getList(page, PAGE_SIZE, {
      expand: 'keywords',  // This will expand the keywords field
    });
    
    console.log('FETCH_DATA: Articles fetch request completed');

    if (!articlesResult) {
      console.error('FETCH_DATA: No articles found, throwing an error');
      throw new Error("No articles returned");
    }

    const articles = articlesResult.items;
    const totalArticles = articlesResult.totalItems;

    console.log(`FETCH_DATA: Retrieved ${articles.length} articles out of ${totalArticles} total items`);

    // Return the fetched articles data including expanded keywords
    return {
      articles,
      totalArticles,
      page,
      title: "Articles",
    };
  } catch (error) {
    console.error('FETCH_DATA: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
