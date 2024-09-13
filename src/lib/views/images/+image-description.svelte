<script lang="ts">
    import Button from '$lib/components/actions/+button.svelte';
    import Image from '$lib/components/display/+image.svelte';
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
import { Direction, type Image as ImageType } from '$lib/types';

    export let image: ImageType;

    function constructImageUrl(image: ImageType): string {
      return `http://localhost:8090/api/files/images/${image.id}/${image.file}`;
    }
</script>

<Stack direction={Direction.Vertical}>
    <Stack direction={Direction.Horizontal} wrap={true}>
        <Spacer />
        <Image image_url={constructImageUrl(image)} alt_text={image.description || 'No description provided'} style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);" />
        <Spacer />
    </Stack>
    <Stack direction={Direction.Vertical}>
        <p>Description: {image.description || 'No description provided'}</p>
        <p>Activity ID: {image.activity}</p>
        <p>Notes: {image.notes.join(', ')}</p>
    </Stack>

</Stack>

<style>


</style>