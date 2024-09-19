<script lang="ts">
  import Stack  from '$lib/core/layout/+stack.svelte';
  import { Direction } from '$lib/types';

</script>


<Stack direction={Direction.Vertical}  spacing={1} style="padding: 1em;"> 
  <slot />
</Stack>
  