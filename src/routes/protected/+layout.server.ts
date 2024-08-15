import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { redirect } from '@sveltejs/kit';

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
  const user = await pb.collection('users').getOne(userId, {
    expand: 'role,profile' // Adjust based on your schema
  });

  // Fetch all other necessary data in parallel
  const [statuses, categories, countries, websites, users, roles] = await Promise.all([
    pb.collection('statuses').getFullList(),
    pb.collection('categories').getFullList(),
    pb.collection('countries').getFullList(),
    pb.collection('websites').getFullList(),
    pb.collection('users').getFullList(),
    pb.collection('roles').getFullList(),
  ]);

  console.log('PROTECTED: All additional data fetched successfully.');

  return {
    user,
    statuses,
    categories,
    countries,
    websites,
    users,
    roles,
    title: 'Dashboard',
  };
};
