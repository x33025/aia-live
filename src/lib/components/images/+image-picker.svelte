<script lang="ts">  

    import Gallery from '$lib/components/images/+gallery.svelte';
    import ImageDescription from '$lib/components/images/+image-description.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { selected_image } from '$lib/stores/data/+images';
    
    
    </script>
    
    
    
    <Stack direction={Direction.Vertical} spacing={2}>
    
       
     <Gallery />
      
    
     <ImageDescription image={$selected_image} />
    
    
    </Stack>