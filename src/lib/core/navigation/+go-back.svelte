<script lang="ts">
    import { goto } from '$app/navigation';
    import ChevronLeft from '$lib/core/ui/icons/+chevron-left.svelte';

    
    export let path: string = '/dashboard';

    const goBack = () => {
     goto(path)
    }
  </script>
  

<button on:click={goBack}><ChevronLeft size={1.25} /></button>

