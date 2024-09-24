import { json, error } from '@sveltejs/kit';
import imageService from '$lib/services/+image-service';


// Handle image upload (POST request)
export async function POST({ request }) {
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
        const uploadedImage = await imageService.createWithActivity(file, user_id);

        console.log('Image uploaded successfully:', uploadedImage);
        return json(uploadedImage);
    } catch (err) {
        console.error('Error in image upload:', err);
        throw error(500, 'Failed to upload image');
    }
}

// Handle image deletion (DELETE request)
export async function DELETE({ request }) {
    try {
        const { image_id } = await request.json();

        console.log('Received DELETE request for image:', { image_id });

        if (!image_id) {
            console.error('Image ID is missing in the request');
            throw error(400, 'Image ID is required');
        }

        // Delete the image using the ImagesService
        console.log('Attempting to delete image record with activity data');
        const deletedImage = await imageService.delete(image_id);

        console.log('Image deleted successfully:', deletedImage);
        return json({ message: 'Image deleted successfully', deletedImage });
    } catch (err) {
        console.error('Error in image deletion:', err);
        throw error(500, 'Failed to delete image');
    }
}

// Handle image update (PUT request)
export async function PUT({ request }) {
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
}

// Handle image list retrieval (GET request)
export async function GET() {
    try {
        console.log('Received GET request for image list');

        // Fetch the list of images using the ImagesService
        const images = await imageService.getList();

        console.log('Image list retrieved successfully:', images);
        return json(images);
    } catch (err) {
        console.error('Error in retrieving image list:', err);
        throw error(500, 'Failed to retrieve image list');
    }
}