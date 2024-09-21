<script lang="ts">
    import Pica from 'pica';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
  
    let cropper: Cropper | null = null;
    let originalImage: string | null = null;
    let croppedImage: string | null = null;
    let resizedImage: string | null = null;
  
    const handleImageUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        originalImage = URL.createObjectURL(file);
        $: if (originalImage) {
          const imgElement = document.getElementById('cropper-img') as HTMLImageElement ;
          cropper = new Cropper(imgElement, {
            aspectRatio: 16 / 9, // Set the desired aspect ratio
            viewMode: 1, // Display the image as fully as possible
          });
        }
      }
    };
  
    const cropAndResize = async () => {
      const croppedCanvas = cropper?.getCroppedCanvas();
      const pica = new Pica();
  
      // Resize the cropped image using Pica
      const resizedCanvas = document.createElement('canvas');
      const resizedWidth = 400; // Set desired resized width
      const resizedHeight = ((croppedCanvas?.height ?? 0) * resizedWidth) / (croppedCanvas?.width ?? 1);    
      resizedCanvas.width = resizedWidth;
      resizedCanvas.height = resizedHeight;
  
      await pica.resize(croppedCanvas, resizedCanvas);
      resizedImage = resizedCanvas.toDataURL();
    };
  </script>
  
  <input type="file" accept="image/*" on:change={handleImageUpload} />
  <div>
    {#if originalImage}
      <h3>Crop the Image:</h3>
      <img id="cropper-img" src={originalImage} alt="To Crop" />
      <button on:click={cropAndResize}>Crop & Resize</button>
    {/if}
  </div>
  
  {#if resizedImage}
    <h3>Cropped and Resized Image:</h3>
    <img src={resizedImage} alt="Cropped and Resized" style="max-width: 100%;" />
  {/if}
  
  <style>
    #cropper-img {
      max-width: 100%; /* Ensure image doesn't overflow */
    }
  </style>
