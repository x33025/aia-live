<script lang="ts">
  import { TextType } from "$lib/types";

  export let type: TextType = TextType.Body; // Use this for class-based styling

  // Extract specific props from $$restProps
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  const getClasses = () => [
    type,  // Apply the type as a class
    externalClass // Add external class here
  ].join(' ');

  const getStyles = () => [
    externalStyle // Add external style here
  ].join(' ');
</script>

<p class="{getClasses()}" style="{getStyles()}" {...restProps}>
  <slot />
</p>

