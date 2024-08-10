<script lang="ts">

  import Group from './+group.svelte';

  export let alignment: {
    horizontal: Alignment,
    vertical: Alignment,
  } = {
    horizontal: Alignment.Start,
    vertical: Alignment.Start,
  };
  export let zIndex: number | null = null;

  const getHorizontalAlignmentClass = (alignment: Alignment) => {
    switch (alignment) {
      case Alignment.Start:
        return 'align-horizontal-start';
      case Alignment.Center:
        return 'align-horizontal-center';
      case Alignment.End:
        return 'align-horizontal-end';
      default:
        return 'align-horizontal-start';
    }
  };

  const getVerticalAlignmentClass = (alignment: Alignment) => {
    switch (alignment) {
      case Alignment.Start:
        return 'align-vertical-start';
      case Alignment.Center:
        return 'align-vertical-center';
      case Alignment.End:
        return 'align-vertical-end';
      default:
        return 'align-vertical-start';
    }
  };

  const getZIndexStyle = (zIndex: number | null) => zIndex !== null ? `z-index: ${zIndex};` : '';
</script>

<Group className={`aligned-item ${getHorizontalAlignmentClass(alignment.horizontal)} ${getVerticalAlignmentClass(alignment.vertical)}`} style={getZIndexStyle(zIndex)}>
  <slot></slot>
</Group>
