<!-- src/lib/components/+h-stack.svelte -->
<script lang="ts">
    import { HorizontalAlignment } from '$lib/types';
  
    export let alignment: HorizontalAlignment = HorizontalAlignment.Leading;
    export let spacing: number = 0;
  
    const getAlignmentClass = (alignment: HorizontalAlignment) => {
      switch (alignment) {
        case 'leading':
          return 'align-leading';
        case 'center':
          return 'align-center';
        case 'trailing':
          return 'align-trailing';
        default:
          return 'align-leading';
      }
    };
  </script>
  
  <style>
    .h-stack {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .align-leading {
      justify-content: flex-start;
    }
    .align-center {
      justify-content: center;
    }
    .align-trailing {
      justify-content: flex-end;
    }
  </style>
  
  <div class={`h-stack ${getAlignmentClass(alignment)}`} style="gap: {spacing}em;">
    <slot></slot>
  </div>
  