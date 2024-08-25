import { error } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase'; // Assuming you've set up PocketBase client instance as `pb`
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const { id } = params;

  if (!id) {
    console.error('ARTICLE: Missing article ID');
    throw error(400, 'Missing article ID');
  }

  try {
    console.log(`ARTICLE: Fetching article with ID: ${id}`);

    // Fetch article by ID from PocketBase collection without expand option
    const article = await pb.collection('articles').getOne(id, {
          expand: 'keywords,activity,main_image,main_keyword'

    });

    if (!article) {
      console.error(`ARTICLE: Article not found with ID: ${id}`);
      throw error(404, 'Article not found');
    }

    console.log(`ARTICLE: Successfully fetched article with ID: ${id}`);
    console.log('ARTICLE: Returning article to the page:', { article, title: null });

    return {
      article,
      title: null // Title is handled by higher layout
    };
  } catch (err) {
    console.error(`ARTICLE: Error fetching article with ID: ${id} - ${err}`);
    throw error(500, 'Failed to fetch article');
  }
};
