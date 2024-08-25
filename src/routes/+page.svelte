<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment } from '$lib/types';
    import Layout from '$lib/components/layout/+layout.svelte';



  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<Layout>

<Stack alignment={Alignment.End} spacing={0} style="position: relative;  padding: 1em;">
  <Button class="login-button" on:click={handleLoginClick} style="position: absolute; top: 0; right: 0;">
    Login
  </Button>
  <InteractiveText text="aia" />
</Stack>

</Layout>

<style>
  :global(.login-button) {
    padding: 0.5em;
    border-radius: 0.5em;
    border: 1px solid var(--gray-1);
    font-weight: bold;
    color: var(--blue);
    margin: 0.1em;
    z-index: 100;
  }
</style>
