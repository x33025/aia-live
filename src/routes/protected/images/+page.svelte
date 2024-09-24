<script lang="ts">  
    import { onDestroy } from 'svelte';
    import Gallery from '$lib/components/images/+gallery.svelte';
    import ImageDescription from '$lib/components/images/+image-description.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
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
    
    <Stack direction={Direction.Vertical} spacing={2}>
    
       
     <Gallery />
      
      {#if selectedImage}
        <ImageDescription image={selectedImage} />
      {/if}
 
    
    
    </Stack>