<script lang="ts">
    import { Alignment, Direction } from '$lib/types';
    import Group from './+group.svelte';
  
    export let direction: Direction = Direction.Column;
    export let alignment: Alignment = Alignment.Start;
    export let spacing: string | number = 0;
    export let className: string = '';
  
    const getDirectionClass = (direction: Direction) => `direction-${direction}`;
    const getAlignmentClass = (alignment: Alignment) => `align-${alignment}`;
</script>
  
<Group className={`stack ${getDirectionClass(direction)} ${getAlignmentClass(alignment)} ${className}`} style={`gap: ${spacing}em`}>
    <slot></slot>
</Group>
