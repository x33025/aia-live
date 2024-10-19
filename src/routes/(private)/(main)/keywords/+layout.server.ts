import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { keywordService } from '$lib/services/keyword-service';
import type { Keyword } from '$lib/types';

export const load: LayoutServerLoad = async () => {
  try {



    // Fetch keywords from the keyword service
    const keywords = await pb.collection<Keyword>('keywords').getFullList({
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
