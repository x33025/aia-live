<!-- src/lib/components/+group.svelte -->
<script lang="ts">
  export let className: string = '';
  export let style: string = '';
</script>

<style>
  .group {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
  }
</style>

<div class={`${className} group`} style={style}>
  <slot></slot>
</div>
