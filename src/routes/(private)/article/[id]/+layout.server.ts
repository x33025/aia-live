import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import type { Article } from '$lib/types';

export const load: LayoutServerLoad = async ({ params }) => {


  const { id } = params;

  if (!id) {
  
    throw error(400, 'Missing article ID');
  }



  try {
    

    // Fetch article by ID from PocketBase collection without expand option
    const article = await pb.collection<Article>('articles').getOne(id, {
          expand: 'keywords,activity,main_image,main_keyword,notes.activity'

    });

    if (!article) {
      throw error(404, 'Article not found');
    }


    return {
      article
    };
  } catch (err) {
    throw error(500, 'Failed to fetch article');
  }
};
