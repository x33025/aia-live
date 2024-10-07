import type { Actions } from './$types';
import { pb } from '$lib/config/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  login: async ({ request, cookies, fetch }) => {
   
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;


    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }


    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { fetch });

      // Update user's last_active field
      const userId = authData.record.id;
      await pb.collection('users').update(userId, { last_login: new Date().toISOString() });

      // Store the entire auth store state in the cookie
      const authCookie = pb.authStore.exportToCookie();
     
      cookies.set('pb_auth', authCookie, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

   

    } catch (error) {
      if (error instanceof Error) {
       
        return fail(400, { email, error: 'Invalid email or password' });
      } else {
    
        return fail(400, { email, error: 'An unexpected error occurred' });
      }
    }

 
    return redirect(303, '/dashboard');
  }
};
