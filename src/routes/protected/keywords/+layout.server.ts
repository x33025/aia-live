import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async ({ url }) => {
  const take = 20;
  const skip = Number(url.searchParams.get('skip')) || 0;

  try {
    // Fetch keywords with pagination
    const { data: keywords, error: keywordsError } = await supabase
      .from('Keyword')
      .select('*')
      .range(skip, skip + take - 1);
  
    if (keywordsError) {
      console.error('Error details:', keywordsError);
      throw new Error(`Error fetching keywords: ${keywordsError.message}`);
    }
  
    // Fetch total count of keywords
    const { count: total, error: countError } = await supabase
      .from('Keyword')
      .select('*', { count: 'exact', head: true });
  
    if (countError) {
      console.error('Error details:', countError);
      throw new Error(`Error fetching total count: ${countError.message}`);
    }
  
    return {
      keywords,
      total: total || 0,
      skip,
      take,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
  
};
