<script lang="ts">
  import { Direction, type Image } from '$lib/types';
  import { selected_image } from '$lib/stores/data/+images';
  import Stack from '$lib/core/layout/+stack.svelte';
  import ImageComponent from '$lib/core/display/+image.svelte';

  export let images: Image[] = [];

  function constructImageUrl(image: Image): string {
    return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
  }

  function handleImageSelect(image: Image) {
    selected_image.set(image);
  }
</script>

    <Stack direction={Direction.Vertical} class="image-grid" spacing={0.5} wrap={true}>
      
        {#if images.length > 0}
          {#each images as image}
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
      
    </Stack>




<style>
 :global(.image-grid) {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
  gap: 1.5em !important;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5em;
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none; /* Add this to ensure the default outline doesn’t add space */
  box-sizing: border-box; /* Ensures padding and border are included in width and height */
}

.image-container:hover {
  transform: scale(1.05);
}

.image-container.selected {
  outline: 2px solid var(--blue);
  box-sizing: border-box; /* Ensures the outline does not affect the layout */
}

</style>