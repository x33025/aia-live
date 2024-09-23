<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Text from "../display/+text.svelte";
  import { TextType, InputType } from '$lib/types';

  export let type: TextType = TextType.Body;
  export let inputType: InputType = InputType.Text;
  export let value: string = '';
  export let placeholder: string = '';
  export let fullWidth: boolean = true;

  let inputElement: HTMLInputElement;
  let dynamicWidth: string = 'auto';

  const dispatch = createEventDispatcher();

  // Extract specific props from $$restProps
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  const getClasses = () => [
    externalClass // Add external class here
  ].join(' ');

  const getStyles = () => [
    externalStyle // Add external style here
  ].join(' ');

  // Handle input manually instead of using bind:value
  function handleInput(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  value = inputValue; // Set internal value
  dispatch('input', inputValue); // Dispatch only the input value directly
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

<Text {type} class="{getClasses()}" style="{getStyles()}" {...restProps}>
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
    class="{fullWidth ? 'full-width' : ''}"
  />
</Text>

<style>
  input.full-width {
    width: 100%; /* If fullWidth prop is true, take up full width */
  }
</style>
