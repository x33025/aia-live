import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async () => {
  try {
    console.log('Fetching article metadata...');

    // Fetch article metadata with a limit of 100
    const { data: articles, error: articlesError } = await supabase
      .from('ArticleMetadata')
      .select('*')
      .limit(100);

    if (articlesError) {
      throw articlesError;
    }

    console.log(`Fetched ${articles.length} articles`);

    // Return data including articles
    return {
      articles,
      title: "Articles"
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
