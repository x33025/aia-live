// $lib/services/+category-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Category } from '$lib/types';

class CategoryService extends BaseService<Category> {
    constructor() {
        super('categories'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const categoryService = new CategoryService();
