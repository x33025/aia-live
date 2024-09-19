<script lang="ts">
    import { images } from '$lib/stores/+images';
    import { onMount } from 'svelte';
    import { pb } from '$lib/config/pocketbase';
    import { Direction, type Image } from '$lib/types';
    import Stack from '$lib/core/layout/+stack.svelte';
    import ImageDescription from './+image-description.svelte'; // Import the ImageSelection component
    import { createEventDispatcher } from 'svelte';
    import ImageComponent from '$lib/core/display/+image.svelte';

    const dispatch = createEventDispatcher();

    let searchQuery = '';
    export let page = 1;
    export let perPage = 50;


   export let main_image: Image | null = null; // Ensure main_image is typed correctly

    async function fetchImages(query: string = '') {
      try {
        const resultList = await pb.collection('images').getList<Image>(page, perPage, { filter: query });
        images.set(resultList.items);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    function handleSearch(value: string) {
      searchQuery = value;
      fetchImages(searchQuery);
    }

    function handleImageSelect(image: Image) {
      main_image = image; // Set the selected image
    }

    onMount(() => {
      fetchImages();
    });

    const image_url = main_image 
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${main_image.id}/${main_image.file}`
    : '';

    function constructImageUrl(image: Image): string {
      return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
    }
    
</script>
  
<Stack direction={Direction.Vertical} spacing={1}>
<Stack direction={Direction.Horizontal}  spacing={1}>

  <Stack direction={Direction.Vertical} spacing={0.5}>

    <div class="image-grid">
      {#if $images.length > 0}
        {#each $images as image}
        <div class="image-container" on:click={() => handleImageSelect(image)}>
        <ImageComponent image_url={constructImageUrl(image)} alt_text={image.description || 'No description'} maskShape="square" aspect_ratio={3 / 2} />
        </div>
        {/each}
      {:else}
        <p>No images found.</p>
      {/if}
    </div>
  </Stack>




</Stack>

<Stack direction={Direction.Horizontal} wrap={true}  spacing={1} style="border-top: 1px solid var(--gray-2); padding-top: 2em;">
  

    <ImageDescription image={main_image} /> <!-- Pass the selected image -->


</Stack>

</Stack>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 0.3fr));
  gap: 1em;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5em;
}

.image-container {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.1);
}
</style>
