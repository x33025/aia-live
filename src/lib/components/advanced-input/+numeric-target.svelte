<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
    import Stack from '../layout/+stack.svelte';

  export let target: number;
  export let current: number;
  export let update: (value: number) => void;

  function handleUpdate(event: CustomEvent<{ value: number }>) {
    update(event.detail.value);
  }
</script>

<div class="numeric-target">
  <span>{current}</span>
  <span>/</span>
  <NumericInput bind:value={target} on:update={handleUpdate} />
</div>

<style>

.numeric-target {
    padding: 0.5em;
background-color: var(--gray-1);
  }
</style>