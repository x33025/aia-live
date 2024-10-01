<script lang="ts">
  import Text from "$lib/core/display/+text.svelte";
  import { TextType } from "$lib/types";

  export let name: string = "Label"; // Make the text dynamic by exporting it as a prop

</script>

<div  class="stack expand"  style="--direction: column; --justify: flex-start; --align: flex-start; " >
  <Text type={TextType.Callout} class="description"><strong>{name}</strong></Text> <!-- Use the label prop here -->
  <slot />
</div>

<style>
  :global(.description) {
    color: rgba(0, 0, 0, 0.935);
  }

</style>