// $lib/services/+category-service.ts
import { BaseService } from '$lib/services/+base-service';

class CategoryService extends BaseService {
    constructor() {
        super('categories'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const categoryService = new CategoryService();
