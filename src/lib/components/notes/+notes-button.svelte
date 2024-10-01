<script lang="ts">
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from './+notes-sidebar.svelte';
  import type { ActivityData, Note } from '$lib/types';
  import NoteChip from './+note-chip.svelte';
  import { TextType } from '$lib/types';
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
</script>

<style>



  .add-note {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-1);
    padding: var(--default-padding);
    border-radius: 10em;
    gap: 0.35em;
  }
</style>

<button class="stack" style="--direction: row; --gap: 0.5em; overflow: hidden; flex-wrap: nowrap;" on:click={openNotesSidebar}>
  {#if notes && notes.length > 0}
   
      {#each notes as note (note.id)}
        <NoteChip {note} />
      {/each}

  {:else}
    <div class="add-note">
      <PlusIcon size={0.7} color="var(--blue)" strokeWidth={0.3} />
      <Text type={TextType.Caption} style="color: var(--blue); font-weight: bold;">Add a note</Text>
    </div>
  {/if}
</button>
