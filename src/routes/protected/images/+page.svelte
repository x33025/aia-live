<script lang="ts">  
    import { onDestroy } from 'svelte';
    import Gallery from '$lib/components/images/display/+gallery.svelte';
    import ImageDescription from '$lib/components/images/display/+image-description.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction, type Image } from '$lib/types';
    import { selected_image } from '$lib/stores/data/+images';
    import { page } from '$app/stores';

    let selectedImage: Image | null = null;

    const unsubscribe = selected_image.subscribe(value => {
        selectedImage = value;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<style>
    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
    }
   :global(.container) {
        position: relative;
    }
</style>
    
<Stack direction={Direction.Vertical} spacing={2} class="container">
    <Gallery images={$page.data.images} />
    {#if selectedImage}
        <div class="overlay">
            <ImageDescription image={selectedImage} />
        </div>
    {/if}
</Stack>