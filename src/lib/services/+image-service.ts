// $lib/services/imagesService.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';
import type { Image } from '$lib/types';

export class ImagesService extends BaseService<Image> {
    constructor() {
        super('images'); // images collection
    }

    /**
     * Create a new image record with the associated activity data.
     * @param file - The image file to upload.
     * @param user_id - The ID of the user performing the activity (required).
     * @param activityData - Additional activity data.
     * @returns A promise that resolves to the newly created image record.
     */
    async createWithActivity(file: File, user_id: string): Promise<Image> {
        if (!user_id) {
            console.error('User ID is required for activity data');
            throw new Error('User ID is required for activity data');
        }

        try {
            console.log('Creating activity data for user:', user_id);
            // First, create the activity_data record
            const createdActivity = await activityDataService.create({ created_by: user_id });
            console.log('Activity data created:', createdActivity);

            // Create the FormData object
            const formData = new FormData();
            formData.append('file', file);
            formData.append('activity', createdActivity.id);

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
