<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Input from '../actions/+input.svelte';

  export let value: number | null = null;
  export let min: number | null = null;
  export let max: number | null = null;
  export let placeholder: number = 0; 

  const dispatch = createEventDispatcher();

  let input = value !== null ? value.toString() : '';
  
  $: allowNegative = min === null || min < 0;

  $: if (value !== null && value.toString() !== input) {
    input = value.toString();
  }

  function handleInput(event: CustomEvent) {
    const inputValue = event.detail.value;
    if (isValidInput(inputValue)) {
      input = inputValue;
    }
  }

  function handleEnter() {
    processInput();
  }

  function isValidInput(inputValue: string): boolean {
    const integerPattern = allowNegative ? /^-?\d*$/ : /^\d*$/;
    return integerPattern.test(inputValue);
  }

  function processInput() {
    let result = parseInt(input);
    if (!isNaN(result)) {
      if (min !== null) result = Math.max(min, result);
      if (max !== null) result = Math.min(max, result);
      input = result.toString();
      dispatch('update', { value: result });
    } else {
      input = value !== null ? value.toString() : '';
    }
  }
</script>

<Input
  value={input}
  on:input={handleInput}
  on:enter={handleEnter}
  placeholder={placeholder.toString()}
  fullWidth={false}
/>

<style>
/* Apply padding only when this component is standalone */
:global(.standalone) {
  padding: 0.5em;
  background-color: var(--gray-1);
  border-radius: 0.5em;
}

/* Global styles for input */
:global(.numeric-input) {
  background-color: var(--gray-1);
  border-radius: 0.5em;
}
</style>
