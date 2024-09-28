<script lang="ts">
  import { Alignment, Direction } from "$lib/types";

  export let direction: Direction = Direction.Vertical;
  export let alignment: Alignment = Alignment.Start;
  export let spacing: number = 0;
  export let wrap: boolean = false;

  // Extract specific props from $$restProps
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  const getClasses = () => [
    'stack',
    `direction-${direction}`,
    wrap ? 'wrap-content' : 'expand',
    externalClass // Add external class here
  ].join(' ');

  const getStyles = () => [
    `gap: ${spacing}em;`,
    direction === 'row' 
      ? `justify-content: ${alignment} !important; align-items: center !important;`
      : `justify-content: ${alignment} !important; align-items: stretch !important;`,
    externalStyle // Add external style here
  ].join(' ');
</script>

<style>
  .stack {
    display: flex;
    flex-direction: inherit; /* Inherit flex-direction */
    justify-content: inherit; /* Inherit justify-content */
    align-items: inherit; /* Inherit align-items */
  }

  .wrap-content {
    width: auto;
    height: auto;
  }

  .expand {
    width: auto;
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

<div class={getClasses()} style={getStyles()} {...restProps}>
  <slot />
</div>
