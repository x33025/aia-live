<script lang="ts">
  import Croppie from 'croppie';
  import { selected_image_crop } from '$lib/stores/data/+images';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { onDestroy, onMount } from 'svelte';
  // import imageService from '$lib/services/+image-service'; // Removed image service import

  export let file: File;

  let imageSrc: string | null = null;
  let croppieInstance: Croppie | null = null;
  let croppieElement: HTMLElement | null = null; // Reference to the container for Croppie

  const aspect = 3 / 2; // Lock aspect ratio to 3:2

  // Reactive statement to handle changes in 'file'
  $: if (file) {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    imageSrc = URL.createObjectURL(file);
  }

  onMount(() => {
    if (croppieElement) {
      croppieInstance = new Croppie(croppieElement, {
        viewport: { width: 300, height: 200, type: 'square' }, // Set the viewport size and shape
        boundary: { width: 600, height: 400 }, // The outer boundary size
        showZoomer: true, // Show zoom controls
        enableOrientation: true,
      });

      if (imageSrc) {
        croppieInstance.bind({
          url: imageSrc,
        });
      }
    }
  });

  onDestroy(() => {
    if (croppieInstance) {
      croppieInstance.destroy();
    }
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
  });

  // Function to crop the image
  const cropAndSave = async () => {
    if (!croppieInstance) return;

    try {
      // Get the cropped image as a Blob
      const croppedBlob = await croppieInstance.result({
        type: 'blob',
        format: 'jpeg',
        quality: 1,
      });

      // Optionally update the image in the store
      selected_image_crop.set(URL.createObjectURL(croppedBlob));

      // Removed image upload logic
      console.log('Cropped image ready:', croppedBlob);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };
</script>

<Stack spacing={1}>
  {#if imageSrc}
    <div bind:this={croppieElement} style="width: 600px; height: 400px; border: 1px solid #ccc;"></div>
    <button on:click={cropAndSave}>Crop</button> <!-- Updated button text -->
  {/if}
</Stack>
