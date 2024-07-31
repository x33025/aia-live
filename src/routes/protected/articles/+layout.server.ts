// import type { LayoutServerLoad } from './$types';
// import { supabase } from '$lib/config/supabase';

// export const load: LayoutServerLoad = async ({ url }) => {
//   const take = 20;
//   const skip = Number(url.searchParams.get('skip')) || 0;

//   try {
//     console.log('Fetching articles with related data...');

//     // Fetch articles with related data
//     const { data: articles, error: articlesError } = await supabase
//       .from('article_metadata')
//       .select('*, get_info(*), keywords(*)')
//       .order('date_created', { foreignTable: 'get_info', ascending: false })
//       .range(skip, skip + take - 1);

//     if (articlesError) {
//       throw articlesError;
//     }

//     // Fetch writers
//     const { data: writers, error: writersError } = await supabase
//       .from('user')
//       .select('*')
//       .eq('role', 'Writer');

//     if (writersError) {
//       throw writersError;
//     }

//     // Fetch categories
//     const { data: categories, error: categoriesError } = await supabase
//       .from('category')
//       .select('*');

//     if (categoriesError) {
//       throw categoriesError;
//     }

//     // Fetch statuses
//     const { data: statuses, error: statusesError } = await supabase
//       .from('status')
//       .select('*');

//     if (statusesError) {
//       throw statusesError;
//     }

//     // Count total number of articles
//     const { count: total, error: countError } = await supabase
//       .from('article_metadata')
//       .select('id', { count: 'exact', head: true });

//     if (countError) {
//       throw countError;
//     }

//     console.log(`Fetched ${articles.length} articles`);
//     console.log(`Fetched ${writers.length} writers`);
//     console.log(`Fetched ${categories.length} categories`);
//     console.log(`Fetched ${statuses.length} statuses`);
//     console.log(`Total number of articles: ${total}`);

//     // Log if any keyword is associated with article metadata
//     articles.forEach(article => {
//       if (article.keywords && article.keywords.length > 0) {
//         console.log(`Article with ID ${article.id} has keywords:`, article.keywords.map(k => k.keyword).join(', '));
//       } else {
//         console.log(`Article with ID ${article.id} has no keywords`);
//       }
//     });

//     // Return data including articles and other details
//     return {
//       articles,
//       writers,
//       categories,
//       statuses,
//       total,
//       skip,
//       take,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw new Error('Failed to load data');
//   }
// };
