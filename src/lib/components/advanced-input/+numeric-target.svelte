<script lang="ts">
  import Stack from '../layout/+stack.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import { Direction } from '../../../types';
    import Group from '../layout/+group.svelte';

  export let target: number;
  export let current: number;
  export let update: (value: number) => void;

  function handleUpdate(event: CustomEvent<{ value: number }>) {
    update(event.detail.value);
  }
</script>

<Group className="numeric-target">
  <span>{current}</span>
  <span>/</span>
  <NumericInput bind:value={target} on:update={handleUpdate} />
</Group>

<style>

  :global(.numeric-target) {
    padding: 0.5em;
background-color: var(--gray-1);
  }
</style>