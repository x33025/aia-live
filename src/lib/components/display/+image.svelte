<script lang="ts">
    import Text from "$lib/components/display/+text.svelte";
    import { TextType } from "$lib/types";
  export let image_url: string | null = null; // Accept the image URL as input
  
  // Customizable size in em units
  export let size: number = 10;  // Default size in em units
  export let object_fit: string = 'cover'; // Control how the image fits inside the container
  
  // Aspect ratio control (width / height)
  export let aspect_ratio: number = 1; // Default aspect ratio 1:1 for square images (avatars)
  
  // Optional alt text
  export let alt_text: string = 'Image';
  
  // New prop for mask shape
  export let maskShape: 'circle' | 'square' = 'square'; // Default to square

  // Extract specific props from $$restProps for external class and style
  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  // Combine external class with default class
  const getClasses = () => ['image-container', externalClass].join(' ');

  // Combine external styles with internal styles
  const getStyles = () => [
    externalStyle // Add external styles
  ].join(' ');
</script>

<div class={getClasses()} style={getStyles()} {...restProps}>
  <div class="aspect-ratio-box" style="--size: {size}em; --aspect-ratio: {aspect_ratio}; --border-radius: {maskShape === 'circle' ? '50%' : '0.35em'};">
    {#if image_url}
      <img src={image_url} alt={alt_text} style="object-fit: {object_fit};" {...restProps} />
    {:else}
      <Text type={TextType.Body}>No Image</Text>
    {/if}
  </div>
</div>

<style>
  .aspect-ratio-box {
    position: relative;
    width: var(--size); /* Dynamic width based on size in em */
    padding-top: calc(var(--size) / var(--aspect-ratio)); /* Dynamic height based on aspect ratio */
    overflow: hidden;
    border-radius: var(--border-radius); /* Dynamic border radius based on maskShape */
  }

  .aspect-ratio-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: inherit; /* Ensure the image respects object-fit */
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0; /* A light background when no image is present */
  }
</style>
