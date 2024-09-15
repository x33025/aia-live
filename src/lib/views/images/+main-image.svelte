<script lang="ts">
  import ImageComponent from "$lib/components/display/+image.svelte"; // Import the new image component
    import { openModal } from "$lib/stores/ui/+modal";
      // Import the new image component
    import type { Image } from "$lib/types";
  export let main_image: Image | null = null; // Accept the image data as `main_image`
  import ImageChooser from "$lib/views/images/+image-chooser.svelte";
  
  // Construct the image URL
  const image_url = main_image 
    ? `${import.meta.env.POCKETBASE_URL}/api/files/images/${main_image.id}/${main_image.file}`
    : '';

    function openImageModal() {
    console.log("Opening Image Modal for page: ", 1, "with perPage:", 50);
    openModal(ImageChooser, "Images", { main_image });
  }
</script>


<div class="image-container" on:click={openImageModal}>
  <ImageComponent image_url={image_url} alt_text={main_image?.description || 'No description'} maskShape="square" aspect_ratio={ 4 / 3}  />

</div>
  

<style>
  .image-container {
    cursor: pointer;
  }
</style>
