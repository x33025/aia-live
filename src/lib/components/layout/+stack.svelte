<script lang="ts">
  import { Alignment, Direction } from "$lib/types";

  export let direction: Direction = Direction.Vertical;
  export let alignment: Alignment = Alignment.Start;
  export let spacing: string | number = 1;
  export let className: string = '';
  export let style: string = '';
  export let wrap: boolean = false; // Control whether stack wraps content or fills space

  const getClasses = () => [
    'stack',
    `direction-${direction}`,
    wrap ? 'wrap-content' : 'expand', // Conditional class based on wrapping
    className,
  ].join(' ');

  const getStyles = () => [
    `gap: ${spacing}em;`,
    direction === 'row' 
      ? `justify-content: ${alignment}; align-items: center;`
      : `justify-content: ${alignment}; align-items: stretch;`,
    style,
  ].join(' ');
</script>

<style>
  .stack {
    display: flex;
  }

  /* Default behavior: stack takes the size it needs */
  .wrap-content {
    width: auto;
    height: auto;
  }

  /* Class for expanding stack to fill available space */
  .expand {
    width: 100%;
    height: 100%;
    flex: 1;
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
