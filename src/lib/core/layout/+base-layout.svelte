<script lang="ts">
  import Stack from './+stack.svelte';


</script>

<Stack style="background-color: var(--gray-1); ">
  
  <Stack  style="margin: 1em 1em 0em ;" wrap={true} >
 
  <slot name="header" />
  </Stack>
  <Stack class="border-highlight" style="margin: 1em; background-color: white; border-radius: 1em;" >
 
    <slot />
  </Stack>
</Stack>
