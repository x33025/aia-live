import type { Actions } from './$types';
import { pb } from '$lib/config/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  login: async ({ request, cookies, fetch }) => {  // Add fetch to the destructured parameters
    console.log('LOGIN: Received login request');

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('LOGIN: Extracted form data', { email, password: password ? '***' : null });

    if (!email || !password) {
      console.error('LOGIN: Email or password missing');
      return fail(400, { error: 'Email and password are required' });
    }

    console.log(`LOGIN: Attempting login with email: ${email}`);

    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { fetch });
      console.log('LOGIN: Authentication successful', { authData });

      // Store the entire auth store state in the cookie
      const authCookie = pb.authStore.exportToCookie();
      console.log('LOGIN: Exported auth store to cookie', { authCookie });

      cookies.set('pb_auth', authCookie, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      console.log('LOGIN: Auth cookie set successfully');

    } catch (error) {
      if (error instanceof Error) {
        console.error('LOGIN: Login failed:', error.message);
        return fail(400, { email, error: 'Invalid email or password' });
      } else {
        console.error('LOGIN: An unexpected error occurred:', error);
        return fail(400, { email, error: 'An unexpected error occurred' });
      }
    }

    console.log('LOGIN: Redirecting to /protected');
    return redirect(303, '/protected');
  }
};
