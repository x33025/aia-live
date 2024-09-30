<script lang="ts">
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from './+notes-sidebar.svelte';
  import type { ActivityData, Note } from '$lib/types';

  import Avatar from '$lib/components/user/+avatar.svelte';
  import { Direction, TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import PlusIcon from '$lib/core/ui/icons/+plus.svelte';
  import type { BaseModel } from '$lib/types';

  export let notes: Note[] = [];
  export let parent: BaseModel;
  export let parent_collection: 'articles' | 'keywords' | 'images';
  export let activity: ActivityData | null = null;

  function openNotesSidebar() {
    openSidebar(NotesSidebar, { notes, activity, parent, parent_collection });
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

<button  on:click={openNotesSidebar}>
 
    {#if notes && notes.length > 0}
      {#each notes as note (note.id)}
      <div class="stack" style="--direction: row; --align: center; ">
        {#if note.expand?.activity?.created_by}
          <Avatar size={1.5} userId={note.expand?.activity?.created_by} />
        {/if}
        {sanitizeHTML(note.content)}
        {#if notes.length > 1}
          <div style="border-left: 1px solid var(--gray-2); height: 100%;"></div>
        {/if}
      </div>
      {/each}
    {:else}
      <div class="stack" style="--direction: row; --justify: center; --align: center; background-color: var(--gray-1); padding: var(--default-padding); border-radius: 10em; --gap: 0.35em">
        <PlusIcon size={0.7} color="var(--blue)" strokeWidth={0.3} />
        <Text type={TextType.Caption} style="color: var(--blue); font-weight: bold;">Add a note</Text>
      </div>
    {/if}

</button>
