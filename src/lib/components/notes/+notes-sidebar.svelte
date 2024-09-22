<!-- src/lib/components/+notes-sidebar.svelte -->
<script lang="ts">
    import Text from '$lib/core/display/+text.svelte';
import Spacer from '$lib/core/layout/+spacer.svelte';
import Stack from '$lib/core/layout/+stack.svelte';
import { Alignment, Direction, TextType, type Note } from '$lib/types'; // Adjust the path as needed
    import NoteView from './+note-view.svelte'; // Adjust the path as needed
      import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
    import type { ActivityData } from '$lib/types';

    export let notes: Note[] = [];
    export let activity: ActivityData;

    // Ensure notes is defined before sorting
    if (notes) {
        notes = notes.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    }
</script>
  
  <Stack  spacing={1} style="padding: 1em;">
    <Text type={TextType.Title}>Notes</Text>
    <Stack spacing={1}>
      {#if notes.length > 0}
      {#each notes as note (note.id)}
        <NoteView {note} />
      {/each}
    {:else}
      <p>No notes available.</p>
    {/if}

    </Stack>

        <Stack direction={Direction.Vertical} wrap={true}   style="height: 320px;" spacing={0.75}>
          
            <Text type={TextType.Subheadline} style="font-weight: bold;">Activity Data</Text>

            <ActivityDataView {activity} />
    </Stack>
  </Stack>
