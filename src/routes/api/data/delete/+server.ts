// /route/api/data/delete/+server.ts
import { json } from '@sveltejs/kit';
import { BaseService } from '$lib/services/+base-service';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request }) => {
    try {
        const { collection, id } = await request.json();
        
        console.log('[DELETE] Received request to delete record:', { collection, id });

        if (!collection || !id) {
            console.error('[DELETE] Collection name or ID is missing in the request');
            return json({ error: 'Collection name and ID are required.' }, { status: 400 });
        }

        const service = new BaseService(collection);
        await service.delete(id);

        console.log('[DELETE] Record deleted successfully:', { collection, id });
        return json({ message: 'Record deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('[DELETE] Error deleting record:', error);
        return json({ error: 'Error deleting record.' }, { status: 500 });
    }
};
