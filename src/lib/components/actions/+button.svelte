<script lang="ts">
    import { ButtonType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let className: string = '';
  export let buttonType: ButtonType = ButtonType.Button;

  const dispatch = createEventDispatcher();

  function handleClick() {
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
