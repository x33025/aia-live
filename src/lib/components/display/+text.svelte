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

<style>
p.title {
  font-size: 1.5em;
  font-weight: bold;
}

p.headline {
  font-size: 1.25em;
  font-weight: bold;
}

p.subheadline {
  font-size: 1.125em;
  font-weight: normal;
}

p.body {
  font-size: 1em;
  font-weight: normal;
}

p.callout {
  font-size: 0.875em;
  font-weight: normal;
}

p.caption {
  font-size: 0.75em;
  font-weight: normal;
}
</style>
