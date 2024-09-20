import type { LayoutServerLoad } from './$types';
import { keywordService } from '$lib/services/+keyword-service';
import type { Keyword } from '$lib/types';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('FETCH_KEYWORDS: Starting load function');

    const page = Number(url.searchParams.get('page')) || 1;  // Start page from 1
    console.log(`FETCH_KEYWORDS: Fetching page ${page} with page size ${PAGE_SIZE}`);

    // Fetch keywords from the keyword service
    const keywords = await keywordService.getList({
      page,
      pageSize: PAGE_SIZE,
      expand: 'activity,country,notes',
      sort: '-created'
    });

    console.log('FETCH_KEYWORDS: Fetch request completed');

    if (!keywords) {
      console.error('FETCH_KEYWORDS: No result found, throwing an error');
      throw new Error("Collection not found or no data returned");
    }

    const items = keywords as Keyword[];
    const total = keywords.length;

    console.log(`FETCH_KEYWORDS: Retrieved ${items.length} keywords out of ${total} total items`);

    return {
      keywords: items,
      total,
      page,
      title: "Keywords",
    };
  } catch (error) {
    console.error('FETCH_KEYWORDS: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
