<script lang="ts">
  import { enhance } from '$app/forms';
  import BaseLayout from '$lib/components/layout/+base-layout.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment, ButtonType, Direction, TextType } from '$lib/types';

    import Text from '$lib/components/display/+text.svelte';


  
  interface FormData {
      email: string;
      password: string;
      error: string | null;
  }

  export let form: FormData | null = null;
</script>

<BaseLayout >
<Stack direction={Direction.Horizontal} alignment={Alignment.Center}   >
  <Stack direction={Direction.Vertical} alignment={Alignment.Center}  spacing={1} style="max-width: 300px" >
  <Text type={TextType.Title} >Login</Text>
<form method="POST" action="?/login" use:enhance>
 
      <input 
          type="email" 
          id="email" 
          name="email" 
          value={form?.email ?? ''} 
          placeholder="Email" 
          required 
      />
      <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Password" 
          required 
      />
      {#if form?.error}
          <p class="error">{form.error}</p>
      {/if}
      <Button buttonType={ButtonType.Submit} class="login-button">
          Login
      </Button>
 
</form>
</Stack>
</Stack>
</BaseLayout >

<style>
input {
  width: 100%;
  padding: var(--default-padding);
  border-radius: 0.5em;
  border: none;
  font-size: 1em;
  border: 1.5px solid var(--gray-1);
  margin-bottom: 1em; /* Add spacing between inputs */
}

  .error {
      color: var(--red);
  }

  :global(.login-button) {
    background-color: var(--blue);
    color: white;
    padding: var(--default-padding);
    border-radius: 0.5em;
  }
  

</style>