import { env } from '$env/dynamic/private';

export async function callWinstonAPI(textToCheck: string) {
    const apiUrl = 'https://api.gowinston.ai/v2/ai-content-detection';
    console.log('WINSTON: Preparing to call Winston AI API');
    console.log(`WINSTON: API URL - ${apiUrl}`);
    console.log(`WINSTON: Text to check - ${textToCheck}`);
    console.log(`WINSTON: API Key - ${env.WINSTON_API_KEY}`);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WINSTON_API_KEY}`
            },
            body: JSON.stringify({
                text: textToCheck,  // Send the text to Winston AI for analysis
                version: 'latest',  // Use the latest version of the AI model
                sentences: true,    // Request sentence-level scoring
                language: 'en'      // Set the language (optional, default is 'en')
            })
        });

        console.log(`WINSTON: Response status - ${response.status}`);
        console.log(`WINSTON: Response status text - ${response.statusText}`);

        if (!response.ok) {
            console.log('WINSTON: API call failed');
            const errorText = await response.text();
            console.log(`WINSTON: Error response - ${errorText}`);
            throw new Error('Failed to detect AI content');
        }

        const result = await response.json();  // Parse the result
        console.log('WINSTON: API call succeeded, returning result');
        console.log(`WINSTON: Result - ${JSON.stringify(result)}`);
        return result;  // Return the detection result
    } catch (error: any) {
        console.log(`WINSTON: Exception occurred - ${error.message}`);
        throw error;
    }
}