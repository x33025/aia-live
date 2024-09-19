// $lib/services/+article-service.ts
import { BaseService } from '$lib/services/+base-service';

class ArticleService extends BaseService {
    constructor() {
        super('articles'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const articleService = new ArticleService();
