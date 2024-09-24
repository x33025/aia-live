import { json, error } from '@sveltejs/kit';
import ImageAnnotator from '$lib/config/gpts/image-annotator';
import type { Actions, RequestEvent } from './$types'; // Importing appropriate types

const imageAnnotator = new ImageAnnotator();

export const actions: Actions = {
    default: async ({ request }: RequestEvent) => {
        try {
            // Parse JSON request data
            const { imageUrl, question } = await request.json();

            console.log('Received request for image analysis:', { imageUrl, question });

            // Validate required fields
            if (!imageUrl) {
                console.error('Image URL is missing in the request');
                throw error(400, 'Image URL is required');
            }

            // Set a default question if none is provided
            const query = question || "What’s in this image?";

            // Call the GPT model to analyze the image
            console.log('Calling GPT to analyze the image');
            const gptResponse = await imageAnnotator.analyzeImage(imageUrl, query);

            console.log('GPT analysis completed:', gptResponse);

            // Return the GPT analysis result as JSON
            return json({
                gptAnalysis: gptResponse
            });
        } catch (err) {
            console.error('Error analyzing the image:', err);
            throw error(500, 'Failed to analyze image');
        }
    }
};
