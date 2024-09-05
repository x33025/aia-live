import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { Category, Country, Status, User, Website } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  // Authenticate the user
  const storedAuthCookie = cookies.get('pb_auth');

  if (!storedAuthCookie) {
    console.error('PROTECTED: No auth cookie found, redirecting to login');
    throw redirect(303, '/login');
  }

  pb.authStore.loadFromCookie(storedAuthCookie);

  if (!pb.authStore.isValid) {
    console.error('PROTECTED: Auth store is invalid, redirecting to login');
    throw redirect(303, '/login');
  }

  try {
    await pb.collection('users').authRefresh();
  } catch (error) {
    console.error('PROTECTED: Failed to refresh authentication:', error);
    throw redirect(303, '/login');
  }

  const userId = pb.authStore.model?.id;

  if (!userId) {
    throw redirect(303, '/login');
  }

  // Fetch the authenticated user with expanded relations
  const user = await pb.collection('users').getOne<User>(userId, {
    expand: 'role' // Adjust based on your schema
  });

  // Use the auth token from pb.authStore for further requests
  const authToken = pb.authStore.token;

  // Set the token in the request headers
  const options = {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  };

  // Fetch categories with expanded subcategories (down to 3 levels)
  const categories = await pb.collection('categories').getFullList<Category>(200, {
    ...options,
    expand: 'subcategories.subcategories.subcategories' // Expanding 3 levels of subcategories
  });

  // Fetch other necessary data (statuses, countries, websites) with the auth token
  const [statuses, countries, websites] = await Promise.all([
    pb.collection('statuses').getFullList<Status>(200, options),
    pb.collection('countries').getFullList<Country>(200, options),
    pb.collection('websites').getFullList<Website>(200, options)
  ]);

  // Separate fetching for users with expanded roles
  const users = await pb.collection('users').getFullList<User>(200, {
    ...options,
    expand: 'role' // Expanded roles here
  });

  console.log(`PROTECTED: All additional data fetched successfully. Users: ${JSON.stringify(users, null, 2)}`);

  return {
    user,
    statuses,
    categories, // Now includes expanded subcategories down 3 levels
    countries,
    websites,
    users,
    title: "Hello, " + user.first_name
  };
};
