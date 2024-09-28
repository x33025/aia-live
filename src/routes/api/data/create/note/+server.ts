// /route/api/data/create/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { noteService } from '$lib/services/+note-service'; // Adjust the import path as necessary

export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log('Received request:', request);

        const { data, user_id, parent_id, parent_collection } = await request.json();
        console.log('Parsed request JSON:', { data, user_id, parent_id, parent_collection });

        if (!data || !user_id || !parent_id || !parent_collection) {
            console.error('Validation error: data, user_id and parent_id are required.');
            return json({ error: 'data, user_id and parent_id are required.' }, { status: 400 });
        }

      
          

        const newItem = await noteService.createWithActivity(data, user_id, parent_id, parent_collection);

        console.log('Created new item:', newItem);

        return json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating record:', error);
        return json({ error: 'Error creating record.' }, { status: 500 });
    }
};
