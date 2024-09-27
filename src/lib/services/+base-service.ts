// $lib/services/baseService.ts
import { pb } from '$lib/config/pocketbase';
import type { BaseModel } from '$lib/types';

//NEVER IMPORT DERIVED SERVICES HERE. ONLY BASE SERVICES.

/**
 * BaseService for handling CRUD operations on PocketBase collections.
 * @template T - The type of the model that this service operates on.
 */
export class BaseService<T extends BaseModel> {
    constructor(private collectionName: string) {}

    /**
     * Get a list of records with optional sorting, filtering, expanding, and field selection.
     * @param params - Options for pagination, sorting, filtering, expanding, and fields.
     * @returns A promise that resolves to a list of records.
     */
    async getList({
        page = 1,
        pageSize = 20,
        sort = '-created',
        filter = '',
        expand = '',
        fields = ''
    } = {}): Promise<T[]> {
        try {
            const result = await pb.collection(this.collectionName).getList<T>(page, pageSize, {
                sort,
                filter,
                expand,
                fields
            });
            return result.items; // Assuming PocketBase returns items in a structure like {items: []}
        } catch (error) {
            console.error(`Error fetching list from ${this.collectionName}:`, error);
            throw error;
        }
    }

    /**
     * Get a single record by ID with optional expand and field selection.
     * @param id - The ID of the record.
     * @param options - Options for expanding relationships and selecting fields.
     * @returns A promise that resolves to the record.
     */
    async getOne(id: string, { expand = '', fields = '' } = {}): Promise<T> {
        try {
            return await pb.collection(this.collectionName).getOne<T>(id, {
                expand,
                fields
            });
        } catch (error) {
            console.error(`Error fetching record from ${this.collectionName} with ID: ${id}`, error);
            throw error;
        }
    }

    /**
     * Create a new record in the collection.
     * @param data - The data for the new record.
     * @param options - Options for expanding relationships and selecting fields in the response.
     * @returns A promise that resolves to the newly created record.
     */
    async create(data: Partial<T>, { expand = '', fields = '' } = {}): Promise<T> {
        try {
            return await pb.collection(this.collectionName).create<T>(data, {
                expand,
                fields
            });
        } catch (error) {
            console.error(`Error creating record in ${this.collectionName}:`, error);
            throw error;
        }
    }

    /**
     * Update an existing record by ID.
     * @param id - The ID of the record to update.
     * @param data - The updated data for the record.
     * @param options - Options for expanding relationships and selecting fields in the response.
     * @returns A promise that resolves to the updated record.
     */
    async update(id: string, data: Partial<T>, { expand = '', fields = '' } = {}): Promise<T> {
        try {
            return await pb.collection(this.collectionName).update<T>(id, data, {
                expand,
                fields
            });
        } catch (error) {
            console.error(`Error updating record in ${this.collectionName} with ID: ${id}`, error);
            throw error;
        }
    }

    /**
     * Delete a record by ID.
     * @param id - The ID of the record to delete.
     * @returns A promise that resolves when the record is deleted.
     */
    async delete(id: string): Promise<void> {
        try {
            await pb.collection(this.collectionName).delete(id);
        } catch (error) {
            console.error(`Error deleting record from ${this.collectionName} with ID: ${id}`, error);
            throw error;
        }
    }
}
