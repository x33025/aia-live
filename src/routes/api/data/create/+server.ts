// /route/api/data/create/+server.ts
import { json } from '@sveltejs/kit';
import { BaseService } from '$lib/services/+base-service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { collectionName, data, expand, fields } = await request.json();
        
        if (!collectionName || !data) {
            return json({ error: 'Collection name and data are required.' }, { status: 400 });
        }

        const service = new BaseService(collectionName);
        const newItem = await service.create(data, { expand, fields });

        return json(newItem, { status: 201 });
    } catch (error) {
        return json({ error: 'Error creating record.' }, { status: 500 });
    }
};
