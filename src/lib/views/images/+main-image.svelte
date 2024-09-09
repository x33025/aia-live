<script lang="ts">
  import ImageComponent from "$lib/components/display/+image.svelte"; // Import the new image component
      // Import the new image component
    import type { Image } from "$lib/types";
  export let main_image: Image | null = null; // Accept the image data as `main_image`
  
  // Construct the image URL
  const image_url = main_image 
    ? `http://localhost:8090/api/files/images/${main_image.id}/${main_image.file}`
    : '';
</script>

<div class="image-container border-highlight" style="border-radius: 0.5em;">
  {#if main_image}
    <!-- Use the new +image.svelte component -->
    <ImageComponent image_url={image_url} alt_text={main_image.description || 'No description'} />
  {:else}
    <p>No image</p>
  {/if}
</div>

<style>
  .image-container {
    width: auto;
    height: 100%;
    aspect-ratio: 3 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>
