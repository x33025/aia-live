<script lang="ts">
    import Cropper from 'svelte-easy-crop';
    import { getCroppedImg } from './canvasUtils';
    import { closeModal } from '$lib/stores/ui/+modal';
    import { onMount } from 'svelte';
  
    export let file: File | null = null;  // File prop passed from the modal
    let image: string | null = null;
    let crop = { x: 0, y: 0 };
    let zoom: number = 1;
    let pixelCrop: { x: number, y: number, width: number, height: number } | null = null;
  
  
    // Convert file to base64 image
    $: if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        image = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  
    // Handle crop completion
    async function onCropComplete(e: CustomEvent<{ pixels: { x: number, y: number, width: number, height: number } }>) {
      pixelCrop = e.detail.pixels;
      await cropAndPublishImage();
    }
  
    // Publish the cropped image
    async function cropAndPublishImage() {
      if (image && pixelCrop) {
        const croppedImage = await getCroppedImg(image, pixelCrop);
        console.log('Cropped Image:', croppedImage);  // Handle the cropped image (e.g., upload it)
        closeModal();  // Close the modal after cropping
      }
    }
  
    function reset() {
      image = null;
      file = null;
      closeModal();  // Close modal on reset
    }


    onMount(() => {
      console.log('Cropper component mounted with file:', file);
    });
  </script>
  
  {#if image}
    <div style="position: relative; width: 100%; height: 50%;">
      <Cropper
        {image}
        bind:crop
        bind:zoom
        aspect={3/2}
        on:cropcomplete={onCropComplete}
      />
    </div>
    <button type="button" on:click={reset}>Reset</button>
  {:else}
    <p>No image to crop. Please provide a file.</p>
  {/if}
  