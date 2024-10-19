import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase';
import { authenticateUser } from '$lib/services/authentication-service';
import type { User, Status, Category, Country, Website } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {

  
  const userId = await authenticateUser(cookies);

  const user = await pb.collection<User>('users').getOne(userId);

  const [statuses, categories, countries, websites, users] = await Promise.all([
    pb.collection<Status>('statuses').getFullList(),
    pb.collection<Category>('categories').getFullList(),
    pb.collection<Country>('countries').getFullList(),
    pb.collection<Website>('websites').getFullList(),
    pb.collection<User>('users').getFullList({ expand: 'role' })
  ]);

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
