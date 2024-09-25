<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let promise: Promise<any> | null = null;
    export let loadingText: string = 'Loading...'; // Customizable loading text
    export let errorText: string = 'An error occurred'; // Customizable error text
  
    let status = 'idle';
    let result: any = null;
    let error: any = null;
  
    const dispatch = createEventDispatcher();
  
    $: if (promise) {
      status = 'loading';
      promise
        .then(res => {
          result = res;
          status = 'success';
          dispatch('success', { result });
        })
        .catch(err => {
          error = err;
          status = 'error';
          dispatch('error', { error });
        });
    }
  </script>
  
  {#if status === 'loading'}
    <div class="spinner">{loadingText}</div>
  {:else if status === 'error'}
    <div class="error">{errorText}: {error.message}</div>
  {/if}
  
  <style>
    .spinner {
      /* Add your spinner styles here */
      padding: 0.5em;
      text-align: center;
    }
    .error {
      padding: 0.5em;
      background-color: var(--red);
      border-radius: 0.25em;
      text-align: center;
      color: white;
    }
  </style>
  