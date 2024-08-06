<!-- src/lib/components/layout/+button.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Text from './+text.svelte';
    import { TextType } from '$lib/types';
  
    export let type: TextType = TextType.Body;
    export let className: string = '';
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      console.log('Button clicked'); // Debugging log
      dispatch('click');
    }
  </script>
  
  <button class="{className}" on:click={handleClick}>
    <Text {type}>
      <slot></slot>
    </Text>
  </button>
  