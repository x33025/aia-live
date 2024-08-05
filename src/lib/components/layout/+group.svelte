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
    }
  </style>
  
  <div class={`group ${className}`}>
    <slot></slot>
  </div>
  