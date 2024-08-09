import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

const PAGE_SIZE = 20; // Adjust as needed

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    const page = Number(url.searchParams.get('page')) || 1;
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: keywords, error: keywordsError, count } = await supabase
      .from('Keyword')
      .select(`
        *,
        ActivityData (*),
        Country (*),
        TimeData (*)
      `, { count: 'exact' })
      .range(from, to);

    if (keywordsError) {
      console.error('Error details:', keywordsError);
      throw new Error(`Error fetching keywords: ${keywordsError.message}`);
    }

    const { session, user } = await locals.safeGetSession();

    return {
      keywords: keywords as KeywordWithRelations[],
      total: count ?? 0,
      page,
      title: "Keywords",
      session,
      user
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};