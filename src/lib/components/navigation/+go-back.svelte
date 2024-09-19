<script lang="ts">
    import { goto } from '$app/navigation';
    import ChevronLeft from '$lib/core/ui/icons/+chevron-left.svelte';
    // Function to handle the go back action
    const goBack = () => {
      goto('/protected');
    }
  </script>
  

<button on:click={goBack}><ChevronLeft /></button>

<style>
    button {
      padding-left: 0.5em;
    }
</style>