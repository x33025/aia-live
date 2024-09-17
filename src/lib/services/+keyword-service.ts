// $lib/services/keywordService.ts
import { pb } from '$lib/config/pocketbase';
import type { Keyword } from '$lib/types';

export class KeywordService {
    // Fetch a list of keywords with optional sorting and pagination
    async getKeywords(page = 1, pageSize = 20, sort = '-created') {
        try {
            return await pb.collection('keywords').getList<Keyword>(page, pageSize, { sort });
       
        } catch (error) {
            console.error('Error fetching keywords:', error);
            throw new Error('Failed to fetch keywords');
        }
    }

    // Fetch a single keyword by ID
    async getKeywordById(id: string) {
        try {
            return await pb.collection('keywords').getOne<Keyword>(id);
        } catch (error) {
            console.error(`Error fetching keyword with ID ${id}:`, error);
            throw new Error('Failed to fetch keyword');
        }
    }

    // Create a new keyword
    async createKeyword(data: Partial<Keyword>) {
        try {
            return await pb.collection('keywords').create<Keyword>(data);
        } catch (error) {
            console.error('Error creating keyword:', error);
            throw new Error('Failed to create keyword');
        }
    }

    // Update an existing keyword by ID
    async updateKeyword(id: string, data: Partial<Keyword>) {
        try {
            return await pb.collection('keywords').update<Keyword>(id, data);
        } catch (error) {
            console.error(`Error updating keyword with ID ${id}:`, error);
            throw new Error('Failed to update keyword');
        }
    }

    // Delete a keyword by ID
    async deleteKeyword(id: string) {
        try {
            return await pb.collection('keywords').delete(id);
        } catch (error) {
            console.error(`Error deleting keyword with ID ${id}:`, error);
            throw new Error('Failed to delete keyword');
        }
    }
}

// Export the KeywordService instance for reuse
export const keywordService = new KeywordService();
