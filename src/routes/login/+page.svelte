<script lang="ts">
  import { enhance } from '$app/forms';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Button from '$lib/components/actions/+button.svelte';
  import { Alignment, ButtonType } from '$lib/types';


  
  interface FormData {
      email: string;
      password: string;
      error: string | null;
  }

  export let form: FormData | null = null;
</script>

<Stack alignment={Alignment.Center}>
  <h1>Login</h1>
<form method="POST" action="?/login" use:enhance>
  <Stack alignment={Alignment.Center}>
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
      <Button buttonType={ButtonType.Submit}>
          Login
      </Button>
  </Stack>
</form>
</Stack>



<style>
  input {
      width: 100%;
      padding: 0.7em;
      border-radius: 0.5em;
      border: none;
      font-size: 1em;
      border: 1px solid var(--gray-1);
  }
  .error {
      color: var(--red);
  }
  h1 {
    margin-bottom: 1em;
  }
</style>