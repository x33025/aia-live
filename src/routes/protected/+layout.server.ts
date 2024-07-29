import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { User } from '@prisma/client';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    console.log('Redirecting to /login because locals.user is not set');
    throw redirect(302, '/login');
  }

  return {
    user: locals.user as User // Ensure that the returned user is of type User
  };
};
