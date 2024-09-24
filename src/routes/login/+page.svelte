<script lang="ts">
  import { enhance } from '$app/forms';
  import BaseLayout from '$lib/core/layout/+base-layout.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import Button from '$lib/core/actions/+button.svelte';
  import { Alignment, ButtonType, Direction, TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';

  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';

  interface FormData {
      email: string;
      password: string;
      error: string | null;
  }

  // Initialize the form with default values
  export let form: FormData = {
      email: '',
      password: '',
      error: null
  };
</script>

<BaseLayout>
  
  <Stack direction={Direction.Horizontal} alignment={Alignment.Center}>
    
    <Stack direction={Direction.Vertical} alignment={Alignment.Center} spacing={1} style="max-width: 300px" >
     
      <Stack direction={Direction.Horizontal} alignment={Alignment.Center} spacing={1} wrap={true}>
        <GoBackButton path="/"/>
        <Text type={TextType.Title}>Sign In</Text>
        <Spacer/>
      </Stack>
   
      <form method="POST" action="?/login" use:enhance>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={form?.email || ''} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={form?.password || ''} 
          placeholder="Password" 
          required 
        />
        {#if form?.error}
          <p class="error">{form.error}</p>
        {/if}
        <Button buttonType={ButtonType.Submit} class="login-button" style="width: 100%;">
          Sign In
        </Button>
      </form>
    </Stack>
  </Stack>
</BaseLayout>

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
  display: flex; /* Add flex display */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}
</style>