<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from '../actions/+input.svelte';

  export let value: number | null = null;
  export let min: number | null = null;
  export let max: number | null = null;
  export let placeholder: number = 0; // Placeholder is now a number

  const dispatch = createEventDispatcher();

  // Reactive input variable bound to the value prop
  let input = value !== null ? value.toString() : '';

  $: allowNegative = min === null || min < 0;

  // Watch the prop value for changes and update input accordingly
  $: if (value !== null && value.toString() !== input) {
    input = value.toString();
  }

  function handleInput(event: CustomEvent) {
    const inputValue = event.detail.value;

    // If the input is valid, update the local input state
    if (isValidInput(inputValue)) {
      input = inputValue;
    }
  }

  function handleEnter() {
    processInput(); // Process the input when Enter is pressed
  }

  function isValidInput(inputValue: string): boolean {
    // Only allow integer pattern
    const integerPattern = allowNegative ? /^-?\d*$/ : /^\d*$/;
    return integerPattern.test(inputValue);
  }

  function processInput() {
    let result = parseInt(input);

    // If the result is a valid integer, apply min/max constraints and dispatch the update
    if (!isNaN(result)) {
      if (min !== null) result = Math.max(min, result);
      if (max !== null) result = Math.min(max, result);

      input = result.toString(); // Update the input field with the processed number
      dispatch('update', { value: result }); // Emit the update event with the new value
    } else {
      // Reset input to the last valid value
      input = value !== null ? value.toString() : '';
    }
  }
</script>

<!-- Use a text input and restrict to numbers only through event handling -->
<Input
  value={input}
  on:input={handleInput}
  on:enter={handleEnter}  
  placeholder={placeholder.toString()}
/>
