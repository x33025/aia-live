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
  $: if (document.activeElement !== eventTarget) {
    input = value !== null && value !== 0 ? value.toString() : '';
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    // Store reference to the active input element
    eventTarget = target;

    // Dispatch valid numbers or treat empty as null
    if (!isNaN(parseFloat(inputValue))) {
      const parsedValue = parseFloat(inputValue);
      dispatch('update', { value: parsedValue === 0 ? null : parsedValue });  // Treat 0 as null
    } else if (inputValue === '') {
      dispatch('update', { value: null });  // Handle empty input as null
    }
  }
</script>

<input
  type="number"
  bind:value={input}
  on:input={handleInput}
  placeholder={placeholder}
  class="numeric-input"
  style="padding: {padding}em;"
/>

<style>
  .numeric-input {
    width: 100%;
  }
</style>
