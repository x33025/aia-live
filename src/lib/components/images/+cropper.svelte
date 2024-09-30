<script lang="ts">
    import { closeModal } from '$lib/stores/ui/+modal';
    import { onMount, onDestroy, tick } from 'svelte';



    export let file: File;  // File prop passed from the modal

    let imageSrc: string;
    let imageElement: HTMLImageElement | null = null;
    let imageContainer: HTMLElement | null = null;
    let overlayElement: HTMLElement | null = null;

    const ASPECT_RATIO = 3 / 2; // Width to height ratio (3:2)
    let overlay = { x: 0, y: 0, width: 0, height: 0 };
    let dragging = false;
    let startX = 0;
    let startY = 0;

    // Convert file to base64 image
    $: if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            imageSrc = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }

    // Function to initialize the overlay after the image has loaded
    async function initializeOverlay() {
        await tick(); // Wait for the DOM to update

        if (imageElement && overlayElement) {
            const imageRect = imageElement.getBoundingClientRect();

            // Compute maximum overlay size based on image dimensions and aspect ratio
            const maxOverlayWidthByWidth = imageRect.width;
            const maxOverlayHeightByWidth = maxOverlayWidthByWidth / ASPECT_RATIO;

            const maxOverlayHeightByHeight = imageRect.height;
            const maxOverlayWidthByHeight = maxOverlayHeightByHeight * ASPECT_RATIO;

            let maxOverlayWidth: number;
            let maxOverlayHeight: number;

            if (maxOverlayHeightByWidth <= imageRect.height) {
                // Width is the limiting factor
                maxOverlayWidth = maxOverlayWidthByWidth;
                maxOverlayHeight = maxOverlayHeightByWidth;
            } else {
                // Height is the limiting factor
                maxOverlayWidth = maxOverlayWidthByHeight;
                maxOverlayHeight = maxOverlayHeightByHeight;
            }

            // Set the overlay size to the maximum possible
            overlay.width = maxOverlayWidth;
            overlay.height = maxOverlayHeight;

            // Center the overlay over the image
            overlay.x = (imageRect.width - overlay.width) / 2;
            overlay.y = (imageRect.height - overlay.height) / 2;
        } else {
            console.error('Image or overlay element not found.');
        }
    }

    function startDrag(event: MouseEvent) {
        dragging = true;
        startX = event.clientX - overlay.x;
        startY = event.clientY - overlay.y;
    }

    function onDrag(event: MouseEvent) {
        if (dragging) {
            const newX = event.clientX - startX;
            const newY = event.clientY - startY;

            // Ensure the overlay stays within the bounds of the image
            if (overlayElement && overlayElement.parentElement) {
                const parentRect = overlayElement.parentElement.getBoundingClientRect();

                // Calculate max positions
                const maxX = parentRect.width - overlay.width;
                const maxY = parentRect.height - overlay.height;

                // Constrain overlay position
                overlay.x = Math.max(0, Math.min(newX, maxX));
                overlay.y = Math.max(0, Math.min(newY, maxY));
            } else {
                console.error('Overlay element or its parent element not found.');
            }
        }
    }

    function stopDrag() {
        dragging = false;
    }

    // Function to handle resizing via scroll wheel, enforcing aspect ratio
    function onWheel(event: WheelEvent) {
        // Only act if the wheel event occurred over the image container
        if (imageContainer && imageContainer.contains(event.target as Node)) {
            event.preventDefault();

            if (overlayElement && overlayElement.parentElement) {
                const delta = event.deltaY;
                const scaleFactor = delta > 0 ? 0.95 : 1.05; // Scroll up to increase size, down to decrease

                const parentRect = overlayElement.parentElement.getBoundingClientRect();

                // Compute maximum overlay size based on image dimensions and aspect ratio
                const maxOverlayWidthByWidth = parentRect.width;
                const maxOverlayHeightByWidth = maxOverlayWidthByWidth / ASPECT_RATIO;

                const maxOverlayHeightByHeight = parentRect.height;
                const maxOverlayWidthByHeight = maxOverlayHeightByHeight * ASPECT_RATIO;

                let maxOverlayWidth: number;
                let maxOverlayHeight: number;

                if (maxOverlayHeightByWidth <= parentRect.height) {
                    // Width is the limiting factor
                    maxOverlayWidth = maxOverlayWidthByWidth;
                    maxOverlayHeight = maxOverlayHeightByWidth;
                } else {
                    // Height is the limiting factor
                    maxOverlayWidth = maxOverlayWidthByHeight;
                    maxOverlayHeight = maxOverlayHeightByHeight;
                }

                // Apply scaling to width
                let newWidth = overlay.width * scaleFactor;
                // Enforce minimum and maximum overlay sizes
                const minOverlayWidth = 50;
                newWidth = Math.max(newWidth, minOverlayWidth);
                newWidth = Math.min(newWidth, maxOverlayWidth);

                // Calculate new height based on aspect ratio
                let newHeight = newWidth / ASPECT_RATIO;

                // Calculate new position to keep overlay centered
                const deltaWidth = newWidth - overlay.width;
                const deltaHeight = newHeight - overlay.height;

                let newX = overlay.x - deltaWidth / 2;
                let newY = overlay.y - deltaHeight / 2;

                // Ensure the overlay stays within the bounds of the image
                // Ensure overlay does not go beyond the left/top boundaries
                newX = Math.max(0, newX);
                newY = Math.max(0, newY);

                // Ensure overlay does not go beyond the right/bottom boundaries
                const maxX = parentRect.width - newWidth;
                const maxY = parentRect.height - newHeight;
                newX = Math.min(newX, maxX);
                newY = Math.min(newY, maxY);

                // Update overlay position and size
                overlay.x = newX;
                overlay.y = newY;
                overlay.width = newWidth;
                overlay.height = newHeight;
            } else {
                console.error('Overlay element or its parent element not found.');
            }
        }
    }

    onMount(() => {
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    });

    // Add wheel event listener when imageContainer is set
    let wheelListenerAdded = false;

    $: if (imageContainer && !wheelListenerAdded) {
        imageContainer.addEventListener('wheel', onWheel, { passive: false });
        wheelListenerAdded = true;
    }

    onDestroy(() => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);

        if (imageContainer && wheelListenerAdded) {
            imageContainer.removeEventListener('wheel', onWheel);
        }
    });

    // Initialize the overlay when the image loads
    $: if (imageElement && imageSrc) {
        imageElement.onload = () => {
            initializeOverlay();
        };
    }

    // Confirm crop function
    async function confirmCrop() {
        if (overlayElement && overlayElement.parentElement) {
            const img = new Image();
            img.src = imageSrc;
            await img.decode();

            const scaleX = img.width / overlayElement.parentElement.clientWidth;
            const scaleY = img.height / overlayElement.parentElement.clientHeight;

            const canvas = document.createElement('canvas');
            canvas.width = overlay.width * scaleX;
            canvas.height = overlay.height * scaleY;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(
                    img,
                    overlay.x * scaleX,
                    overlay.y * scaleY,
                    overlay.width * scaleX,
                    overlay.height * scaleY,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const croppedImage = canvas.toDataURL('image/png');
                // Do something with the cropped image
                console.log('Cropped Image:', croppedImage);
            }
        } else {
            console.error('Overlay element or its parent element not found.');
        }
    }
