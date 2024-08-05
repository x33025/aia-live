import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/config/supabase';

export const load: LayoutServerLoad = async ({ locals }) => {
  try {
    console.log('Fetching all users...');

    // Fetch all users from the public schema with their roles
    const { data: allUsers, error: allUsersError } = await supabase
      .from('User')
      .select('id, name, last_name, email, role:role_id(name)');

    if (allUsersError) {
      throw allUsersError;
    }

    console.log(`Fetched ${allUsers.length} users`);

    console.log('Fetching categories and statuses...');

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('Category')
      .select('*');

    if (categoriesError) {
      throw categoriesError;
    }

    // Fetch statuses
    const { data: statuses, error: statusesError } = await supabase
      .from('Status')
      .select('*');

    if (statusesError) {
      throw statusesError;
    }

    // Fetch countries
    const { data: countries, error: countriesError } = await supabase
      .from('Country')
      .select('*');

    if (countriesError) {
      throw countriesError;
    }

    // Log the counts for debugging purposes
    console.log(`Fetched ${categories.length} categories`);
    console.log(`Fetched ${statuses.length} statuses`);
    console.log(`Fetched ${countries.length} countries`);

    // Return data including all users, categories, statuses, countries, and the user session
    return {
      allUsers,
      categories,
      statuses,
      countries,
      user_id: locals.user?.id ?? null,
      session: locals.session,
      title: "Dashboard"
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
