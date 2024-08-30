<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
    import BaseLayout from '$lib/components/layout/+base-layout.svelte';

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>


<BaseLayout >
  <Stack style="position: relative; padding: 1em;">
    <Button on:click={handleLoginClick} class="main-login-button">
      Login
    </Button>
    <InteractiveText text="aia"/>
  </Stack>
</BaseLayout >


<style>
  :global(.main-login-button) {
    padding: 0.5em;
    border-radius: 0.5em;
    border: 1px solid var(--gray-2);
    font-weight: bold;
    color: var(--blue);
    z-index: 100;
    position: absolute;
    top: 0; 
    right: 0;
  }
</style>
