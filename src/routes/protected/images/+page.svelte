<script lang="ts">  
import Stack from '$lib/components/layout/+stack.svelte';
import { Direction } from '$lib/types';
import ImageChooser from '$lib/views/images/+image-chooser.svelte';


</script>



<Stack direction={Direction.Vertical} spacing={1}>
 <ImageChooser />
  
</Stack>