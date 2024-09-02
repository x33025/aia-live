<script lang="ts">
  import { onMount } from 'svelte';
  import { images } from '$lib/stores/+images';
  import { pb } from '$lib/config/pocketbase';
  import type { Image } from '$lib/types';

  export let page = 1;
  export let perPage = 50;

  async function fetchImages() {
    try {
      const resultList = await pb.collection('images').getList(page, perPage);
      images.set(resultList.items as unknown as Image[]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  onMount(() => {
    fetchImages();
  });

  function constructImageUrl(image: Image): string {
    return `http://localhost:8090/api/files/images/${image.id}/${image.file}`;
  }
</script>

<div class="image-grid">
{#if $images.length > 0}
  {#each $images as image}
    <div class="image-container">
      {#if image.file}
        <img src={constructImageUrl(image)} alt={image.description || 'No description'} />
      {:else}
        <p>No image available</p>
      {/if}
    </div>
  {/each}
{:else}
  <p>No images found.</p>
{/if}
</div>

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
