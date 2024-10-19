// /route/api/data/create/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { keywordService } from '$lib/services/keyword-service'; 

export const POST: RequestHandler = async ({ request }) => {
    try {

        const { user_id, data } = await request.json();
        console.log('Parsed request JSON:', { data });

        if (!user_id || !data) {
            console.error('Validation error: user_id and data are required.');
            return json({ error: 'user_id and data are required.' }, { status: 400 });
        }

      
          

        const newItem = await keywordService.createWithActivity(user_id, data);

        console.log('Created new item:', newItem);

        return json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating record:', error);
        return json({ error: 'Error creating record.' }, { status: 500 });
    }
};
