import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { redirect } from '@sveltejs/kit';
import { articleService } from '$lib/services/+article-service';
import { countryService } from '$lib/services/+country-service';
import { categoryService } from '$lib/services/+category-service';
import { statusService } from '$lib/services/+status-service';
import { websiteService } from '$lib/services/+website-service';
import type { User } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {
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

  const user = await pb.collection('users').getOne<User>(userId, {
    expand: 'role'
  });

  const [statuses, categories, countries, websites] = await Promise.all([
    statusService.getList(),
    categoryService.getList(),
    countryService.getList(),
    websiteService.getList()
  ]);

  const users = await pb.collection('users').getFullList<User>({
    expand: 'role'
  });

  return {
    user,
    statuses,
    categories,
    countries,
    websites,
    users,
    title: "Hello, " + user.first_name
  };
};
