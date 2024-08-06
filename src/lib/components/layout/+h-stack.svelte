<script lang="ts">
  import Group from './+group.svelte';
  import { HorizontalAlignment } from '$lib/types';

  export let alignment: HorizontalAlignment = HorizontalAlignment.Leading;
  export let spacing: number = 0;

  const getAlignmentClass = (alignment: HorizontalAlignment) => {
    switch (alignment) {
      case HorizontalAlignment.Leading:
        return 'align-leading';
      case HorizontalAlignment.Center:
        return 'align-center';
      case HorizontalAlignment.Trailing:
        return 'align-trailing';
      default:
        return 'align-leading';
    }
  };
</script>

<Group className={`h-stack ${getAlignmentClass(alignment)}`} style={`gap: ${spacing}em;`}>
  <slot></slot>
</Group>
