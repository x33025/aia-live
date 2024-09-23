// $lib/services/imagesService.ts
import { BaseService } from '$lib/services/+base-service';
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
     * @param imageData - Additional image data.
     * @returns A promise that resolves to the newly created image record.
     */
        async createWithActivity(file: File, user_id: string, activityData: Record<string, any>): Promise<Image> {
        if (!user_id) {
            throw new Error('User ID is required for activity data');
        }

        const formData = new FormData();
        formData.append('file', file);

        // Add activity data including the required user_id
        formData.append('activity_data', JSON.stringify({
            user_id, // Required field
            ...activityData
        }));

        try {
            // Create the image record along with the activity_data relation
            return await this.create(formData as unknown as Partial<Image>);
        } catch (error) {
            console.error('Error creating image with activity data:', error);
            throw error;
        }
    }
}
