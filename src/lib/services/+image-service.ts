// $lib/services/imagesService.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';
import type { Image } from '$lib/types';

export class ImageService extends BaseService<Image> {
    constructor() {
        super('images'); // images collection
    }

    async uploadWithActivity(file: File, user_id: string): Promise<Image> {
        if (!user_id || !file) {
            console.error('User ID and file are required for activity data');
            throw new Error('User ID and file are required for activity data');
        }

        try {
            console.log('Creating activity data for user:', user_id);
            // First, create the activity_data record
            const activity = await activityDataService.create({ created_by: user_id });
            console.log('Activity data created:', activity);

            // Create the FormData object
            const formData = new FormData();
            formData.append('file', file);
            formData.append('activity', activity.id);

            console.log('FormData created:', formData);

            const createdImage = await this.create(formData as unknown as Partial<Image>);
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