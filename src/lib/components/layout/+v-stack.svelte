<script lang="ts">
  import Group from './+group.svelte';
  import { VerticalAlignment } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

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

  const dispatch = createEventDispatcher();
</script>

<Group class={`v-stack ${getAlignmentClass(alignment)} ${className}`} style={`gap: ${spacing}em;`} {...$$restProps}>
  <slot></slot>
</Group>


