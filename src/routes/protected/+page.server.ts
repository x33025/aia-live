// /src/routes/protected/+page.server.ts
import type { PageServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase'; // Ensure this is your PocketBase client

export const load: PageServerLoad = async () => {
    const now = new Date();

    // Get the start of the current month (e.g., September)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Get the end of the current month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    // Fetch articles created within the current month, expand the `activity` relation (activity_data)
    const draftedThisMonth = await pb.collection('articles').getList(1, 100, {
        filter: `created >= "${startOfMonth.toISOString()}" && created <= "${endOfMonth.toISOString()}"`,
        sort: '-created',
        expand: 'activity' // Expands the activity_data relation within articles
    });

    return {
        articles: draftedThisMonth
    };
};
