<script lang="ts">
  import { createEventDispatcher } from 'svelte';
    import Text from '../display/+text.svelte';
    import { TextType } from '$lib/types';

  export let value: number | null = null;
  export let min: number | null = null;
  export let max: number | null = null;
  export let placeholder: number = 0;
  export let padding: number = 0.5; // Default padding value

  const dispatch = createEventDispatcher();

  let input = value !== null ? value.toString() : '';

  $: allowNegative = min === null || min < 0;

  $: if (value !== null && value.toString() !== input) {
    input = value.toString();
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    if (isValidInput(inputValue)) {
      input = inputValue;
    }
  }

  function handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      processInput();
    }
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

<Text type={TextType.Callout}>
<input
  type="text"
  bind:value={input}
  placeholder={placeholder.toString()}
  on:input={handleInput}
  on:keydown={handleEnter}
  class="numeric-input"
  style="padding: {padding}em;" 
/>
</Text>

<style>
/* Global styles for input */
.numeric-input {
  background-color: var(--gray-1);
  border-radius: 0.5em;
  box-sizing: border-box; /* Ensure padding is included in the size */
  display: inline-block; /* The input will only take up the space needed */
}
</style>
