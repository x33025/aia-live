import { authenticateUser } from '$lib/services/+authentication-service';
import { userService } from '$lib/services/+user-service';
import imageService from '$lib/services/+image-service';

export const load = async () => {


  const images = await imageService.getList({pageSize: 100, expand: 'activity,notes.activity', sort: '-created', filter: 'activity.deleted=null'});

  return {
    title: "Images",
    images
  };
};
