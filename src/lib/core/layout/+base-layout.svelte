<script lang="ts">
  import Stack from './+stack.svelte';


</script>

<Stack style="background-color: var(--gray-1);">
  <slot name="header" />
  
  <Stack class="content border-highlight  " style="margin: 1em;" >
 
    <slot />
  </Stack>
</Stack>
