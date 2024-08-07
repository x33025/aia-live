<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment, Direction } from '$lib/types';

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<Stack direction={Direction.Column} alignment={Alignment.Start} spacing={0}>
  <InteractiveText text="aia" />
  <Stack direction={Direction.Row} alignment={Alignment.End} spacing={0}>
    <Button className="login-button" on:click={handleLoginClick}>
           Login
    </Button>
  </Stack>
</Stack>

<style>
  :global(.login-button) {
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: var(--blue);
    font-weight: bold;
  }
</style>
