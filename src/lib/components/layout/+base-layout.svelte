<script lang="ts">
  import Stack from './+stack.svelte';
</script>

<Stack style="padding: 1em; background-color: var(--gray-1);">
  <slot name="header" />
  <Stack class="content border-highlight">
 
    <slot />
  </Stack>
</Stack>
