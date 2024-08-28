<script lang="ts">
    export let width: number | string = 'auto'; // Optional width control
    export let height: number | string = 'auto'; // Optional height control
    export let className: string = ''; // Allow additional custom classes
    export let style: string = ''; // Allow additional custom styles
  
    const getStyles = () => [
      `flex-grow: 1;`, // Automatically take up available space
      `width: ${typeof width === 'number' ? `${width}em` : width};`,
      `height: ${typeof height === 'number' ? `${height}em` : height};`,
      style,
    ].join(' ');
  </script>
  
  <div class={className} style={getStyles()}></div>
  
  <style>
    div {
      min-width: 0;
      min-height: 0;
    }
  </style>
  