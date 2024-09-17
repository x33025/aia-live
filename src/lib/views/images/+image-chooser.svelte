<script lang="ts">
    import SearchBar from '../search/+search-bar.svelte';
    import { images } from '$lib/stores/+images';
    import { onMount } from 'svelte';
    import { pb } from '$lib/config/pocketbase';
    import { Alignment, Direction, type Image } from '$lib/types';
    import Stack from '$lib/components/layout/+stack.svelte';
    import ActivityData from '../activity/+activity-data.svelte';
    import ImageSelection from './+image-description.svelte'; // Import the ImageSelection component
    import Button from '$lib/components/actions/+button.svelte';
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let searchQuery = '';
    export let page = 1;
    export let perPage = 50;


    let main_image: Image | null = null; // Add selected image state

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

    function constructImageUrl(image: Image): string {
      return `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`;
    }
</script>
  
<Stack direction={Direction.Vertical} spacing={1}>

  <SearchBar placeholder="Search images..." onSearch={handleSearch} />
<Stack direction={Direction.Horizontal}  spacing={1}>

  <Stack direction={Direction.Vertical} spacing={0.5}>

    <div class="image-grid">
      {#if $images.length > 0}
        {#each $images as image}
          <div class="image-container" on:click={() => handleImageSelect(image)}> 
            <img src={constructImageUrl(image)} alt={image.description || 'No description'} />
          </div>
        {/each}
      {:else}
        <p>No images found.</p>
      {/if}
    </div>
  </Stack>




</Stack>
{#if main_image}
<Stack direction={Direction.Horizontal} wrap={true}  spacing={1} style="border-top: 1px solid var(--gray-2); padding-top: 1em;">
  

    <ImageSelection image={main_image} /> <!-- Pass the selected image -->


</Stack>
{/if}
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

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container img:hover {
  transform: scale(1.1);
}
</style>
