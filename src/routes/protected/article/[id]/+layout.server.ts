import type { LayoutServerLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const { supabase } = locals;
  const articleId = params.id; // Fetching 'id' from the route parameters

  let article: Article | null = null;
  let metadata: ArticleMetadata | null = null;

  if (articleId) {
    // Fetch article and its associated metadata in one query
    const { data, error } = await supabase
      .from('Article') // Replace 'Article' with your actual table name
      .select(`
        *,
        metadata: ArticleMetadata(*) 
      `)
      .eq('id', articleId)
      .single();

    if (error) {
      console.error('Error fetching article:', error.message);
    } else if (data) {
      article = data;
      metadata = data.metadata as ArticleMetadata; // Assuming metadata is included in the result
    }
  }

  return {
    article,
    metadata,
  };
};
