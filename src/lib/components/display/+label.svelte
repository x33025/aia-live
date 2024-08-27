<script lang="ts">
    import Stack from "$lib/components/layout/+stack.svelte";
    import Text from "$lib/components/display/+text.svelte";
    import { TextType } from "$lib/types";
  
    export let name: string = "Label"; // Make the text dynamic by exporting it as a prop
  </script>
  
  <Stack spacing={0.35}>
    <Text type={TextType.Callout} className={"description"}><strong>{name}</strong></Text> <!-- Use the label prop here -->
    <Stack spacing={0.5}>
      <slot />
    </Stack>
  </Stack>
  
  <style>
    :global(.description) {
      color: rgba(0, 0, 0, 0.935);
    }
  </style>
  