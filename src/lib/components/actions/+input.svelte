<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Text from "../display/+text.svelte";
  import { TextType, InputType } from '$lib/types/enums';

  export let type: TextType = TextType.Body;
  export let inputType: InputType = InputType.Text;
  export let className: string = '';
  export let value: string = '';
  export let placeholder: string = '';
  export let fullWidth: boolean = true;

  let inputElement: HTMLInputElement;
  let dynamicWidth: string = 'auto';

  const dispatch = createEventDispatcher();

  // Handle input manually instead of using bind:value
  function handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    dispatch('input', { value: inputValue });
    updateInputWidth();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      dispatch('enter', { value });
      inputElement.blur(); // Lose focus when Enter is pressed
    }
    dispatch('keydown', event);
  }

  // Function to update input width dynamically based on content
  function updateInputWidth() {
    if (!fullWidth) {
      const tempSpan = document.createElement('span');
      tempSpan.style.font = getComputedStyle(inputElement).font;
      tempSpan.textContent = inputElement.value || placeholder;
      document.body.appendChild(tempSpan);
      dynamicWidth = `${tempSpan.offsetWidth + 2}px`; // Add padding to account for input padding
      document.body.removeChild(tempSpan);
    }
  }

  onMount(() => {
    updateInputWidth();
  });
</script>

<Text {type} {className} {...$$restProps}>
  <input
    bind:this={inputElement}
    type={inputType}
    value={value}
    placeholder={placeholder}
    autocomplete="off"
    autocorrect="off"
    on:input={handleInput}
    on:keydown={handleKeydown}
    style="width: {fullWidth ? '100%' : dynamicWidth};"
  />
</Text>

<style>

  input.full-width {
    width: 100%; /* If fullWidth prop is true, take up full width */
  }
</style>
