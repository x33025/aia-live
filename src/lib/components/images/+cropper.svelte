<script lang="ts">
  import EasyCrop from 'svelte-easy-crop';
  import { onMount, createEventDispatcher } from 'svelte';
  import { croppedImageStore } from '$lib/stores/+stores';
  import Pica from 'pica';
  import Stack from '$lib/core/layout/+stack.svelte';

  export let file: File;
  
  let imageSrc: string | null = null;
  let crop = { x: 0, y: 0 };
  let zoom = 1;
  let croppedAreaPixels: CroppedArea | null = null;

  type CroppedArea = {
    width: number;
    height: number;
    x: number;
    y: number;
  };

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (file) {
      imageSrc = URL.createObjectURL(file);
    }
  });

  const onCropComplete = (_croppedArea: CroppedArea, croppedAreaPixelsParam: CroppedArea) => {
    croppedAreaPixels = croppedAreaPixelsParam;
  };

  const cropAndResize = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d'); // Get the 2D rendering context

      if (ctx && croppedAreaPixels) {
        const { width, height, x, y } = croppedAreaPixels;
        canvas.width = 1200;
        canvas.height = 800;
        
        // Draw the cropped area of the image onto the canvas
        ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);

        try {
          const pica = new Pica();
          const resizedCanvas = document.createElement('canvas');
          resizedCanvas.width = 1200;
          resizedCanvas.height = 800;
          await pica.resize(canvas, resizedCanvas);
          const resizedImage = resizedCanvas.toDataURL();
          
          croppedImageStore.set(resizedImage); // Set image in store

        } catch (error) {
          console.error("Error during resizing:", error);
        }
      } else {
        console.error("Canvas context or cropped area pixels not available.");
      }
    };
  };
</script>

<Stack spacing={1}>
  {#if imageSrc}
    <EasyCrop 
      image={imageSrc} 
      crop={crop} 
      zoom={zoom} 
      aspect={3 / 2} 
      onCrop={(newCrop: any) => crop = newCrop} 
      onZoomChange={(newZoom: any) => zoom = newZoom}
      onCropComplete={onCropComplete}
    />
    <button on:click={cropAndResize}>Crop & Save</button>
  {/if}
</Stack>
