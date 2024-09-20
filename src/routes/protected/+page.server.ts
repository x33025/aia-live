// /src/routes/protected/+page.server.ts
import type { PageServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase'; // Ensure this is your PocketBase client
import type { Article } from '$lib/types';
import { getStartAndEndOfMonth } from '$lib/utils/misc/+date';


export const load: PageServerLoad = async () => {

    const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

    // Fetch articles created within the current month, expand the `activity` relation (activity_data)
    const draftedThisMonth = await pb.collection('articles').getList<Article>(1, 100, {
        filter: `created >= "${startOfMonth.toISOString()}" && created <= "${endOfMonth.toISOString()}"`,
        sort: '-created',
        expand: 'activity' // Expands the activity_data relation within articles
    });

    return {
        draftedThisMonth
    };
};
