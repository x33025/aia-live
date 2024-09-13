<script lang="ts">
    import SearchBar from '../search/+search-bar.svelte';
    import { images } from '$lib/stores/+images';
    import { onMount } from 'svelte';
    import { pb } from '$lib/config/pocketbase';
    import { Direction, type Image } from '$lib/types';
    import Stack from '$lib/components/layout/+stack.svelte';
    import ActivityData from '../activity/+activity-data.svelte';
    import ImageSelection from './+image-description.svelte'; // Import the ImageSelection component
    import Button from '$lib/components/actions/+button.svelte';

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
  <Stack direction={Direction.Vertical} spacing={1} style="width: 300px;">
    {#if main_image}
      <ImageSelection image={main_image} /> <!-- Pass the selected image -->
      <Stack direction={Direction.Horizontal} wrap={true}>
        <Button text="Cancel" />
        <Button text="Save" />
    </Stack>
    {:else}
      <p>No image selected.</p>
    {/if}
  </Stack>
</Stack>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 1em;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
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
