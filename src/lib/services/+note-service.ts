// $lib/services/+note-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Note } from '$lib/types';

class NoteService extends BaseService<Note> {
    constructor() {
        super('notes');
    }

  
}

export const noteService = new NoteService();
