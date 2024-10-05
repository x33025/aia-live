import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { articleService } from '$lib/services/+article-service';

export const load: LayoutServerLoad = async ({ params }) => {

  const { id } = params;

  if (!id) {
  
    throw error(400, 'Missing article ID');
  }

  try {
    

    // Fetch article by ID from PocketBase collection without expand option
    const article = await articleService.getOne(id, {
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
