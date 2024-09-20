<script lang="ts">
  import { images } from '$lib/stores/data/+images';
  import { onMount } from 'svelte';
  import { pb } from '$lib/config/pocketbase';
  import { Direction, type Image } from '$lib/types';
  import Stack from '$lib/core/layout/+stack.svelte';
  import ImageDescription from './+image-description.svelte';
  import ImageComponent from '$lib/core/display/+image.svelte';

  let searchQuery = '';
  export let page = 1;
  export let perPage = 50;

  let main_image: Image | null = null;

  async function fetchImages(query: string = '') {
    try {
      const resultList = await pb.collection('images').getList<Image>(page, perPage, { filter: query });
      images.set(resultList.items);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  function handleImageSelect(image: Image) {
    main_image = image;
  }

  onMount(() => {
    fetchImages();
  });

  $: image_url = main_image 
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${main_image.id}/${main_image.file}`
    : '';

  function constructImageUrl(image: Image): string {
    return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
  }
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <Stack direction={Direction.Horizontal} spacing={1}>
    <Stack direction={Direction.Vertical} spacing={0.5}>
      <div class="image-grid">
        {#if $images.length > 0}
          {#each $images as image}
            <div
              on:click={() => handleImageSelect(image)}
              class="image-container {image.id === main_image?.id ? 'selected' : ''}"
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
  </Stack>

  <Stack
    direction={Direction.Horizontal}
    wrap={true}
    spacing={1}
    style="border-top: 1px solid var(--gray-2); padding-top: 2em;"
  >
    <ImageDescription image={main_image} />
  </Stack>
</Stack>

<style>
 .image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1em;
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