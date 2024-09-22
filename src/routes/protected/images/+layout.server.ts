import { authenticateUser } from '$lib/services/+authentication-service';
import { userService } from '$lib/services/+user-service';
export const load = async ({ cookies }) => {

  const userId = await authenticateUser(cookies);

  const user = await userService.getOne(userId);

  const users = await userService.getList(); 

  return {
    title: "Images",
    user,
    users
  };
};
