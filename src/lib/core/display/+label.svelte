<script lang="ts">
  import Stack from "$lib/core/layout/+stack.svelte";
  import Text from "$lib/core/display/+text.svelte";
  import { TextType } from "$lib/types";

  export let name: string = "Label"; // Make the text dynamic by exporting it as a prop

  // Extract external class and style from $$restProps
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  // Compute the classes
  const getClasses = () => [
    externalClass // Add external class here
  ].join(' ');

  // Compute the styles
  const getStyles = () => [
    externalStyle // Add external style here
  ].join(' ');
</script>

<Stack spacing={0.35} wrap={true} class={getClasses()} style={getStyles()} {...restProps}>
  <Text type={TextType.Callout} class="description"><strong>{name}</strong></Text> <!-- Use the label prop here -->
  <slot />
</Stack>

<style>
  :global(.description) {
    color: rgba(0, 0, 0, 0.935);
  }
</style>