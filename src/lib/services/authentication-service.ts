import { pb } from '$lib/config/pocketbase';
import { redirect } from '@sveltejs/kit';

export async function authenticateUser(cookies: any) {
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

  return userId;
}