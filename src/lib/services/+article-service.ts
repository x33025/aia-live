// $lib/services/+article-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Article } from '$lib/types';
import { activityDataService } from '$lib/services/+activity-data-service';


class ArticleService extends BaseService<Article> {
    constructor() {
        super('articles'); // Assuming 'keywords' is the name of your collection
    }

    async createWithActivity(user_id: string): Promise<Article> {
        try {
            console.log(`Starting createWithActivity with user_id: ${user_id}`);
            
            // Create the activity
            const activity = await activityDataService.create({ created_by: user_id });
            console.log(`Activity created with ID: ${activity.id}`);

            // Add the activity ID to the data
            const newArticle = await this.create({ activity: activity.id });
            console.log(`New article created with ID: ${newArticle.id}`);
     
            return newArticle;
        } catch (error) {
            console.error(`Error creating note with activity in notes collection:`, error);
            throw error;
        }
    }
}

export const articleService = new ArticleService();
