<script lang="ts">
    import TextInput from '$lib/core/actions/+text-input.svelte';
    import ImageComponent from '$lib/core/display/+image.svelte';
    import Label from '$lib/core/display/+label.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Alignment, Direction, type Image as ImageType } from '$lib/types';
    import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
  
    export let image: ImageType | null = null;
  
    $: image_url = image 
      ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`
      : '';
  </script>
  
  <Stack direction={Direction.Horizontal} spacing={1.5}>
    <ImageComponent
      image_url={image_url}
      size={20}
      alt_text={image?.description || 'No description provided'}
      aspect_ratio={3 / 2}
    />
  
    <Stack direction={Direction.Vertical}>
      <Label name="Description">
        <TextInput
          style="background-color: var(--gray-1); padding: 0.5em; border-radius: 0.5em;"
          label="Description"
          value={image?.description || 'No description provided'}
        />
      </Label>
      <Spacer />
      <Label name="Activity">
        {#if image?.expand?.activity}
          <ActivityDataView activity={image.expand.activity} />
        {/if}
        <Spacer />
      </Label>
    </Stack>
  </Stack>
  