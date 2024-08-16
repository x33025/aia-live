import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('FETCH_KEYWORDS: Starting load function');
    
    const page = Number(url.searchParams.get('page')) || 1;  // Start page from 1
    console.log(`FETCH_KEYWORDS: Fetching page ${page} with page size ${PAGE_SIZE}`);

    const result = await pb.collection('keywords').getList(page, PAGE_SIZE); // Correct page indexing
    console.log('FETCH_KEYWORDS: Fetch request completed');

    if (!result) {
      console.error('FETCH_KEYWORDS: No result found, throwing an error');
      throw new Error("Collection not found or no data returned");
    }

    const keywords = result.items;
    const total = result.totalItems;

    console.log(`FETCH_KEYWORDS: Retrieved ${keywords.length} keywords out of ${total} total items`);

    // Log the full keywords array as a JSON string
    console.log(`FETCH_KEYWORDS: Keywords data: ${JSON.stringify(keywords, null, 2)}`);

    return {
      keywords,
      total,
      page,
      title: "Keywords",
    };
  } catch (error) {
    console.error('FETCH_KEYWORDS: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
