import { json, error } from '@sveltejs/kit';
import ImageAnnotator from '$lib/config/gpts/image-annotator';
import type { RequestEvent } from '@sveltejs/kit';

const imageAnnotator = new ImageAnnotator();

export const POST = async ({ request }: RequestEvent) => {
    try {
        const { imageUrl } = await request.json();

        console.log('Received request for image analysis:', { imageUrl });

        if (!imageUrl) {
            console.error('Image URL is missing in the request');
            throw error(400, 'Image URL is required');
        }

        // Call GPT to analyze the image
        console.log('Calling GPT to analyze the image');
        const gptResponse = await imageAnnotator.analyzeImage(imageUrl);

        console.log('GPT analysis completed:', gptResponse);

        return json({
            gptAnalysis: gptResponse
        });
    } catch (err) {
        console.error('Error analyzing the image:', err);
        throw error(500, 'Failed to analyze image');
    }
};
