<script lang="ts">
    import TextInput from '$lib/core/actions/+text-input.svelte';
    import ImageComponent from '$lib/core/display/+image.svelte';
    import Label from '$lib/core/display/+label.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Alignment, Direction, type Image as ImageType } from '$lib/types';
    import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
    import NotesButton from '../notes/+notes-button.svelte';
  
    export let image: ImageType | null = null;
  
    $: image_url = image 
      ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`
      : '';
  </script>
  

  <Stack direction={Direction.Horizontal} spacing={1.5} style="border-top: 1px solid var(--gray-2); padding-top: 1em;">
    <Stack direction={Direction.Vertical} wrap={true} spacing={1}>  

      <ImageComponent
      image_url={image_url}
      size={20}
      alt_text={image?.description || 'No description provided'}
      aspect_ratio={3 / 2}
    />

      <Label name="Activity">

        
        {#if image?.expand?.activity}
          <ActivityDataView activity={image.expand.activity} />
        {/if}
        <Spacer />
      </Label>
    </Stack>

  
    <Stack direction={Direction.Vertical}>
      <Label name="Description">
        
        <TextInput
          style="background-color: var(--gray-1); padding: 0.5em; border-radius: 0.5em;"
          label="Description"
          value={image?.description || ''}
          placeholder="Add a description"
        />
      </Label>
      <Spacer />
      <Label name="Notes">
        <NotesButton />
      </Label>
      <Spacer />

    </Stack>
  </Stack>
  