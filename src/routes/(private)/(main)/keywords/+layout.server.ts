import type { LayoutServerLoad } from './$types';
import { keywordService } from '$lib/services/+keyword-service';

export const load: LayoutServerLoad = async () => {
  try {



    // Fetch keywords from the keyword service
    const keywords = await keywordService.getList({
      expand: 'activity,country,notes.activity',
      sort: '-created',
      filter: 'activity.deleted=null'
    });

 

    if (!keywords) {

      throw new Error("Collection not found or no data returned");
    }


  

    return {
      keywords,
      title: "Keywords",
    };
  } catch (error) {
    throw new Error('Failed to load data');
  }
};
