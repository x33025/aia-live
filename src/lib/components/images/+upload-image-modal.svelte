<script lang="ts">
    import Cropper from '$lib/components/images/+cropper.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { modalContent } from '$lib/stores/ui/+modal';
    import { onMount } from 'svelte';

    export let file: File;

    onMount(() => {
      console.log('file', file);
    });


</script>
  
  <Stack spacing={1}>
   
    <!-- <Cropper file={file} /> -->
  </Stack>
  