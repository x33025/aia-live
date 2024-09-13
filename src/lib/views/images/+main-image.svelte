<script lang="ts">
  import ImageComponent from "$lib/components/display/+image.svelte"; // Import the new image component
    import { openModal } from "$lib/stores/ui/+modal";
      // Import the new image component
    import type { Image } from "$lib/types";
  export let main_image: Image | null = null; // Accept the image data as `main_image`
  import ImageChooser from "$lib/views/images/+image-chooser.svelte";
  
  // Construct the image URL
  const image_url = main_image 
    ? `http://localhost:8090/api/files/images/${main_image.id}/${main_image.file}`
    : '';

    function openImageModal() {
    console.log("Opening Image Modal for page: ", 1, "with perPage:", 50);
    openModal(ImageChooser, "Images", { main_image });
  }
</script>

<div class="image-container border-highlight" style="border-radius: 0.5em;" on:click={openImageModal}>
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
    cursor: pointer;
  }
</style>
