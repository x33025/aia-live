<script lang="ts">
    import Button from '$lib/components/actions/+button.svelte';
    import TextInput from '$lib/components/actions/+text-input.svelte';
    import Image from '$lib/components/display/+image.svelte';
    import Label from '$lib/components/display/+label.svelte';
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
import { Direction, type Image as ImageType } from '$lib/types';
import ActivityDataView from '$lib/views/activity/+activity-data.svelte';

    export let image: ImageType;

    function constructImageUrl(image: ImageType): string {
      return `http://localhost:8090/api/files/images/${image.id}/${image.file}`;
    }
</script>

<Stack direction={Direction.Vertical} spacing={1.5}>
    <Stack direction={Direction.Horizontal} wrap={true}>
        <Spacer />
        <Image image_url={constructImageUrl(image)} alt_text={image.description || 'No description provided'} style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);" />
        <Spacer />
    </Stack>
    <Stack direction={Direction.Vertical} >
        <Label name="Description" >
        <TextInput label="Description" value={image.description || 'No description provided'} />
        </Label>
        <Spacer />
        <!-- <ActivityDataView activity={image.expand?.activity} /> -->
    </Stack>

</Stack>

<style>


</style>