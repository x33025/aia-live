<!-- +input.svelte -->
<script lang="ts">
  import Text from "../display/+text.svelte";
  export let type: TextType = TextType.Body;
  export let className: string = '';
  export let value: string;
  export let placeholder: string = '';
</script>

<Text {type} {className} {...$$restProps}>
  <input
    type="text"
    bind:value={value}
    placeholder={placeholder}
    autocomplete="off"
    autocorrect="off"
  />
</Text>

<style>
  input::placeholder {
    color: rgba(0, 0, 0, 0.95);
  }
</style>
