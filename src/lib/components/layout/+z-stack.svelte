<!-- src/lib/components/+z-stack.svelte -->
<script lang="ts">
  export let spacing: number = 0;
  export let className: string = '';
</script>

<style>
  .z-stack {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: var(--spacing);
  }
</style>

<div class={`z-stack ${className}`} style="--spacing: {spacing}em;">
  <slot></slot>
</div>
