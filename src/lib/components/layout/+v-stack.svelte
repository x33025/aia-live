<script lang="ts">
  import { VerticalAlignment } from '$lib/types';

  export let alignment: VerticalAlignment = VerticalAlignment.Top;
  export let spacing: number = 0;
  export let className: string = '';

  const getAlignmentClass = (alignment: VerticalAlignment) => {
    switch (alignment) {
      case VerticalAlignment.Top:
        return 'align-top';
      case VerticalAlignment.Center:
        return 'align-center';
      case VerticalAlignment.Bottom:
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
    height: 100%;
    flex: 1;
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

<div class={`v-stack ${getAlignmentClass(alignment)} ${className}`} style="gap: {spacing}em;">
  <slot></slot>
</div>
