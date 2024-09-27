<script lang="ts">
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from './+notes-sidebar.svelte';
  import type { ActivityData, Note } from '$lib/types';
  import Stack from '$lib/core/layout/+stack.svelte';
  import Avatar from '$lib/components/user/+avatar.svelte';
  import { Direction } from '$lib/types';

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
</script>

<button on:click={openNotesSidebar}>
<Stack direction={Direction.Horizontal} spacing={0.5} wrap={true}> 
  {#if notes && notes.length > 0}

    {#each notes as note (note.id)}
      {#if note.expand?.activity?.created_by}
        <Avatar size={1.5} userId={note.expand?.activity?.created_by} />
      {/if}
      {sanitizeHTML(note.content)}
      {#if notes.length > 1}
        <div style="border-left: 1px solid #e0e0e0; height: 100%;"></div>
      {/if}
    {/each}
  {:else}
    No notes
  {/if}
</Stack>
</button>
