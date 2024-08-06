<!-- src/lib/components/layout/+button.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Text from './+text.svelte';
    import { TextType } from '$lib/types';
  
    export let type: TextType = TextType.Body;
    export let className: string = '';
    export let buttonType: 'button' | 'submit' | 'reset' = 'button'; // Adding the buttonType prop
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      console.log('Button clicked'); // Debugging log
      dispatch('click');
    }
  </script>
  
  <style>
    button {
        background-color: var(--blue);
    color: white;
    border-radius: 0.5em;
    padding: 0.5em 1em;
    }
  </style>
  
  <button class="{className}" type={buttonType} on:click={handleClick}>
    <Text {type}>
      <slot></slot>
    </Text>
  </button>
  