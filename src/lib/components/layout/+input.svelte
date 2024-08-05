<!-- +input.svelte -->
<script lang="ts">
    import Text from "./+text.svelte";
    export let type: TextType = TextType.Body;
    export let className: string = '';
    export let value: string;
    export let placeholder: string = '';
    export let readonly: boolean = false;
  </script>
  
  <Text {type} {className}>
    <input
      class="unstyled-input"
      type="text"
      bind:value={value}
      placeholder={placeholder}
      {readonly}
      autocomplete="off"
      autocorrect="off"
    />
  </Text>
  
  <style>
    .unstyled-input {
      border: none;
      background-color: transparent;
      width: 100%;
      box-sizing: border-box;
      font-size: 1em;
      outline: none;
    }
  
    .unstyled-input::placeholder {
      color: rgba(0, 0, 0, 0.95);
    }
  </style>
  