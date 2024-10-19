// $lib/services/imagesService.ts
import { pb } from '$lib/config/pocketbase';
import type { ActivityData } from '$lib/types';
import type { Image } from '$lib/types';

class ImageService  {

    async uploadWithActivity(file: File, user_id: string): Promise<Image> {
        if (!user_id || !file) {
            console.error('User ID and file are required for activity data');
            throw new Error('User ID and file are required for activity data');
        }

        try {
            console.log('Creating activity data for user:', user_id);
            // First, create the activity_data record
            const activity = await pb.collection<ActivityData>('activities').create({ created_by: user_id });
            console.log('Activity data created:', activity);

            // Create the FormData object
            const formData = new FormData();
            formData.append('file', file);
            formData.append('activity', activity.id);

            console.log('FormData created:', formData);

            const createdImage = await pb.collection<Image>('images').create(formData as unknown as Partial<Image>);
            console.log('Image created:', createdImage);

            return createdImage;
        } catch (error) {
            console.error('Error creating image with activity data:', error);
            throw error;
        }
    }
}


const imageService = new ImageService();


export default imageService;