<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: number | null = null;
  export let padding: number = 0.5;
  export let placeholder: string = '0';

  const dispatch = createEventDispatcher();

  let input = value !== null && value !== 0 ? value.toString() : '';

  let inputElement: HTMLInputElement;

  // Sync input value with external changes, but avoid resetting while typing
  $: if (typeof window !== 'undefined' && document.activeElement !== inputElement) {
    input = value !== null && value !== 0 ? value.toString() : '';
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;

    // Remove any non-numeric characters except for decimal points
    inputValue = inputValue.replace(/[^\d.]/g, '');

    // Ensure there is only one decimal point
    const parts = inputValue.split('.');
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Dispatch valid numbers or treat empty as null
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      dispatch('update', { value: parsedValue });
    } else if (inputValue === '') {
      dispatch('update', { value: null });
    }

    // Update the input field value to the cleaned-up value
    input = inputValue;
  }
</script>

<input
  type="text"
  bind:value={input}
  bind:this={inputElement}
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
