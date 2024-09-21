<script lang="ts">
    import Pica from 'pica';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import ImageComponent from '$lib/core/display/+image.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';



    export let file: File; // Ensure this is passed as a valid File object
  
    let cropper: Cropper | null = null;
    let originalImage: string | null = null;
    let resizedImage: string | null = null;
  
    // Create object URL for the passed file
    $: if (file && file instanceof File) { // Check if file is a valid File object
      originalImage = URL.createObjectURL(file);
      const imgElement = document.getElementById('cropper-img') as HTMLImageElement;
      if (imgElement) {
        cropper = new Cropper(imgElement, {
          aspectRatio: 16 / 9, // Set the desired aspect ratio
          viewMode: 1, // Display the image as fully as possible
        });
      }
    }
  
    const cropAndResize = async () => {
      const croppedCanvas = cropper?.getCroppedCanvas();
      const pica = new Pica();
  
      const resizedCanvas = document.createElement('canvas');
      const resizedWidth = 400; // Set desired resized width
      const resizedHeight = ((croppedCanvas?.height ?? 0) * resizedWidth) / (croppedCanvas?.width ?? 1);
      resizedCanvas.width = resizedWidth;
      resizedCanvas.height = resizedHeight;
  
      await pica.resize(croppedCanvas, resizedCanvas);
      resizedImage = resizedCanvas.toDataURL();
    };
  </script>
  
  <Stack direction={Direction.Vertical} spacing={1}>
  {#if originalImage}

    <h3>Crop the Image:</h3>
    <ImageComponent image_url={originalImage} alt="To Crop" />
    <Spacer />
    <button on:click={cropAndResize}>Crop & Resize</button>

     {/if}

  
  {#if resizedImage}
    <h3>Cropped and Resized Image:</h3>
    <img src={resizedImage} alt="Cropped and Resized" style="max-width: 100%;" />
  {/if}

</Stack>
  
  <style>
    #cropper-img {
      max-width: 100%; /* Ensure image doesn't overflow */
    }
  </style>
  