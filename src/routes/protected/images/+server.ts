// src/routes/api/images/+server.ts
import { json, error } from '@sveltejs/kit';
import { ImagesService } from '$lib/services/+image-service';

const imagesService = new ImagesService();

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const user_id = formData.get('user_id') as string;

        // Ensure that the file and user_id are provided
        if (!file) {
            throw error(400, 'File is required');
        }

        if (!user_id) {
            throw error(400, 'User ID is required');
        }

        // Extract additional activity data
        const activityData = {
            activityType: 'image_upload',
            timestamp: new Date().toISOString(),
        };



        // Create the image record with activity data
        const uploadedImage = await imagesService.createWithActivity(file, user_id, activityData);

        return json(uploadedImage);
    } catch (err) {
        console.error('Error in image upload:', err);
        throw error(500, 'Failed to upload image');
    }
}
