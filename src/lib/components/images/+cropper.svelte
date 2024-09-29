<script lang="ts">
    import { closeModal } from '$lib/stores/ui/+modal';
    import { onMount } from 'svelte';
    import ImageComponent from '$lib/core/display/+image.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
 
 
    export let file: File;  // File prop passed from the modal
    let image: string;
    let crop = { x: 0, y: 0 };
    let zoom: number = 1;
    let pixelCrop: { x: number, y: number, width: number, height: number } | null = null;
    let overlay = { x: 0, y: 0, width: 100, height: 100 };
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let overlayElement;

    function startDrag(event: MouseEvent) {
        dragging = true;
        startX = event.clientX - overlay.x;
        startY = event.clientY - overlay.y;
    }

    function onDrag(event: MouseEvent) {
        if (dragging) {
            overlay.x = event.clientX - startX;
            overlay.y = event.clientY - startY;
        }
    }

    function stopDrag() {
        dragging = false;
    }

    // Convert file to base64 image
    $: if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        image = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }


    onMount(() => {
      console.log('Cropper component mounted with file:', file);
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
      return () => {
          window.removeEventListener('mousemove', onDrag);
          window.removeEventListener('mouseup', stopDrag);
      };
    });
  </script>
  

    <Stack>
    <ImageComponent image_url={image} size={42}/>
    <div
        on:mousedown={startDrag}
        style="position: absolute; border: 2px solid red; cursor: move; top: {overlay.y}px; left: {overlay.x}px; width: 100%; height: 100%;"
        bind:this={overlayElement}
    ></div>
 
    <button type="button" on:click={closeModal}>Reset</button>
    </Stack>
