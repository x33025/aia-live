<script lang="ts">  

    import Gallery from '$lib/components/images/display/+gallery.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { selected_image } from '$lib/stores/data/+images';
    import type { Image } from '$lib/types';
    
    export let main_image: Image | null = null;

    $selected_image = main_image;
</script>
    
    
    
    <Stack direction={Direction.Vertical} spacing={2}>
    
       
     <Gallery />
   {"TEST"}
    
    
    </Stack>