import { BaseService } from '$lib/services/+base-service';
import type { Note } from '$lib/types';
import { activityDataService } from '$lib/services/+activity-data-service';
import { pb } from '$lib/config/pocketbase';  // Assuming you have a PocketBase client instance as 'pb'

class NoteService extends BaseService<Note> {
    constructor() {
        super('notes');
    }

    async createWithActivity(data: Partial<Note>, user_id: string, parent_id: string, parent_collection: 'articles' | 'keywords' | 'images'): Promise<Note> {
        try {
            // Create the activity
            const activity = await activityDataService.create({ created_by: user_id });

            // Add the activity ID to the data
            data.activity = activity.id;

            // Create the new note with the activity ID
            const newNote = await this.create(data);

            // Update the parent collection with the new note ID
            await this.appendNoteToParent(parent_id, newNote.id, parent_collection);

            return newNote;
        } catch (error) {
            console.error(`Error creating note with activity in notes collection:`, error);
            throw error;
        }
    }

    // Function to update the parent collection (articles, keywords, or images)
    private async appendNoteToParent(parent_id: string, note_id: string, parent_collection: 'articles' | 'keywords' | 'images'): Promise<void> {
        try {
            const parentRecord = await pb.collection(parent_collection).getOne(parent_id);

            // Assuming the parent collections (articles, keywords, images) have a field called 'notes' that stores an array of note IDs
            const updatedNotes = [...(parentRecord.notes || []), note_id];

            // Update the parent record with the new list of notes
            await pb.collection(parent_collection).update(parent_id, { notes: updatedNotes });
        } catch (error) {
            console.error(`Error updating parent collection (${parent_collection}) with new note ID:`, error);
            throw error;
        }
    }
}

export const noteService = new NoteService();
