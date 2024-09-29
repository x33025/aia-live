<script lang="ts">
  import ImageComponent from "$lib/core/display/+image.svelte"; // Import the new image component
    import { openModal } from "$lib/stores/ui/+modal";
    // import ImagePicker from "$lib/components/images/+image-picker.svelte";
    import type { Image } from "$lib/types";

    
  export let main_image: Image | null = null; // Accept the image data as `main_image`

  
  // Construct the image URL
  const image_url = main_image 
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${main_image.id}/${main_image.file}`
    : '';

    function openImageModal() {
    // openModal({"ImagePicker"}, "Images", { main_image });
    console.log("main_image", main_image);
  }
</script>


<div class="image-container" on:click={openImageModal}>
  <ImageComponent image_url={image_url} alt_text={main_image?.description || 'No description'} maskShape="square" aspect_ratio={3 / 2}  />

</div>
  

<style>
  .image-container {
    cursor: pointer;
  }
</style>
