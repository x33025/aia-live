<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { NumberType } from '$lib/types'; // Ensure this import is correct
  import Input from '../actions/+input.svelte';

  export let value: number | null = null;
  export let numberType: NumberType = NumberType.Integer;
  export let min: number | null = null;
  export let max: number | null = null;

  const dispatch = createEventDispatcher();

  let input = value !== null ? value.toString() : '';

  $: allowNegative = min === null || min < 0;

  function handleInput(event: CustomEvent) {
    const inputValue = event.detail.value;

    if (isValidInput(inputValue)) {
      input = inputValue;
    }
  }

  function handleBlur() {
    processInput();
  }

  function isValidInput(inputValue: string): boolean {
    const integerPattern = allowNegative ? /^-?\d*$/ : /^\d*$/;
    const floatPattern = allowNegative ? /^-?\d*(\.\d*)?$/ : /^\d*(\.\d*)?$/;

    if (numberType === NumberType.Float) {
      return floatPattern.test(inputValue);
    } else {
      return integerPattern.test(inputValue);
    }
  }

  function processInput() {
    let result: number | undefined;

    if (numberType === NumberType.Float) {
      result = parseFloat(input);
    } else {
      result = parseInt(input);
    }

    if (!isNaN(result)) {
      if (min !== null) result = Math.max(min, result);
      if (max !== null) result = Math.min(max, result);

      input = result.toString();
      dispatch('update', { value: result });
    } else {
      input = value !== null ? value.toString() : ''; // Reset to the last valid value
      alert('Invalid input format. Please enter a valid number.');
    }
  }

  $: if (value !== null && value.toString() !== input) {
    input = value.toString();
  }
</script>

<Input
  value={input}
  on:input={handleInput}
  on:blur={handleBlur}
  placeholder="0"
/>
