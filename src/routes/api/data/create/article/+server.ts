// /route/api/data/create/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { articleService } from '$lib/services/article-service'; 

export const POST: RequestHandler = async ({ request }) => {
    try {

        const { user_id } = await request.json();
        console.log('Parsed request JSON:', { user_id, });

        if (!user_id) {
            console.error('Validation error: user_id are required.');
            return json({ error: 'user_id are required.' }, { status: 400 });
        }

      
          

        const newItem = await articleService.createWithActivity(user_id);

        console.log('Created new item:', newItem);

        return json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating record:', error);
        return json({ error: 'Error creating record.' }, { status: 500 });
    }
};
