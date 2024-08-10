<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Text from "../display/+text.svelte";
  import { TextType } from '../../../types';
  
  export let type: TextType = TextType.Body;
  export let className: string = '';
  export let value: string;
  export let placeholder: string = '';
  
  const dispatch = createEventDispatcher();

  function handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    dispatch('input', { value: inputValue });
  }

  function handleKeydown(event: KeyboardEvent) {
    dispatch('keydown', event); // Dispatch the native KeyboardEvent directly
  }
</script>

<Text {type} {className} {...$$restProps}>
  <input
    type="text"
    bind:value={value}
    placeholder={placeholder}
    autocomplete="off"
    autocorrect="off"
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
</Text>
