// import { json } from '@sveltejs/kit';
// import { supabase } from '$lib/config/supabase';
// import type { RequestHandler } from './$types';
// import type { PostgrestError } from '@supabase/supabase-js'; // Import the PostgrestError type

// export const POST: RequestHandler = async ({ request }) => {
//   const { id, keyword, volume, keyword_density, evergreen, countryId } = await request.json();

//   // Create an object to hold the fields to be updated
//   const updateData: Record<string, any> = {};
//   if (keyword !== undefined) updateData.keyword = keyword;
//   if (volume !== undefined) updateData.volume = volume;
//   if (keyword_density !== undefined) updateData.keyword_density = keyword_density;
//   if (evergreen !== undefined) updateData.evergreen = evergreen;
//   if (countryId !== undefined) updateData.country_id = countryId;

//   try {
//     const { error } = await supabase
//       .from('Keyword')
//       .update(updateData)
//       .eq('id', id);

//     if (error) {
//       // Handle the PostgrestError
//       console.error('Error updating keyword:', error.message);
//       return json({ success: false, error: error.message }, { status: 500 });
//     }

//     return json({ success: true });
//   } catch (error) {
//     // Handle unexpected errors
//     console.error('Error processing request:', (error as Error).message || 'Unknown error');
//     return json({ success: false, error: (error as Error).message || 'Unknown error' }, { status: 500 });
//   }
// };
