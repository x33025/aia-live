import type { Handle } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize the PocketBase client and load auth from cookies
  pb.authStore.loadFromCookie(event.cookies.get('pb_auth') || '');

  // Optionally, refresh the auth token or perform other global logic here

  // Pass the request to the next handler
  return resolve(event);
};
