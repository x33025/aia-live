// /src/routes/protected/+page.server.ts
import type { PageServerLoad } from './$types';
import { pb } from '$lib/config/pocketbase'; // Ensure this is your PocketBase client

export const load: PageServerLoad = async () => {
    const now = new Date();

    // Get the start of the current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    // Get the date one month ago
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    // Fetch articles from the past month, sorted by `created` (descending)
    const draftedThisMonth = await pb.collection('articles').getList(1, 100, {
        filter: `created >= "${oneMonthAgo.toISOString()}"`,
        sort: '-created'
    });

    const articlesByWeek = draftedThisMonth.items.reduce((acc: Record<number, any[]>, article) => {
        const createdDate = new Date(article.created);
        const weekNumber = Math.ceil((createdDate.getDate() - 1) / 7); // Determine the week number of the month

        if (!acc[weekNumber]) {
            acc[weekNumber] = [];
        }
        acc[weekNumber].push(article);

        return acc;
    }, {});

    return {
        articlesByWeek
    };
};
