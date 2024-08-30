<script lang="ts">
  import { ButtonType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let buttonType: ButtonType = ButtonType.Button;

  const dispatch = createEventDispatcher();

  // Extract specific props from $$restProps
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  const getClasses = () => [
    externalClass // Add external class here
  ].join(' ');

  const getStyles = () => [
    externalStyle // Add external style here
  ].join(' ');

  function handleClick() {
    dispatch('click');
  }
</script>

<button 
  type={buttonType} 
  class="{getClasses()}"
  style="{getStyles()}"
  on:click={handleClick}
  {...restProps}>
  <slot></slot>
</button>
