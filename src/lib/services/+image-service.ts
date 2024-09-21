// $lib/services/+image-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Image } from '$lib/types';

class ImageService extends BaseService<Image> {
    constructor() {
        super('images');
    }

    
}

export const imageService = new ImageService();
