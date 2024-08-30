<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
    import { Direction } from '$lib/types';
    import Stack from '../layout/+stack.svelte';

  export let target: number | null;
  export let current: number;
  export let update: (value: number) => void;

  function handleUpdate(event: CustomEvent<{ value: number }>) {
    update(event.detail.value);
  }
</script>


<Stack direction={Direction.Horizontal} class="numeric-target" wrap={true} spacing={0.5}>
  <span>{current}</span>
  <span>/</span>
  <NumericInput bind:value={target} on:update={handleUpdate} padding={0} />
</Stack>



<style>

:global(.numeric-target){
    padding: 0.5em;
background-color: var(--gray-1);
border-radius: 0.5em;
  }
</style>