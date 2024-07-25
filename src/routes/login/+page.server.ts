import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs'; // Import default and destructure
import { setAuthenticationCookies } from '$lib/server/config/cookies';
import { findByEmail } from '$lib/server/services/users';

const { compareSync } = bcrypt; // Destructure the necessary function

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    // Validate form data
    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }

    const user = await findByEmail(String(email));

    // Check if the user exists and the password is correct
    if (!user || !compareSync(String(password), String(user.password_hash))) {
      return fail(400, { error: 'Invalid email or password' });
    }

    // Set authentication cookies
    setAuthenticationCookies(cookies, user.id);

    // Redirect to the dashboard
    throw redirect(302, '/protected');
  }
};
