<script lang="ts">
  import { page } from '$app/stores';

  import { onMount } from 'svelte';
  import { images } from '$lib/stores/data/+images';

  onMount(() => {
    
    images.set($page.data.images);


  });



</script>


  <slot />

