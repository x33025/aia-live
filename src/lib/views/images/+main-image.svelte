<script lang="ts">
    import type { Image } from '$lib/types'; // Import the image type
    
    export let main_image: Image | null = null; // Accept the image data as `main_image`
    
    // Construct the image URL
    const image_url = main_image 
      ? `http://localhost:8090/api/files/images/${main_image.id}/${main_image.file}`
      : '';
  </script>
  
  <div class="image-container border-highlight" style="border-radius: 0.5em;">
    {#if main_image}
      <img src={image_url} alt={main_image.description || 'No description'} />
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
  
    img {
  width: auto;
  height: 100%;
  object-fit: cover; /* Cover the container without overflowing */
  display: block; /* This removes the inline spacing */
}

  
  </style>
  