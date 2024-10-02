<script lang="ts">  
    import { onDestroy } from 'svelte';
    import Gallery from '$lib/components/images/display/+gallery.svelte';
    import ImageDescription from '$lib/components/images/display/+image-description.svelte';
    import { TextType } from '$lib/types';
  import PageTitle from '$lib/core/layout/+page-title.svelte';

  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import Plus from '$lib/core/ui/icons/+plus.svelte';
    import { Direction, type Image } from '$lib/types';
    import { selected_image } from '$lib/stores/data/+images';
    import { openModal } from '$lib/stores/ui/+modal';  // Import modal handling functions
  import CropperComponent from '$lib/components/images/+cropper.svelte';  // Import the cropper component
  import CropImageButton from '$lib/components/actions/+crop-image-button.svelte';

  let fileInput: HTMLInputElement;

    let selectedImage: Image | null = null;

    const unsubscribe = selected_image.subscribe(value => {
        selectedImage = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleFileSelection() {
    fileInput.click();  // Trigger the file input
  }

  async function handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      console.log('File selected:', file.name);

      // Open the modal and pass the selected file to CropperComponent
      openModal(CropperComponent, 'Crop Image', { file }, CropImageButton);
    } else {
      console.log('No file selected');
    }
  }
</script>

<style>
    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(1em);
    }
    .add-image-button {
    background-color: var(--blue);
    border-radius: 0.5em;
    padding: 0.5em;
  }
</style>
    


<div class="stack expand" style="--align: flex-start; --gap: 1em" >
    <div class="stack" style="--direction: row; --justify: flex-start; --align: center; padding: 2em 2em 0em; width: 100%; ">
      <GoBackButton />
      <PageTitle />
      <spacer />
      <!-- <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Show me images of..." /> -->
  
      <button class="add-image-button" on:click={handleFileSelection}>
        <Plus color="white" size={1.25} />
      </button>
      <input type="file" accept="image/*" bind:this={fileInput} style="display:none" on:change={handleFileChange} />
    </div>
    <div class="scrollable-stack expand" style="padding: 0em 2em 0em 2em;">
        <Gallery />
        {#if selectedImage}
            <div class="overlay">
                <ImageDescription image={selectedImage} />
            </div>
        {/if}
    </div>
  </div>

