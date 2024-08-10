import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async ({ url }) => {
  try {
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 20; // Fetch 20 items at a time

    console.log(`Fetching article metadata for page ${page}...`);

    // Fetch article metadata with pagination
    const { data: articles, error: articlesError } = await supabase
      .from('ArticleMetadata')
      .select('*')
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (articlesError) {
      throw articlesError;
    }

    console.log(`Fetched ${articles.length} articles`);

    return {
      articles,
      title: "Articles",
      page,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
