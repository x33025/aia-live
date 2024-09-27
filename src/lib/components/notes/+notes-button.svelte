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
  {#if notes.length > 0}
    {#if notes[0].expand?.activity?.created_by}
      <Avatar size={1.5} userId={notes[0].expand?.activity?.created_by} />
    {/if}
    {sanitizeHTML(notes[0].content)}
  {:else}
    No notes
  {/if}
</Stack>
</button>
