import type { LayoutServerLoad } from './$types';
import { keywordService } from '$lib/services/+keyword-service';
import type { Keyword } from '$lib/types';  


export const load: LayoutServerLoad = async () => {
  try {
    console.log('FETCH_KEYWORDS: Starting load function');


    // Fetch keywords from the keyword service
    const keywords = await keywordService.getList({
      expand: 'activity,country,notes.activity',
      sort: '-created',
      filter: 'activity.deleted=null'
    });

    console.log('FETCH_KEYWORDS: Fetch request completed');

    if (!keywords) {
      console.error('FETCH_KEYWORDS: No result found, throwing an error');
      throw new Error("Collection not found or no data returned");
    }


    let totalKeywords = keywords.length;

    return {
      keywords,
      totalKeywords,
      title: "Keywords",
    };
  } catch (error) {
    console.error('FETCH_KEYWORDS: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
