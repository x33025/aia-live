<!-- +input.svelte -->
<script lang="ts">
  import Text from "../display/+text.svelte";
  export let type: TextType = TextType.Body;
  export let className: string = '';
  export let value: string;
  export let placeholder: string = '';
</script>

<Text {type} {className}>
  <input
    type="text"
    bind:value={value}
    placeholder={placeholder}
    autocomplete="off"
    autocorrect="off"
  />
</Text>

<style>
  input {
    border: none;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    font-size: 1em;
    outline: none;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0.95);
  }
</style>
