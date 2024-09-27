// $lib/services/+note-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Note } from '$lib/types';
import { activityDataService } from '$lib/services/+activity-data-service';

class NoteService extends BaseService<Note> {
    constructor() {
        super('notes');
    }


    async createWithActivity(data: Partial<Note>, user_id: string): Promise<Note> {
        try {
            // Create the activity
            const activity = await activityDataService.create({ created_by: user_id });

            // Add the activity ID to the data
            data.activity = activity.id;

            // Create the new note with the activity ID
            return await this.create(data);
        } catch (error) {
            console.error(`Error creating note with activity in notes collection:`, error);
            throw error;
        }
    }
}

  

export const noteService = new NoteService();
