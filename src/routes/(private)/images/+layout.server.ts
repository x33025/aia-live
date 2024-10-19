import { pb } from '$lib/config/pocketbase';
import type { Image } from '$lib/types';

export const load = async () => {


  const images = await pb.collection<Image>('images').getFullList({
    pageSize: 100, 
    expand: 'activity,notes.activity', 
    sort: '-created', 
    filter: 'activity.deleted=null'
  });

  return {
    title: "Images",
    images
  };
};
