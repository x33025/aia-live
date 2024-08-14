import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('KEYWORDS: Starting load function');
    
    const page = Number(url.searchParams.get('page')) || 1;  // Start page from 1
    console.log(`KEYWORDS: Fetching page ${page} with page size ${PAGE_SIZE}`);

    const result = await pb.collection('keywords').getList(page, PAGE_SIZE); // Correct page indexing
    console.log('KEYWORDS: Fetch request completed');

    if (!result) {
      console.error('KEYWORDS: No result found, throwing an error');
      throw new Error("Collection not found or no data returned");
    }

    const keywords = result.items;
    const total = result.totalItems;

    console.log(`KEYWORDS: Retrieved ${keywords.length} keywords out of ${total} total items`);

    return {
      keywords,
      total,
      page,
      title: "Keywords",
    };
  } catch (error) {
    console.error('KEYWORDS: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
