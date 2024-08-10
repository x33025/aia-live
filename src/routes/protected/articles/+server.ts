import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  const { supabase, user } = locals; // Get supabase client and user from locals

  if (!user) {
    throw error(401, 'Unauthorized');
  }

  // Define the article metadata with title
  const newArticleMetadata = {
    title: 'New Article Title',
  };

  const now = new Date().toISOString();
  
  try {
    // Start by creating the Article record
    const { data: article, error: articleError } = await supabase
      .from('Article')
      .insert({})
      .select()
      .single();

    if (articleError) {
      throw error(500, `Error creating article: ${articleError.message}`);
    }

    const articleId = article.id;

    // Create related TimeData
    const { data: timeData, error: timeDataError } = await supabase
      .from('TimeData')
      .insert({
        article_id: articleId,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (timeDataError) {
      throw error(500, `Error creating TimeData: ${timeDataError.message}`);
    }

    // Create related ActivityData
    const { data: activityData, error: activityDataError } = await supabase
      .from('ActivityData')
      .insert({
        article_id: articleId,
        created_by: user.id,
        last_modified_by: user.id,
      })
      .select()
      .single();

    if (activityDataError) {
      throw error(500, `Error creating ActivityData: ${activityDataError.message}`);
    }

    // Create related ArticleMetadata and set the title
    const { data: articleMetadata, error: articleMetadataError } = await supabase
      .from('ArticleMetadata')
      .insert({
        article_id: articleId,
        time_data_id: timeData.id,
        activity_data_id: activityData.id,
        title: newArticleMetadata.title,
      })
      .select()
      .single();

    if (articleMetadataError) {
      throw error(500, `Error creating ArticleMetadata: ${articleMetadataError.message}`);
    }

    return json({
      article,
      articleMetadata,
      timeData,
      activityData,
    });
  } catch (err) {
    console.error('Error creating article and related data:', err);
    throw error(500, 'Internal Server Error');
  }
};
