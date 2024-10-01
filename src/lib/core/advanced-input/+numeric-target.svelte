<script lang="ts">
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';

  export let target: number | null;
  export let current: number;
  export let update: (value: number) => void;

  function handleUpdate(event: CustomEvent<{ value: number }>) {
    update(event.detail.value);
  }
</script>


<div class="stack" style="--direction: row; --gap: 0.5em;">
  <span>{current}</span>
  <span>/</span>
  <NumericInput bind:value={target} on:update={handleUpdate} padding={0} />
</div>



