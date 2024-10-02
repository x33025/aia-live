<script lang="ts">
  import Text from '$lib/core/display/+text.svelte';
  import { TextType, type Note } from '$lib/types'; // Adjust the path as needed
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
              const addedNote = await response.json();
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
          newNote.content = '';
      }
  }

  function updateContent(event: Event) {
    newNote.content = (event.target as HTMLDivElement).innerText;
}

</script>

<div class="stack expand" style="--align: flex-start; --gap: 1em; padding: 1em;">
  <Text type={TextType.Title}>Notes</Text>


    <div class="note-input-wrapper">
    
      <div contenteditable="true" class="note-container" placeholder="Add a note..." on:keydown={handleKeydown} on:input={updateContent}>
          {newNote.content}
      </div>
  
    </div>


  <div class="scrollable-stack expand" style="--gap: 0.5em;">
    {#if notes.length > 0}
    {#each notes as note (note.id)}
      <NoteView {note} />
    {/each}
  {:else}
    <p>No notes available.</p>
  {/if}
  </div>

  <div class="spacer" />
  {#if activity}
  <div class="stack" style="height: 320px;">
      <Text type={TextType.Subheadline} style="font-weight: bold;">{($page.data.title).slice(0, -1)} Activity Data</Text>
      <ActivityDataView {activity} />
  </div>
  {/if}
</div>

<style>
  .note-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--gray-1);
    border-radius: 0.5em;
    
  }

  .note-container {
  

    padding: 0.5em;
    width: 100%;
    min-height: 3em;
  
  }

  .add-note-button {
    position: absolute;
    right: 0.5em;
    bottom: 0.5em;
    background-color: var(--blue);
    color: white;
    border: none;
    padding: 0.5em;
    border-radius: 0.5em;
    cursor: pointer;
  }
</style>
