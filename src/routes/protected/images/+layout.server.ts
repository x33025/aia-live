import { authenticateUser } from '$lib/services/+authentication-service';
import { userService } from '$lib/services/+user-service';
import imageService from '$lib/services/+image-service';

export const load = async ({ cookies }) => {

  const userId = await authenticateUser(cookies);

  const user = await userService.getOne(userId);

  const users = await userService.getList(); 

  const images = await imageService.getList();

  return {
    title: "Images",
    user,
    users,
    images
  };
};
