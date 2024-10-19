<script lang="ts">
  import { enhance } from '$app/forms';

  import OpenDoorIcon from '$lib/core/ui/icons/+door-open.svelte';
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


  

    
    <div class="stack expand" style="max-width: 300px; --justify: center;">
     
      <div class="stack" style="--direction: row; --justify: space-between; --gap: 0.5em; width: 100%; margin-bottom: 1.1em;" >
        <GoBackButton path="/"/>
      
        <p class="title">Welcome Back</p>
        <div class="spacer" />
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
        <button class="login-button stack" style="width: 100%; --justify: flex-end; --direction: row;">
          <span class="button-text">Enter</span>
          <OpenDoorIcon color="white" size={1.25} />
        </button>
      </form>
    </div>

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

.login-button {
  background-color: var(--blue);
  color: white;
  padding: var(--default-padding);
  border-radius: 0.5em;
  font-weight: bold;
  display: flex; /* Use flexbox */
  justify-content: flex-end; /* Align items to the right */
}

.button-text {
  margin-left: auto; /* Push text to the far right */
}
</style>