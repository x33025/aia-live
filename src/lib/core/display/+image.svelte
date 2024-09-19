<script lang="ts">
  import Text from "$lib/core/display/+text.svelte";
  import { TextType } from "$lib/types";

  export let image_url: string | null = null;
  export let size: number = 10;  
  export let object_fit: string = 'cover';
  export let aspect_ratio: number = 1;
  export let alt_text: string = 'Image';
  export let maskShape: 'circle' | 'square' = 'square'; 

  const { class: externalClass = '', style: externalStyle = '', ...restProps } = $$restProps;

  // Get common styles for both the image and the placeholder div
  const getCommonStyles = () => `
    width: ${size}em;
    height: calc(${size}em / ${aspect_ratio});
    border-radius: ${maskShape === 'circle' ? '50%' : '0.35em'};
  `;
  
  const getClasses = () => ['image-container', externalClass].join(' ');
  const getStyles = () => [externalStyle].join(' ');
</script>

<div class={getClasses()} style={getStyles()} {...restProps}>
  {#if image_url}
    <img 
      src={image_url} 
      alt={alt_text} 
      style="object-fit: {object_fit}; {getCommonStyles()}" 
      {...restProps} 
    />
  {:else}
    <div class="image-placeholder" style="{getCommonStyles()}">
      <Text type={TextType.Body}>No Image</Text>
    </div>
  {/if}
</div>

<style>
  .image-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-1); /* You can adjust this color */
  }

  img {
    display: block;
  }
</style>
