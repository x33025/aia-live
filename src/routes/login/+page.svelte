<script lang="ts">
  import VStack from '$lib/components/layout/+v-stack.svelte';
  import HStack from '$lib/components/layout/+h-stack.svelte';
  import ZStack from '$lib/components/layout/+z-stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { HorizontalAlignment, TextType, VerticalAlignment } from '$lib/types';

  interface Form {
    email?: string;
    password?: string;
    error?: string;
  }

  let email = '';
  let password = '';
  let error = '';
  export let form: Form = {};
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

<HStack alignment={HorizontalAlignment.Center}>
  <VStack spacing={1} alignment={VerticalAlignment.Top}>
    <h2>Login</h2>
    <form method="POST" action="?/login">
      <VStack spacing={1}>
        <input type="email" id="email" name="email" bind:value={email} placeholder="Email" required />
        <input type="password" id="password" name="password" bind:value={password} placeholder="Password" required />
        {#if form?.error}
          <p class="error">{form.error}</p>
        {/if}
        <Button type={TextType.Body} buttonType="submit">
          Login
        </Button>
      </VStack>
    </form>
  </VStack>

</HStack>
