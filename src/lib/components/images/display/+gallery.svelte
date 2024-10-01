<script lang="ts">
  import { Direction, type Image } from '$lib/types';
  import { selected_image } from '$lib/stores/data/+images';

  import ImageComponent from '$lib/core/display/+image.svelte';
  import { images } from '$lib/stores/data/+images';

  function constructImageUrl(image: Image): string {
    return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
  }

  function handleImageSelect(image: Image) {
    selected_image.set(image);
  }
  
</script>

    <div class="image-grid" >
      
        {#if $images.length > 0}
          {#each $images as image}
            <button
              type="button"
              on:click={() => handleImageSelect(image)}
              class="image-container {image.id === $selected_image?.id ? 'selected' : ''}"
            >
              <ImageComponent
                image_url={constructImageUrl(image)}
                alt_text={image.description || 'No description'}
                maskShape="square"
                border_radius={0.5}
                aspect_ratio={3 / 2}
          
              />
            </button>
          {/each}
        {:else}
          <p>No images found.</p>
        {/if}
      
    </div>




<style>
 .image-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
  gap: 1em !important;
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 0.5em;

}

.image-container {

  border-radius: 0.5em;
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none; /* Add this to ensure the default outline doesn’t add space */
 


}

.image-container:hover {
  transform: scale(1.05);

}

.image-container.selected {
  outline: 2px solid var(--blue);

}

</style>