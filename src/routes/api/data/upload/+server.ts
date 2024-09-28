import { json, error } from '@sveltejs/kit';
import imageService from '$lib/services/+image-service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log('Received POST request for image upload');

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const user_id = formData.get('user_id') as string;

        console.log('Form data extracted:', { file, user_id });

        if (!file) {
            console.error('File is missing in the request');
            throw error(400, 'File is required');
        }

        if (!user_id) {
            console.error('User ID is missing in the request');
            throw error(400, 'User ID is required');
        }

        // Create the image record with activity data
        console.log('Creating image record with activity data');
        const uploadedImage = await imageService.uploadWithActivity(file, user_id);

        console.log('Image uploaded successfully:', uploadedImage);
        return json(uploadedImage);
    } catch (err) {
        console.error('Error in image upload:', err);
        throw error(500, 'Failed to upload image');
    }
};