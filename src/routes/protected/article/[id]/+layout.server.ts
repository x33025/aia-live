import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const { supabase } = locals;
  const articleId = params.id; // Fetching 'id' from the route parameters

  console.log('Loading article with ID:', articleId);

  let article = null;
  let metadata = null;
  let activityData = null;
  let timeData = null;

  if (articleId) {
    console.log('Fetching article with related data from database...');

    const { data, error } = await supabase
      .from('Article')
      .select(`
        *,
        ArticleMetadata (
          *,
          ActivityData (*),
          TimeData (*)
        )
      `)
      .eq('id', articleId)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
    } else if (data) {
      console.log('Data fetched successfully:', data);
      article = data;
      metadata = data?.ArticleMetadata ?? null;
      activityData = metadata?.ActivityData ?? null;
      timeData = metadata?.TimeData ?? null;
    } else {
      console.log('No data returned for article with ID:', articleId);
    }
  } else {
    console.warn('No article ID provided in route parameters.');
  }

  return {
    article,
    metadata,
    activityData,
    timeData,
    title: "Article"
  };
};
