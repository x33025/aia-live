<script lang="ts">
    import Cropper from '$lib/components/images/+cropper.svelte';
    import ImageComponent from '$lib/core/display/+image.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import Text from '$lib/core/display/+text.svelte';

    let file: File;
    let resizedImage: string | null = null;
  
    const handleCrop = (image: string) => {
      resizedImage = image;
    };
  </script>
  
  <Stack spacing={1}>
    <h3>Crop the Image:</h3>
    <Cropper file={file} onCrop={handleCrop} />
  
    <h3>Cropped and Resized Image (1200x800):</h3>
    {#if resizedImage}
      <ImageComponent image_url={resizedImage} alt="Cropped and Resized" aspect_ratio={3/2} />
      <Text>Description</Text>
    {/if}
  </Stack>
  