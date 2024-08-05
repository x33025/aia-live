import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async ({ locals }) => {
  try {
    const { data: keywords, error: keywordsError } = await supabase
      .from('Keyword')
      .select(`
        *,
        ActivityData (*),
        Country (*),
        TimeData (*)
      `)
      .limit(100);

    if (keywordsError) {
      console.error('Error details:', keywordsError);
      throw new Error(`Error fetching keywords: ${keywordsError.message}`);
    }

    const { session, user } = await locals.safeGetSession();

    return {
      keywords: keywords as KeywordWithRelations[],
      total: keywords.length,
      title: "Keywords",
      session,
      user
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};