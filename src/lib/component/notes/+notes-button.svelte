<script lang="ts">
    import { openSidebar } from '$lib/stores/ui/+sidebar';
    import NotesSidebar from '../notes/+notes-sidebar.svelte';
    import type { ActivityData, Notes } from '$lib/types';
  
    export let notes: Notes[] = [];
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

    // Sort notes by created date in descending order
    $: sortedNotes = [...notes].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  </script>
  
  <div on:click={openNotesSidebar} class="clickable-cell">
    {#if sortedNotes.length}
      {sanitizeHTML(sortedNotes[0].content)}
    {:else}
      No notes
    {/if}
  </div>
  
  <style>
    .clickable-cell {
      cursor: pointer;
    }
  </style>
