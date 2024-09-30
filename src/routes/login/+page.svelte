<script lang="ts">
  import { enhance } from '$app/forms';
  import BaseLayout from '$lib/core/layout/+base-layout.svelte';
  import { TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';

  import GoBackButton from '$lib/core/navigation/+go-back.svelte';


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
  

    
    <div class="stack expand" style="max-width: 300px; --justify: center;" slot="content">
     
      <div class="stack" style="--direction: row; gap: 0.5em" >
        <GoBackButton path="/"/>
        <div class="spacer" />
        <Text type={TextType.Title}>Sign In</Text>
     
      </div>
   
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
        <button class="login-button" style="width: 100%;">
          Sign In
        </button>
      </form>
    </div>

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