<!-- src/lib/components/+v-stack.svelte -->
<script lang="ts">
    import { VerticalAlignment } from '$lib/types';
  
    export let alignment: VerticalAlignment = VerticalAlignment.Top;
    export let spacing: number = 0;
  
    const getAlignmentClass = (alignment: VerticalAlignment) => {
      switch (alignment) {
        case 'top':
          return 'align-top';
        case 'center':
          return 'align-center';
        case 'bottom':
          return 'align-bottom';
        default:
          return 'align-top';
      }
    };
  </script>
  
  <style>
    .v-stack {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .align-top {
      align-items: flex-start;
    }
    .align-center {
      align-items: center;
    }
    .align-bottom {
      align-items: flex-end;
    }
  </style>
  
  <div class={`v-stack ${getAlignmentClass(alignment)}`} style="gap: {spacing}em;">
    <slot></slot>
  </div>
  