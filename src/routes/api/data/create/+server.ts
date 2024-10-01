// /route/api/data/create/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { BaseService } from '$lib/services/+base-service'; // Adjust the import path as necessary

export const POST: RequestHandler = async ({ request }) => {
    try {
        console.log('Received request:', request);

        const { collection, data } = await request.json();
        console.log('Parsed request JSON:', { collection, data  });

        if (!collection || !data) {
            console.error('Validation error: Collection name and data are required.');
            return json({ error: 'Collection name and data are required.' }, { status: 400 });
        }

        const service = new BaseService(collection);
        console.log('Initialized BaseService with collection:', collection);

        const newItem = await service.create(data);
        console.log('Created new item:', newItem);

        return json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error creating record:', error);
        return json({ error: 'Error creating record.' }, { status: 500 });
    }
};
