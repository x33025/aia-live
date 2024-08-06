<!-- src/lib/components/+scroll-view.svelte -->
<script lang="ts">
    export let padding: number = 0; // Padding for the scroll view in pixels
    export let scrollDirection: 'vertical' | 'horizontal' = 'vertical'; // Direction of scrolling
    export let className: string = ''; // Additional classes
  </script>
  
  <style>
    .scroll-view {
      overflow: auto; /* Enable scrolling */
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    .scroll-view.vertical {
      overflow-y: auto; /* Vertical scrolling */
      overflow-x: hidden; /* Hide horizontal scroll */
    }
    .scroll-view.horizontal {
      overflow-x: auto; /* Horizontal scrolling */
      overflow-y: hidden; /* Hide vertical scroll */
    }
  </style>
  
  <div 
    class={`scroll-view ${scrollDirection} ${className}`} 
    style="padding: {padding}px;"
  >
    <slot></slot>
  </div>
  