import type { Actions } from './$types';
import { pb } from '$lib/config/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        console.log('LOGIN: Received login request');
        
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log(`LOGIN: Attempting login with email: ${email}`);

        try {
            // Authenticate with PocketBase
            // const authData = await pb.collection('users').authWithPassword(email, password);

            // console.log('LOGIN: Authentication successful');

            // // Store the authentication token in cookies
            // console.log('LOGIN: Storing authentication token in cookies');
            // cookies.set('pb_auth', authData.token || pb.authStore.exportToCookie(), {
            //     path: '/',
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     maxAge: 60 * 60 * 24 * 7 // 1 week
            // });

            // console.log('LOGIN: Redirecting to /protected');
            // On successful login, return a redirect to the protected page
            redirect(303, '/protected');
        } catch (error) {
            console.error('LOGIN: Login failed:', error);

            // Pass form data back to the client with the error message
            return fail(400, { form: { email, error: 'Invalid email or password' } });
        }
    }
};
