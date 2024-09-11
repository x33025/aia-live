<!-- src/lib/components/+notes-sidebar.svelte -->
<script lang="ts">
    import Text from '$lib/components/display/+text.svelte';
import Spacer from '$lib/components/layout/+spacer.svelte';
import Stack from '$lib/components/layout/+stack.svelte';
import { Alignment, Direction, TextType, type Notes } from '$lib/types'; // Adjust the path as needed
    import Note from './+note.svelte'; // Adjust the path as needed
  
    export let notes: Notes[] = [];
  </script>
  
  <Stack  spacing={1} style="padding: 1em;">
    <Text type={TextType.Title}>Notes</Text>
    <Stack>
      {#if notes.length > 0}
      {#each notes as note (note.id)}
        <Note {note} />
      {/each}
    {:else}
      <p>No notes available.</p>
    {/if}

    </Stack>

        <Stack direction={Direction.Vertical}  alignment={Alignment.End}  style="height: 320px;">
          
            {"Activity Data"}


    </Stack>
  </Stack>
