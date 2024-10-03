import type { LayoutServerLoad } from './$types';
import { countryService } from '$lib/services/+country-service';
import { userService } from '$lib/services/+user-service';
import { categoryService } from '$lib/services/+category-service';
import { statusService } from '$lib/services/+status-service';
import { websiteService } from '$lib/services/+website-service';
import { authenticateUser } from '$lib/services/+authentication-service';



export const load: LayoutServerLoad = async ({ cookies }) => {

  
  const userId = await authenticateUser(cookies);

  const user = await userService.getOne(userId);

  const [statuses, categories, countries, websites, users] = await Promise.all([
    statusService.getList(),
    categoryService.getList(),
    countryService.getList(),
    websiteService.getList(),
    userService.getList({ expand: 'role' })
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
