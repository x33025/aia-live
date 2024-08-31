<!-- src/lib/components/+notes-sidebar.svelte -->
<script lang="ts">
    import Stack from '$lib/components/layout/+stack.svelte';
import { Alignment, Direction, type Notes } from '$lib/types'; // Adjust the path as needed
    import Note from './+note.svelte'; // Adjust the path as needed
  
    export let notes: Notes[] = [];
  </script>
  
  <Stack  spacing={1} style="padding: 1em;">
    {#if notes.length > 0}
      {#each notes as note (note.id)}
        <Note {note} />
      {/each}
    {:else}
      <p>No notes available.</p>
    {/if}

        <Stack direction={Direction.Vertical}  alignment={Alignment.End}  style="max-height: 300px;">
          
            {"Activity Data"}


    </Stack>
  </Stack>
