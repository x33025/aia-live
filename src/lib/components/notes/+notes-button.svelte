<script lang="ts">
    import { openSidebar } from '$lib/stores/ui/+sidebar';
    import NotesSidebar from './+notes-sidebar.svelte';
    import type { ActivityData, Note } from '$lib/types';
  
    export let notes: Note[] = [];
    export let activity: ActivityData | null = null;
  
    function openNotesSidebar() {
      openSidebar(NotesSidebar, { notes, activity });
    }

    // Function to sanitize HTML and extract text content
    function sanitizeHTML(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || '';
    }

    // Removed notes sorting
</script>
  
<button on:click={openNotesSidebar}>
  {#if notes && notes.length > 0}
    {sanitizeHTML(notes[0].content)}
  {:else}
    No notes
  {/if}
</button>
  

