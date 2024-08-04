import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async () => {
  try {
    // Fetch first 100 keywords
    const { data: keywords, error: keywordsError } = await supabase
      .from('Keyword')
      .select('*')
      .limit(100);
  
    if (keywordsError) {
      console.error('Error details:', keywordsError);
      throw new Error(`Error fetching keywords: ${keywordsError.message}`);
    }
  
    return {
      keywords,
      total: keywords.length,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
