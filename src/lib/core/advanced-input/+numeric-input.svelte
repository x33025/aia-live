<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: number | null = null;
  export let padding: number = 0.5;
  export let placeholder: string = '0';  // Placeholder defaults to '0'
  
  const dispatch = createEventDispatcher();

  // Treat null and 0 the same for input
  let input = value !== null && value !== 0 ? value.toString() : '';

  let eventTarget: HTMLInputElement | null = null;

  // Sync input value with external changes, but avoid resetting while typing
  $: if (typeof window !== 'undefined' && document.activeElement !== eventTarget) {
    input = value !== null && value !== 0 ? value.toString() : ''; // Update here to not display 0
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;

    // Remove any non-numeric characters except for decimal points
    inputValue = inputValue.replace(/[^\d.]/g, '');

    // Ensure there is only one decimal point
    if ((inputValue.match(/\./g) || []).length > 1) {
      inputValue = inputValue.slice(0, -1);  // Remove extra decimal point
    }

    // Dispatch valid numbers or treat empty as null
    if (!isNaN(parseFloat(inputValue)) && parseFloat(inputValue) >= 0) {
      const parsedValue = parseFloat(inputValue);
      dispatch('update', { value: parsedValue });
    } else if (inputValue === '') {
      dispatch('update', { value: null });  // Handle empty input as null
    }

    // Update the input field value to the cleaned-up value
    input = inputValue;
  }

  // Ensure this code runs only in the browser
  if (typeof window !== 'undefined') {
    // Example of code that might be causing the issue
    const inputElement = document.querySelector('#numeric-input');
    if (inputElement) {
      inputElement.addEventListener('input', (event) => {
        // Your input handling code
      });
    }
  }
</script>

<input
  type="text" 
  bind:value={input}
  on:input={handleInput}
  placeholder={placeholder}
  class="numeric-input"
  style="padding: {padding}em;"
  inputmode="decimal"  
  pattern="^\d*(\.\d+)?$" 
/>

<style>
  .numeric-input {
    width: 100%;
  }
</style>
