
import { pb } from '$lib/config/pocketbase';
import type { Article, ActivityData } from '$lib/types';


class ArticleService  {

    async createWithActivity(user_id: string): Promise<Article> {
        try {
            console.log(`Starting createWithActivity with user_id: ${user_id}`);
            
            // Create the activity
            const activity = await pb.collection<ActivityData>('activities').create({ created_by: user_id });
            console.log(`Activity created with ID: ${activity.id}`);

            // Add the activity ID to the data
            const newArticle = await pb.collection<Article>('articles').create({ activity: activity.id });
            console.log(`New article created with ID: ${newArticle.id}`);
     
            return newArticle;
        } catch (error) {
            console.error(`Error creating note with activity in notes collection:`, error);
            throw error;
        }
    }
}

export const articleService = new ArticleService();
