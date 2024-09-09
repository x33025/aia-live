<script lang="ts">
    export let image_url: string | null = null; // Accept the image URL as input
    
    // Customizable width, height, and object fit props
    export let width: string = '200px';  // Default to small width
    export let height: string = '150px'; // Default to small height
    export let object_fit: string = 'cover'; // Control how the image fits inside the container
  
    // Optional alt text
    export let alt_text: string = 'Image';
  
    // Extract specific props from $$restProps for external class and style
    const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;
  
    // Combine external class with default class
    const getClasses = () => ['image-container', externalClass].join(' ');
  
    // Combine external styles with internal styles
    const getStyles = () => [
      `border-radius: 0.5em; width: ${width}; height: ${height};`,
      externalStyle // Add external styles
    ].join(' ');
  </script>
  
  <div class={getClasses()} style={getStyles()} {...restProps}>
    {#if image_url}
      <img src={image_url} alt={alt_text} style="object-fit: {object_fit};" />
    {:else}
      <p>No image available</p>
    {/if}
  </div>
  
  <style>
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: #f0f0f0; /* A light background when no image is present */
    }
  
    img {
      width: 100%;
      height: 100%;
      display: block; /* Removes any extra inline spacing */
    }
  </style>
  