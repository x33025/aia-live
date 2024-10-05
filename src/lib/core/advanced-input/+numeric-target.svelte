<script lang="ts">
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';
  import { createEventDispatcher } from 'svelte';
  export let target: number | null;
  export let current: number;

  let dispatch = createEventDispatcher();

  function updateTarget(value: number) {
    dispatch('update', { value });
  }
</script>


<div class="stack" style="--direction: row; --gap: 0.5em;">
  <span>{current}</span>
  <span>/</span>
  <NumericInput 
  value={target} 
  padding={0} 
  on:update={(e) => updateTarget(e.detail.value)}
  />
</div>



