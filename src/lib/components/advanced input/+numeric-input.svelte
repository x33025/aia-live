<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { NumberType } from '$lib/types'; // Ensure this import is correct

  export let value: number | null = null;
  export let numberType: NumberType = NumberType.Integer;
  export let min: number | null = null;
  export let max: number | null = null;

  const dispatch = createEventDispatcher();

  let input = value !== null ? value.toString() : '';
  let inputElement: HTMLInputElement;

  $: allowNegative = min === null || min < 0;

  // Define regex patterns once
  const integerRegex = new RegExp(`^${allowNegative ? '-?' : ''}\\d+$`);
  const floatRegex = new RegExp(`^${allowNegative ? '-?' : ''}\\d*(\\.\\d+)?$`);
  
  // Use the pre-defined regex patterns in the arithmetic regex patterns
  const integerArithmeticRegex = new RegExp(`^(${allowNegative ? '-?' : ''}\\d+)([+-])(\\d+)$`);
  const floatArithmeticRegex = new RegExp(`^(${allowNegative ? '-?' : ''}\\d*(\\.\\d+)?)([+-])(\\d*(\\.\\d+)?)$`);

  function handleInput(event: KeyboardEvent) {
    const allowedKeys = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "Backspace", "Delete", "ArrowLeft", "ArrowRight",
      "-", "+"
    ];

    // Add '.' only if numberType is Float
    if (numberType === NumberType.Float) {
      allowedKeys.push(".");
    }

    // Allow only valid keys and combinations
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      processInput();
      inputElement.blur(); // Remove focus from the input element
    }
  }

  function handleChange() {
    processInput();
  }

  function processInput() {
    let regex = numberType === NumberType.Float ? floatRegex : integerRegex;
    let arithmeticRegex = numberType === NumberType.Float ? floatArithmeticRegex : integerArithmeticRegex;
    let result: number | undefined;

    if (regex.test(input)) {
      result = numberType === NumberType.Float ? parseFloat(input) : parseInt(input);
    } else if (arithmeticRegex.test(input)) {
      const match = input.match(arithmeticRegex);
      if (match) {
        const num1 = numberType === NumberType.Float ? parseFloat(match[1]) : parseInt(match[1]);
        const operator = match[2];
        const num2 = numberType === NumberType.Float ? parseFloat(match[3]) : parseInt(match[3]);

        result = operator === '+' ? num1 + num2 : num1 - num2;
      }
    }

    if (result !== undefined) {
      if (min !== null) result = Math.max(min, result);
      if (max !== null) result = Math.min(max, result);

      input = result.toString();
      dispatch('update', { value: result });
    } else {
      input = value !== null ? value.toString() : ''; // Reset to the last valid value
      alert('Invalid input format. Use the format: number or number+number or number-number');
    }
  }

  $: if (value !== null && value.toString() !== input) {
    input = value.toString();
  }
</script>

<input
  type="text"
  bind:value={input}
  bind:this={inputElement}
  on:keydown={handleInput}
  on:change={handleChange}
  on:blur={handleChange}
  placeholder="Enter a value"
/>
