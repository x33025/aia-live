import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import prisma from '$lib/server/config/prisma';
import { setAuthenticationCookies } from '$lib/server/config/cookies';
import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const email = data.get('email');
      const password = data.get('password');

      if (!email || !password) {
        return fail(400, { error: 'Email and password are required' });
      }

      const user = await prisma.user.findUnique({
        where: { email: String(email) }
      });

      if (!user) {
        return fail(400, { error: 'Invalid email or password' });
      }

      const passwordMatch = bcrypt.compareSync(String(password), String(user.password_hash));
      if (!passwordMatch) {
        return fail(400, { error: 'Invalid email or password' });
      }

      setAuthenticationCookies(cookies, user.user_id);

      // Log redirect action
      console.log('Login successful. Redirecting to /protected');
      
      // Redirect to the /protected page after successful login
      throw redirect(302, '/protected');
    } catch (err) {
      console.error('Login error:', err);
      return fail(500, { error: 'Internal Server Error' });
    }
  }
};
