<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  enum Alignment {
    Start = 'flex-start',
    Center = 'center',
    End = 'flex-end',
    Stretch = 'stretch', // Add stretch option
    SpaceBetween = 'space-between', // Add space-between option
    SpaceAround = 'space-around', // Add space-around option
    SpaceEvenly = 'space-evenly', // Add space-evenly option
  }

  enum Direction {
    Row = 'row',
    Column = 'column',
  }

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<Stack alignment={Alignment.End} spacing={0} style="position: relative;">
  <Button class="login-button" on:click={handleLoginClick} style="position: absolute; top: 0; right: 0;">
    Login
  </Button>
  <InteractiveText text="aia" />
</Stack>

<style>
  :global(.login-button) {
    padding: 0.5em;
    border-radius: 0.5em;
    border: 0.1em solid var(--gray-2);
    box-shadow: 0 0 0 0.1em var(--gray-1), 0 0 0 0.1em var(--gray-1);
    font-weight: bold;
    color: var(--blue);
    margin: 0.1em;
    z-index: 100;
  }
</style>
