<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';

  interface Form {
    email?: string;
    password?: string;
    error?: string;
  }

  let email = '';
  let password = '';
  export let form: Form = {};

  // If there's an error in the form, bind it to the local error variable
  $: error = form.error;
</script>

<style>
  input {
    width: 100%;
    padding: 0.7em;
    border-radius: 0.5em;
    border: none;
    font-size: 1em;
    border: 1px solid var(--gray-1);
  }
  input:focus {
    outline: none;
  }
  .error {
    margin-top: 1em;
    color: var(--red);
    text-align: center;
  }
  h2 {
    color: rgb(10, 10, 10);
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<Stack>
  <h2>Login</h2>
  <form method="POST" action="?/login">
    <Stack>
      <input type="email" id="email" name="email" bind:value={email} placeholder="Email" required />
      <input type="password" id="password" name="password" bind:value={password} placeholder="Password" required />
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <Button buttonType="submit">
        Login
      </Button>
    </Stack>
  </form>
</Stack>
