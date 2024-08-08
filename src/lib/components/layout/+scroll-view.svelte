<!-- src/lib/components/+scroll-view.svelte -->
<script lang="ts">
    export let padding: number = 0; // Padding for the scroll view in pixels
    export let scrollDirection: 'vertical' | 'horizontal' = 'vertical'; // Direction of scrolling
    export let className: string = ''; // Additional classes
  </script>
  
  
  <div 
    class={`scroll-view ${scrollDirection} ${className}`} 
    style="padding: {padding}px;"
  >
    <slot></slot>
  </div>
  