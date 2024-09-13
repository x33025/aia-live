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
      return `http://localhost:8090/api/files/images/${image.id}/${image.file}`;
    }
</script>
  
<Stack direction={Direction.Horizontal} spacing={0.5}>
  <Stack direction={Direction.Vertical} spacing={0.5}>
    <SearchBar placeholder="Search images..." onSearch={handleSearch} />
    <div class="image-grid">
      {#if $images.length > 0}
        {#each $images as image}
          <div class="image-container" on:click={() => handleImageSelect(image)}> <!-- Add click event -->
            <img src={constructImageUrl(image)} alt={image.description || 'No description'} />
          </div>
        {/each}
      {:else}
        <p>No images found.</p>
      {/if}
    </div>
  </Stack>

  <Stack direction={Direction.Vertical}  spacing={1} style="max-width: 300px; border-left: 1px solid #e0e0e0; padding: 0em 1em;">
  
      {#if main_image}
        <ImageSelection image={main_image} /> <!-- Pass the selected image -->
      {/if}
      <Spacer />
      <Stack direction={Direction.Horizontal} alignment={Alignment.Center} wrap={true} spacing={1}>
        <Button on:click={() => dispatch('cancel')} style=" background-color: var(--gray-2); padding: 0.5em 1em; border-radius: 0.5em;">Cancel</Button>
        <Button  on:click={() => dispatch('save')} style=" background-color: var(--blue); color: white; padding: 0.5em 1em; border-radius: 0.5em;">Save</Button>
    </Stack>

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
