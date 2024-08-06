<!-- src/lib/components/+group.svelte -->
<script lang="ts">
    export let className: string = '';
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
  
  <div class={`${className} group`} {...$$restProps}>
    <slot></slot>
  </div>
  