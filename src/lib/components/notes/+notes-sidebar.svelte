<script lang="ts">
  import Text from '$lib/core/display/+text.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Alignment, Direction, TextType, type Note } from '$lib/types'; // Adjust the path as needed
  import NoteView from './+note-view.svelte'; // Adjust the path as needed
  import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
  import type { ActivityData } from '$lib/types';
  import { current_user } from '$lib/stores/data/+users';


  export let notes: Note[] = [];
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
                  user_id: $current_user.id
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

<Stack spacing={1} style="padding: 1em;">
  <Text type={TextType.Title}>Notes</Text>
  <div contenteditable="true" on:keydown={handleKeydown} on:input={updateContent}>
      {newNote.content}
  </div>
  <button on:click={addNote}>Add Note</button>

  <Stack spacing={1}>
    {#if notes.length > 0}
    {#each notes as note (note.id)}
      <NoteView {note} />
    {/each}
  {:else}
    <p>No notes available.</p>
  {/if}
  </Stack>

  <Stack direction={Direction.Vertical} wrap={true} style="height: 320px;" spacing={0.75}>
      <Text type={TextType.Subheadline} style="font-weight: bold;">Activity Data</Text>
      <ActivityDataView {activity} />
  </Stack>
</Stack>
