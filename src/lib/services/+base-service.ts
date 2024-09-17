// $lib/services/baseService.ts
import { pb } from '$lib/config/pocketbase';
import type { Keyword } from '$lib/types';

export class BaseService {
    constructor(private collectionName: string) {}

    // Get a list of records with sorting, filtering, expand, and fields
    async getList({
        page = 1,
        pageSize = 20,
        sort = '-created',
        filter = '',
        expand = '',
        fields = ''
    } = {}) {
        return await pb.collection(this.collectionName).getList<Keyword>(page, pageSize, {
            sort,
            filter,
            expand,
            fields
        });
    }

    // Get one record by ID with expand and fields options
    async getOne(id: string, { expand = '', fields = '' } = {}) {
        return await pb.collection(this.collectionName).getOne<Keyword>(id, {
            expand,
            fields
        });
    }

    // Create a record with optional expand and fields for the response
    async create(data: any, { expand = '', fields = '' } = {}) {
        return await pb.collection(this.collectionName).create<Keyword>(data, {
            expand,
            fields
        });
    }

    // Update a record by ID with optional expand and fields for the response
    async update(id: string, data: any, { expand = '', fields = '' } = {}) {
        return await pb.collection(this.collectionName).update<Keyword>(id, data, {
            expand,
            fields
        });
    }

    // Delete a record by ID
    async delete(id: string) {
        return await pb.collection(this.collectionName).delete(id);
    }
}
