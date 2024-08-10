// src/routes/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase'; // Import your PocketBase client
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  // Load the authentication state from cookies
  pb.authStore.loadFromCookie(cookies.get('pb_auth') || '');

  const user = pb.authStore.model;
  const session = null; // Adjust or remove if you handle sessions differently

  return { user, session };
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Authenticate with PocketBase
      const authData = await pb.collection('users').authWithPassword(email, password);

      // Store the authentication token in cookies
      cookies.set('pb_auth', pb.authStore.exportToCookie(), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      // On successful login, redirect to the protected page
      throw redirect(303, '/protected');
    } catch (error) {
      console.error('Login failed:', error);

      // Return a failure response with the error message
      return fail(400, { error: 'Invalid email or password' });
    }
  }
};
