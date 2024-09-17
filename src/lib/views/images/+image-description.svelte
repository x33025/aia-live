<script lang="ts">
    import Button from '$lib/components/actions/+button.svelte';
    import TextInput from '$lib/components/actions/+text-input.svelte';
    import Image from '$lib/components/display/+image.svelte';
    import Label from '$lib/components/display/+label.svelte';
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Alignment, Direction, type Image as ImageType } from '$lib/types';
    import ActivityDataView from '$lib/views/activity/+activity-data.svelte';
    import { createEventDispatcher } from 'svelte';

    export let image: ImageType;
    const dispatch = createEventDispatcher();

    function constructImageUrl(image: ImageType): string {
      return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
    }
</script>

<Stack direction={Direction.Horizontal} spacing={1.5}>
 
    <Image image_url={constructImageUrl(image)} size={20} alt_text={image.description || 'No description provided'} style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);" aspect_ratio={3 / 2} />

    <Stack direction={Direction.Vertical}>
        <Label name="Description">
            <TextInput style="background-color: var(--gray-1); padding: 0.5em;" label="Description" value={image.description || 'No description provided'} />
        </Label>
        <Spacer />
        {#if image.expand?.activity}
            <ActivityDataView activity={image.expand.activity} />
        {/if}
        <Spacer />
     
    </Stack>
</Stack>
