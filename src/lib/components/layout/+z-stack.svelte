<!-- src/lib/components/+z-stack.svelte -->
<script lang="ts">

  export let className: string = '';
</script>

<style>
  .z-stack {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  
  }
</style>

<div class="z-stack ${className}" >
  <slot></slot>
</div>
