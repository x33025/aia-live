import { json, error } from '@sveltejs/kit';
import imageService from '$lib/services/+image-service';
import type { RequestHandler } from './$types';

// Handle image upload (POST request)



// Handle image update (PUT request)
export const PUT: RequestHandler = async ({ request }) => {
    try {
        const { image_id, data } = await request.json();

        console.log('Received PUT request for image update:', { image_id, data });

        if (!image_id) {
            console.error('Image ID is missing in the request');
            throw error(400, 'Image ID is required');
        }

        if (!data || typeof data !== 'object') {
            console.error('Data to update is missing or invalid');
            throw error(400, 'Data to update is required');
        }

        // Update the image using the ImagesService
        const updatedImage = await imageService.update(image_id, data);

        console.log('Image updated successfully:', updatedImage);
        return json(updatedImage);
    } catch (err) {
        console.error('Error in image update:', err);
        throw error(500, 'Failed to update image');
    }
};

// Handle image list retrieval (GET request)
export const GET: RequestHandler = async () => {
    try {
        // console.log('Received GET request for image list');

        // Fetch the list of images using the ImagesService
        const images = await imageService.getList({expand: 'activity,notes'});

        // console.log('Image list retrieved successfully:', images);
        return json(images);
    } catch (err) {
        console.error('Error in retrieving image list:', err);
        throw error(500, 'Failed to retrieve image list');
    }
};