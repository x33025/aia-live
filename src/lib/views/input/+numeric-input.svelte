<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let value: number;
  
    const dispatch = createEventDispatcher();
  
    let input = value.toString();
  
    function handleInput(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        processInput();
      } else {
        validateKey(event);
      }
    }
  
    function validateKey(event: KeyboardEvent) {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  
    function handlePaste(event: ClipboardEvent) {
      const clipboardData = event.clipboardData;
      if (clipboardData) {
        const paste = clipboardData.getData('text');
        const regex = /^\d+$/;
        if (!regex.test(paste)) {
          event.preventDefault();
        }
      }
    }
  
    function processInput() {
      const regex = /^(\d+)([+-])(\d+)$/;
      const match = input.match(regex);
  
      if (match) {
        const num1 = parseInt(match[1]);
        const operator = match[2];
        const num2 = parseInt(match[3]);
  
        if (operator === '+') {
          input = (num1 + num2).toString();
        } else if (operator === '-') {
          input = (num1 - num2).toString();
        }
        dispatch('update', { value: parseInt(input) });
      } else {
        alert('Invalid input format. Use the format: number+number or number-number');
      }
    }
  </script>
  

<input
      type="text"
      bind:value={input}
      on:keydown={handleInput}
      on:paste={handlePaste}
      placeholder="0"
 />

  

  