import { json } from '@sveltejs/kit';
import { callWinstonAPI } from './api/winston';
import { callCopyleaksAPI } from './api/copyleaks';

export async function POST({ request }) {
    try {
        console.log('WINSTON: Received POST request');
        const { textToCheck } = await request.json();  // Extract the text to check from the request body
        console.log('WINSTON: Extracted text from request');

        // Ensure the text meets the minimum character requirement
        if (!textToCheck || textToCheck.length < 300) {
            console.log('WINSTON: Text does not meet the minimum character requirement');
            return json({ error: 'Text must be at least 300 characters long.' }, { status: 400 });
        }

        // Call both Winston and Copyleaks API functions
        const [winstonResult, copyleaksResult] = await Promise.all([
            callWinstonAPI(textToCheck),
            callCopyleaksAPI(textToCheck)
        ]);

        // Combine the results
        const combinedResult = {
            winston: winstonResult,
            copyleaks: copyleaksResult
        };
console.log( combinedResult);
        return json(combinedResult);  // Return the combined detection results
    } catch (error: any) {
        console.log(`WINSTON: Error occurred - ${error.message}`);
        return json({ error: error.message }, { status: 500 });
    }
}