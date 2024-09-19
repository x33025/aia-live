<script lang="ts">
  export let width: number = 0;  // Always expect a number
  export let height: number = 0; // Always expect a number

  const getStyles = () => [
    `flex-grow: 1;`, // Automatically take up available space
    `width: ${width}em;`,
    `height: ${height}em;`,
  ].join(' ');
</script>

<div style={getStyles()}></div>

<style>
  div {
    min-width: 0;
    min-height: 0;
  }
</style>
