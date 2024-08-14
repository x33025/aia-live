<script lang="ts">
  import { Alignment, Direction } from "$lib/types";

  export let direction: Direction = Direction.Column;
  export let alignment: Alignment = Alignment.Start; // Unified alignment
  export let spacing: string | number = 1;
  export let className: string = '';
  export let style: string = '';

  const getClasses = () => [
    'stack',
    `direction-${direction}`,
    className,
  ].join(' ');

  const getStyles = () => [
    `gap: ${spacing}em;`,
    direction === 'row' 
      ? `justify-content: ${alignment}; align-items: ${alignment};` 
      : `justify-content: ${alignment}; align-items: ${alignment};`,
    style,
  ].join(' ');
</script>

<style>
  .stack {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .direction-row {
    flex-direction: row;
  }

  .direction-column {
    flex-direction: column;
  }
</style>

<div class={getClasses()} style={getStyles()}>
  <slot></slot>
</div>
