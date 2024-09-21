<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Pica from 'pica';
    import Cropper from 'cropperjs';
    import Stack from '$lib/core/layout/+stack.svelte';
    import 'cropperjs/dist/cropper.css';
    export let file: File;
    export let onCrop: (resizedImage: string) => void;

  
    let cropper: Cropper | null = null;
    let originalImage: string | null = null;
    let imgElement: HTMLImageElement;
  
    onMount(() => {
      if (file && file instanceof File) {
        originalImage = URL.createObjectURL(file);
      }
    });
  
    onDestroy(() => {
      if (originalImage) {
        URL.revokeObjectURL(originalImage);
      }
      if (cropper) {
        cropper.destroy();
      }
    });
  
    const initializeCropper = () => {
      if (imgElement) {
        cropper = new Cropper(imgElement, {
          aspectRatio: 3 / 2,
          viewMode: 0,
          autoCropArea: 1,
          background: false,
          responsive: true,
          movable: true,
          zoomable: true,
          dragMode: 'move',
          cropBoxMovable: true,
          cropBoxResizable: true,
        });
      }
    };
  
    const cropAndResize = async () => {
      if (!cropper) return;
      const croppedCanvas = cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = 1200;
      resizedCanvas.height = 800;
      
      try {
        const pica = new Pica();
        await pica.resize(croppedCanvas, resizedCanvas);
        const resizedImage = resizedCanvas.toDataURL();
        onCrop(resizedImage);
      } catch (error) {
        console.error("Error during resizing:", error);
      }
    };
  </script>
  
  <Stack spacing={1}>
    {#if originalImage}
      <img bind:this={imgElement} src={originalImage} alt="To Crop" on:load={initializeCropper} />
      <button on:click={cropAndResize}>Crop & Save</button>
    {/if}
  </Stack>
  
  <style>
    img {
      max-width: 100%;
      height: auto;
    }
    button {
      margin-top: 1em;
      padding: 0.5em 1em;
    }
  </style>
  