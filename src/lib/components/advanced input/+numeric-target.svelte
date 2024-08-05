<script lang="ts">
  import NumericInput from '$lib/components/advanced input/+numeric-input.svelte';

  export let target: number;
  export let current: number;
  export let update: (value: number) => void;

  function handleUpdate(event: CustomEvent<{ value: number }>) {
      update(event.detail.value);
  }
</script>

<span>{current}</span>
<span>/</span>
<NumericInput 
  bind:value={target} 
  on:update={handleUpdate} 
/>
