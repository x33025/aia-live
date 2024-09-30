<script lang="ts">
  import { goto } from '$app/navigation';
  import Stack from '$lib/core/layout/+stack.svelte';
  import Button from '$lib/core/actions/+button.svelte';
  import BaseLayout from '$lib/core/layout/+base-layout.svelte';
  import { Direction, Alignment } from '$lib/types';

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<BaseLayout>
 
  <div class="stack" style=" padding: 1em; ">
  
    <pre class="ascii-art">
      ___                       ___     
     /\  \          ___        /\  \    
    /::\  \        /\  \      /::\  \   
   /:/\:\  \       \:\  \    /:/\:\  \  
  /::\~\:\  \      /::\__\  /::\~\:\  \ 
 /:/\:\ \:\__\  __/:/\/__/ /:/\:\ \:\__\
 \/__\:\/:/  / /\/:/  /    \/__\:\/:/  /
      \::/  /  \::/__/          \::/  / 
      /:/  /    \:\__\          /:/  /  
     /:/  /      \/__/         /:/  /   
     \/__/                     \/__/    
    </pre>
    <button on:click={handleLoginClick} class="main-login-button">
      Sign In
      
    </button>
  </div>
</BaseLayout>

<style>


  :global(.main-login-button) {
    padding: var(--default-padding);
    border-radius: 3em;
   
    font-weight: bold;
    color: white;
    background-color: black;
    z-index: 100;
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translate(-50%, -50%);
  

  }

  .ascii-art {
    font-family: monospace;
    white-space: pre;
    font-size: 1.75em;
    font-weight: bold;
    color: black;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
