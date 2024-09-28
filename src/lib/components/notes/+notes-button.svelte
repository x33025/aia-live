<script lang="ts">
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from './+notes-sidebar.svelte';
  import type { ActivityData, Note } from '$lib/types';
  import Stack from '$lib/core/layout/+stack.svelte';
  import Avatar from '$lib/components/user/+avatar.svelte';
  import { Direction, TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import PlusIcon from '$lib/core/ui/icons/+plus.svelte';
  export let notes: Note[] = [];
  export let activity: ActivityData | null = null;

  function openNotesSidebar() {
    openSidebar(NotesSidebar, { notes, activity });
  }

  // Function to sanitize HTML and extract text content
  function sanitizeHTML(html: string): string {
      if (typeof document !== 'undefined') {
          const div = document.createElement('div');
          div.innerHTML = html;
          return div.textContent || '';
      }
      return '';
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
  <Stack direction={Direction.Horizontal} style="background-color: var(--gray-1); padding: var(--default-padding); border-radius: 10em; " spacing={0.3} wrap={true}>
  <PlusIcon size={0.7} color="var(--blue) " strokeWidth={0.3} />
  <Text type={TextType.Caption} style="color: var(--blue); font-weight: bold;">Add a note</Text>
</Stack>
  {/if}
</Stack>
</button>
