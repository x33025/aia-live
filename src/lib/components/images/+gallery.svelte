<script lang="ts">
  import { images } from '$lib/stores/data/+images';
  import { onMount } from 'svelte';
  import { pb } from '$lib/config/pocketbase';
  import { Direction, type Image } from '$lib/types';
  import Stack from '$lib/core/layout/+stack.svelte';
  import ImageDescription from './+image-description.svelte';
  import ImageComponent from '$lib/core/display/+image.svelte';
  import { selected_image } from '$lib/stores/data/+images';
  let searchQuery = '';
  export let page = 1;
  export let perPage = 50;



  async function fetchImages(query: string = '') {
    try {
      const resultList = await pb.collection('images').getList<Image>(page, perPage, { filter: query, expand: 'activity,notes' });
      images.set(resultList.items);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  function handleImageSelect(image: Image) {
        selected_image.set(image);
      }

  onMount(() => {
    fetchImages();
  });

  $: image_url = $selected_image 
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${$selected_image.id}/${$selected_image.file}`
    : '';

  function constructImageUrl(image: Image): string {
    return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
  }
</script>


    <Stack direction={Direction.Vertical} spacing={0.5}>
      <div class="image-grid">
        {#if $images.length > 0}
          {#each $images as image}
            <div
              on:click={() => handleImageSelect(image)}
              class="image-container {image.id === $selected_image?.id ? 'selected' : ''}"
            >
              <ImageComponent
                image_url={constructImageUrl(image)}
                alt_text={image.description || 'No description'}
                maskShape="square"
                aspect_ratio={3 / 2}
              />
            </div>
          {/each}
        {:else}
          <p>No images found.</p>
        {/if}
      </div>
    </Stack>




<style>
 .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5em;
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