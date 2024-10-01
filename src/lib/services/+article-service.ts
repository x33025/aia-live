// $lib/services/+article-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Article } from '$lib/types';
import { activityDataService } from '$lib/services/+activity-data-service';


class ArticleService extends BaseService<Article> {
    constructor() {
        super('articles'); // Assuming 'keywords' is the name of your collection
    }

    async createWithActivity(data: Partial<Article>, user_id: string): Promise<Article> {
        try {
            // Create the activity
            const activity = await activityDataService.create({ created_by: user_id });

            // Add the activity ID to the data
            data.activity = activity.id;

            const newArticle = await this.create(data);
     
            return newArticle;
        } catch (error) {
            console.error(`Error creating note with activity in notes collection:`, error);
            throw error;
        }
    }
}

export const articleService = new ArticleService();
