import { v4 as uuidv4 } from 'uuid';


export async function callCopyleaksAPI(textToCheck: string) {
    const scanId = uuidv4();  // Generate a unique scan ID for this request
    const apiUrl = `https://api.copyleaks.com/v2/writer-detector/${scanId}/check`;
    
    console.log('COPYLEAKS: Preparing to call Copyleaks API');
    console.log(`COPYLEAKS: Generated scan ID - ${scanId}`);
    console.log(`COPYLEAKS: API URL - ${apiUrl}`);
    console.log(`COPYLEAKS: Text to check - ${textToCheck}`);
    console.log(`COPYLEAKS: API Key - ${import.meta.env.COPYLEAKS_API_KEY}`);

    const requestBody = {
        text: textToCheck,  // Send the text to Copyleaks for analysis
        language: 'en',     // Set the language (optional, default is 'en')
        sandbox: true       // Use sandbox mode for testing (remove in production)
    };

    console.log('COPYLEAKS: Request body:', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.COPYLEAKS_API_KEY}`  // Use the API key from environment variables
            },
            body: JSON.stringify(requestBody)
        });

        console.log('COPYLEAKS: API call made, awaiting response');
        console.log(`COPYLEAKS: Response status - ${response.status}`);
        console.log(`COPYLEAKS: Response status text - ${response.statusText}`);

        if (!response.ok) {
            console.log('COPYLEAKS: API call failed');
            const errorText = await response.text();
            console.log(`COPYLEAKS: Error response - ${errorText}`);
            throw new Error('Failed to detect AI content with Copyleaks');
        }

        const result = await response.json();  // Parse the result
        console.log('COPYLEAKS: API call succeeded, returning result');
        console.log(`COPYLEAKS: Result - ${JSON.stringify(result, null, 2)}`);
        return result;  // Return the detection result
    } catch (error: any) {
        console.log(`COPYLEAKS: Exception occurred - ${error.message}`);
        throw error;
    }
}