<script lang="ts">
    import { goto } from '$app/navigation';
    import ChevronLeft from '$lib/core/ui/icons/+chevron-left.svelte';
    // Function to handle the go back action
    const goBack = () => {
      history.back();
    }
  </script>
  

<button on:click={goBack}><ChevronLeft size={1.25} /></button>

<style>
    button {
      padding-left: 0.5em;
    }
</style>