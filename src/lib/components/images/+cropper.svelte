<!-- <script lang="ts">
  import Cropper from 'svelte-easy-crop';
  import { selected_image_crop } from '$lib/stores/data/+images';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { onDestroy } from 'svelte';
  import { imageService } from '$lib/services/+image-service'; // Import your image service

  export let file: File;

  let imageSrc: string | null = null;

  // State variables for Cropper
  let crop = { x: 0, y: 0 };
  let zoom = 1; // Fixed zoom level since zoom functionality is removed
  const aspect = 3 / 2; // Lock aspect ratio to 3:2
  let croppedAreaPixels = null;

  // Reactive statement to handle changes in 'file'
  $: if (file) {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    imageSrc = URL.createObjectURL(file);
  }

  onDestroy(() => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
  });

  // Called when cropping is complete
  const onCropComplete = (croppedArea, croppedAreaPixelsParam) => {
    croppedAreaPixels = croppedAreaPixelsParam;
  };

  // Function to crop the image and upload it
  const cropAndSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      // Crop the image and get a Blob representation of the cropped image
      const croppedBlob = await getCroppedImgBlob(imageSrc, croppedAreaPixels);

      // Optionally update the image in the store
      selected_image_crop.set(URL.createObjectURL(croppedBlob));

      // Create form data for upload
      const formData = new FormData();
      formData.append('image', croppedBlob, 'cropped_image.jpg'); // Append the cropped image file

      // You can add any other metadata for the image record
      const imageData = {
        title: 'Cropped Image', // Example metadata field
        description: 'This is a cropped image',
      };

      // Upload the image using the image service
      const uploadedImage = await imageService.uploadImage(croppedBlob, imageData);

      console.log('Cropped image uploaded successfully:', uploadedImage);
    } catch (error) {
      console.error('Error cropping and uploading image:', error);
    }
  };

  // Function to create the cropped image as a Blob
  const getCroppedImgBlob = async (imageSrc: string, crop: { x: number; y: number; width: number; height: number }): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Draw the cropped area of the image onto the canvas
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert the canvas to a Blob (instead of base64) for upload
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', 1);
    });
  };
</script>

<Stack spacing={1}>
  {#if imageSrc}
    <div style="position:relative;width:600px;height:400px;border:1px solid #ccc;">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        minZoom={1}
        maxZoom={1}
        cropShape="rect"
        showGrid={true}
        onCropComplete={onCropComplete}
      />
    </div>

    <button on:click={cropAndSave}>Crop & Upload</button>
  {/if}
</Stack> -->
