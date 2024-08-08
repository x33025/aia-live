<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import AlignedItem from '$lib/components/layout/+aligned-item.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment, Direction } from '$lib/types';

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<Stack alignment={Alignment.End} spacing={0}>
  <!-- Z-Index higher for the login button -->
 
    <Button class="login-button" on:click={handleLoginClick}>
      Login
    </Button>

  
  <!-- Z-Index lower for the interactive text -->
  <AlignedItem alignment={{ horizontal: Alignment.Center, vertical: Alignment.Center }} zIndex={0}>
    <InteractiveText text="aia" />
  </AlignedItem>
</Stack>

<style>
  :global(.login-button) {
    padding: 0.5em;
    border-radius: 0.5em;
    border: 0.1em solid var(--gray-2);
    box-shadow: 0 0 0 0.1em var(--gray-1),
    0 0 0 0.1em var(--gray-1);
    font-weight: bold;
    color: var(--blue);
    margin: 0.1em;
  }

</style>
