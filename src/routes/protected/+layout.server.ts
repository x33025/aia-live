import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const storedAuthCookie = cookies.get('pb_auth');
  console.log('PROTECTED: Stored auth cookie:', storedAuthCookie ? 'exists' : 'not found');

  if (storedAuthCookie) {
    pb.authStore.loadFromCookie(storedAuthCookie);
  } else {
    console.error('PROTECTED: No auth cookie found, redirecting to login');
    throw redirect(303, '/login');
  }

  console.log('PROTECTED: Auth store valid:', pb.authStore.isValid);

  if (!pb.authStore.isValid) {
    console.error('PROTECTED: Auth store is invalid, redirecting to login');
    throw redirect(303, '/login');
  }

  try {
    await pb.collection('users').authRefresh();
    console.log('PROTECTED: Authentication refreshed successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('PROTECTED: Failed to refresh authentication:', error.message);
    } else {
      console.error('PROTECTED: An unexpected error occurred:', error);
    }
    throw redirect(303, '/login');
  }

  // Get the user ID from the auth store model
  const userId = pb.authStore.model?.id;

  // Fetch the latest user details from the users collection
  const user = await pb.collection('users').getOne(userId);

  return {
    user, // This now contains the full user object with first_name and other fields
    title: 'Dashboard'
  };
};
