<!-- src/lib/components/+z-stack.svelte -->
<script lang="ts">
  export let spacing: number = 0;
</script>

<style>
  .z-stack {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing);
  }
</style>

<div class="z-stack" style="--spacing: {spacing}em;">
  <slot></slot>
</div>