</script>

<div class="stack">
    <div
        style="position: relative; width: 100%; height: 100%; box-shadow: 1px 1px 1em rgba(0, 0, 0, 0.3);"
        bind:this={imageContainer}
    >
        {#if imageSrc}
            <img
                src={imageSrc}
                alt="To Crop"
                style="display: block; width: 100%; height: 100%; object-fit: contain; "
                bind:this={imageElement}
            />

            <!-- Top Overlay -->
            <div
                style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: {overlay.y}px;
                    background-color: rgba(0, 0, 0, 0.5);
                  
                    z-index: 1;
                "
            ></div>

            <!-- Left Overlay -->
            <div
                style="
                    position: absolute;
                    top: {overlay.y}px;
                    left: 0;
                    width: {overlay.x}px;
                    height: {overlay.height}px;
                    background-color: rgba(0, 0, 0, 0.5);
            
                    z-index: 1;
                "
            ></div>

            <!-- Right Overlay -->
            <div
                style="
                    position: absolute;
                    top: {overlay.y}px;
                    left: {overlay.x + overlay.width}px;
                    width: calc(100% - {overlay.x + overlay.width}px);
                    height: {overlay.height}px;
                    background-color: rgba(0, 0, 0, 0.5);
          
                    z-index: 1;
                "
            ></div>

            <!-- Bottom Overlay -->
            <div
                style="
                    position: absolute;
                    top: {overlay.y + overlay.height}px;
                    left: 0;
                    width: 100%;
                    height: calc(100% - {overlay.y + overlay.height}px);
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1;
            
                "
            ></div>

            <!-- Crop Box -->
            <div
                on:mousedown={startDrag}
                style="
                    position: absolute;
                    border: 2px solid white;
                    box-shadow: 1px 1px 1em rgba(0, 0, 0, 0.3);
                    cursor: move;
                    top: {overlay.y}px;
                    left: {overlay.x}px;
                    width: {overlay.width}px;
                    height: {overlay.height}px;
                    box-sizing: border-box;
                    z-index: 2;
                "
                bind:this={overlayElement}
            ></div>
        {/if}
    </div>


</div>
