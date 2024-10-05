<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Text from "../display/+text.svelte";
  import { TextType, InputType } from '$lib/types';

  export let type: TextType = TextType.Body;
  export let inputType: InputType = InputType.Text;
  export let value: string = '';
  export let placeholder: string = '';
  export let fullWidth: boolean = true;

  let inputElement: HTMLInputElement;
  let dynamicWidth: string = 'auto';
  let tempSpan: HTMLSpanElement;

  const dispatch = createEventDispatcher();

  function handleInput(event: Event) {
    value = (event.target as HTMLInputElement).value;
    dispatch('input', value);
    updateInputWidth();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      dispatch('enter', value);
      inputElement.blur();
    }
    dispatch('keydown', event);
  }

  function updateInputWidth() {
    if (!fullWidth) {
      if (!tempSpan) {
        tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.font = getComputedStyle(inputElement).font;
        document.body.appendChild(tempSpan);
      }
      tempSpan.textContent = inputElement.value || placeholder;
      dynamicWidth = `${tempSpan.offsetWidth + 2}px`;
    }
  }

  onMount(() => {
    updateInputWidth();
  });

  onDestroy(() => {
    if (tempSpan && tempSpan.parentNode) {
      tempSpan.parentNode.removeChild(tempSpan);
    }
  });
</script>

<Text {type} {...$$restProps}>
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
    width: 100%;
  }
</style>
