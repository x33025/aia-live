import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase'; // Import the PocketBase client
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  // Load the authentication state from cookies
  pb.authStore.loadFromCookie(cookies.get('pb_auth') || '');

  // Check if the user is authenticated
  const user = pb.authStore.model;

  if (!user) {
    // If the user is not authenticated, redirect them to the login page
    throw redirect(303, '/login');
  }

  // If the user is authenticated, proceed with fetching necessary data
  try {
    console.log('Fetching all users...');

    // Fetch all users from the PocketBase API
    const allUsers = await pb.collection('users').getFullList();

    console.log(`Fetched ${allUsers.length} users`);

    console.log('Fetching categories and statuses...');

    // Fetch categories
    const categories = await pb.collection('categories').getFullList();

    console.log(`Fetched ${categories.length} categories`);

    // Fetch statuses
    const statuses = await pb.collection('statuses').getFullList();

    console.log(`Fetched ${statuses.length} statuses`);

    // Fetch countries
    const countries = await pb.collection('countries').getFullList();

    console.log(`Fetched ${countries.length} countries`);

    // Return data including all users, categories, statuses, countries, and the user session
    return {
      allUsers,
      categories,
      statuses,
      countries,
      user, // Include the authenticated user here
      user_id: user.id,
      session: null, // Adjust this if you need session handling
      title: "Dashboard"
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
