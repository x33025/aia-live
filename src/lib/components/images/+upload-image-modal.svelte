<script lang="ts">
    import Stack from '$lib/core/layout/+stack.svelte';
    import { modalContent } from '$lib/stores/ui/+modal';
    import { onMount } from 'svelte';

    export let file: File;

    onMount(() => {
      console.log('file', file);
    });


</script>
  
  <Stack spacing={1}>
   {"To be implemented"}
     
  </Stack>
  