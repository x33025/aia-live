<script lang="ts">
    import { HorizontalAlignment, VerticalAlignment } from '$lib/types';
    import type { Alignment } from '$lib/types';
  
    export let alignment: Alignment = {
      horizontal: HorizontalAlignment.Leading,
      vertical: VerticalAlignment.Top,
    };
  
    const getHorizontalAlignmentClass = (alignment: HorizontalAlignment) => {
      switch (alignment) {
        case HorizontalAlignment.Leading:
          return 'align-horizontal-leading';
        case HorizontalAlignment.Center:
          return 'align-horizontal-center';
        case HorizontalAlignment.Trailing:
          return 'align-horizontal-trailing';
        default:
          return 'align-horizontal-leading';
      }
    };
  
    const getVerticalAlignmentClass = (alignment: VerticalAlignment) => {
      switch (alignment) {
        case VerticalAlignment.Top:
          return 'align-vertical-top';
        case VerticalAlignment.Center:
          return 'align-vertical-center';
        case VerticalAlignment.Bottom:
          return 'align-vertical-bottom';
        default:
          return 'align-vertical-top';
      }
    };
</script>
  
<style>
    .align-horizontal-leading {
      align-self: flex-start;
    }
    .align-horizontal-center {
      align-self: center;
    }
    .align-horizontal-trailing {
      align-self: flex-end;
    }
    .align-vertical-top {
      justify-self: flex-start;
    }
    .align-vertical-center {
      justify-self: center;
    }
    .align-vertical-bottom {
      justify-self: flex-end;
    }
    .aligned-item {
      z-index: 10;
    }
</style>
  
<div class={`aligned-item ${getHorizontalAlignmentClass(alignment.horizontal)} ${getVerticalAlignmentClass(alignment.vertical)}`}>
    <slot></slot>
</div>
