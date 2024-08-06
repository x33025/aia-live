<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let className: string = '';
  export let buttonType: 'button' | 'submit' | 'reset' = 'button';

  const dispatch = createEventDispatcher();

  function handleClick() {
    console.log('Button clicked');
    dispatch('click');
  }
</script>

<style>
  
</style>

<button class="{className}" 
  type={buttonType} 
  on:click={handleClick}
  {...$$restProps}>
  <slot></slot>
</button>
