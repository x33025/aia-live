// import type { LayoutServerLoad } from './$types';
// import { pb } from '$lib/config/pocketbase'; // Import the configured PocketBase client
// import { redirect } from '@sveltejs/kit';

// export const load: LayoutServerLoad = async ({ cookies }) => {
//   // Load the authentication state from cookies
//   pb.authStore.loadFromCookie(cookies.get('pb_auth') || '');

//   // Check if the authentication is valid
//   if (!pb.authStore.isValid) {
//     console.log('PROTECTED: Invalid authentication, redirecting to login...');
//     // If the authentication is not valid, redirect to the login page
//     throw redirect(303, '/login');
//   }

//   try {
//     // Refresh the authentication to ensure the token is up-to-date
//     await pb.collection('users').authRefresh();
//   } catch (error) {
//     console.error('PROTECTED: Failed to refresh authentication:', error);
//     // Redirect to login if the token refresh fails
//     throw redirect(303, '/login');
//   }

//   // If the authentication is valid, pass down the whole user object
//   const user = pb.authStore.model;
  
//   return {
//     user,
//     title: "Dashboard"
//   };
// };
