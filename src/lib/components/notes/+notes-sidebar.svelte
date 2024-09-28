<script lang="ts">
  import Text from '$lib/core/display/+text.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Alignment, Direction, TextType, type Note } from '$lib/types'; // Adjust the path as needed
  import NoteView from './+note-view.svelte'; // Adjust the path as needed
  import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
  import type { ActivityData, BaseModel } from '$lib/types';
  import { current_user } from '$lib/stores/data/+users';
  import { page } from '$app/stores';

  export let notes: Note[] = [];
  export let parent: BaseModel;
  export let parent_collection: 'articles' | 'keywords' | 'images';
  export let activity: ActivityData;

  let newNote: Partial<Note> = {
      content: ''
  };

  async function addNote() {
      console.log('Adding note:', newNote);

      try {
          const response = await fetch('/api/data/create/note', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data: newNote,
                  user_id: $current_user.id,
                  parent_id: parent.id,
                  parent_collection: parent_collection
              })
          });

          if (response.ok) {
              const addedNote = await response.json(); // Renamed to avoid shadowing
              notes = [...notes, addedNote];
              newNote.content = ''; // Clear after adding
          } else {
              console.error('Failed to add note', await response.text());
          }
      }
      catch (error) {
          console.error('Error adding note:', error);
      }
  }

  function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          addNote();
      }
  }

  function updateContent(event: Event) {
    newNote.content = (event.target as HTMLDivElement).innerText;
}

</script>

<Stack spacing={1} style="margin: 1em;">
  <Text type={TextType.Title}>Notes</Text>

  <Text type={TextType.Subheadline}>
    <div contenteditable="true" class="note-container" on:keydown={handleKeydown} on:input={updateContent}>
        {newNote.content}
 
  </div>
</Text>
  <button class="add-note-button" on:click={addNote}>Add Note</button>

  <Stack spacing={1}>
    {#if notes.length > 0}
    {#each notes as note (note.id)}
      <NoteView {note} />
    {/each}
  {:else}
    <p>No notes available.</p>
  {/if}
  </Stack>

  {#if activity}
  <Stack direction={Direction.Vertical} wrap={true} style="height: 320px;" spacing={0.75}>
      <Text type={TextType.Subheadline} style="font-weight: bold;">{($page.data.title).slice(0, -1)} Activity Data</Text>
      <ActivityDataView {activity} />
  </Stack>
  {/if}
</Stack>

<style>
  .note-container {
  background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.5em;

  }

  .add-note-button {
    background-color: var(--blue);
    color: white;
    border: none;
    padding: var(--default-padding);
    border-radius: 0.5em;
    cursor: pointer;
  }
</style>