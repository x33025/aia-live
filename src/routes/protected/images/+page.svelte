<script lang="ts">  
    import { onDestroy } from 'svelte';
    import Gallery from '$lib/components/images/display/+gallery.svelte';
    import ImageDescription from '$lib/components/images/display/+image-description.svelte';

    import { Direction, type Image } from '$lib/types';
    import { selected_image } from '$lib/stores/data/+images';


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
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(1em);
    }

   :global(.container) {
        position: relative;
    }
</style>
    
<div class="container" style="padding: 0em 2em 0em 2em;">
    <Gallery />
    {#if selectedImage}
        <div class="overlay">
            <ImageDescription image={selectedImage} />
        </div>
    {/if}
</div>