// /route/api/data/update/+server.ts
import { json } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
    try {
        const { collection, id, data, expand, fields } = await request.json();
        
        if (!collection || !id || !data) {
            return json({ error: 'Collection name, ID, and data are required.' }, { status: 400 });
        }

        const updatedItem = await pb.collection(collection).update(id, data, { expand, fields });

        return json(updatedItem, { status: 200 });
    } catch (error) {
        return json({ error: 'Error updating record.' }, { status: 500 });
    }
};
