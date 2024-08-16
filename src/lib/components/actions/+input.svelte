<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Text from "../display/+text.svelte";
  import { TextType, InputType } from '$lib/types/enums';

  export let type: TextType = TextType.Body;
  export let inputType: InputType = InputType.Text; // Default to 'text' type
  export let className: string = '';
  export let value: string;
  export let placeholder: string = '';

  const dispatch = createEventDispatcher();

  // Handle input manually instead of using bind:value
  function handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    dispatch('input', { value: inputValue });
  }

  function handleKeydown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;

    if (event.key === 'Enter') {
      dispatch('enter', { value });
      inputElement.blur(); // Lose focus when Enter is pressed
    }
    dispatch('keydown', event); // Dispatch the native KeyboardEvewnt directly
  }
</script>

<Text {type} {className} {...$$restProps}>
  <input
    type={inputType}
    value={value}  
    placeholder={placeholder}
    autocomplete="off"
    autocorrect="off"
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
</Text>
