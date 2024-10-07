<script lang="ts">
  import ImagePicker from '$lib/components/images/+image-picker.svelte';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import { openModal } from '$lib/stores/ui/+modal';  // Import modal handling functions
  import CropperComponent from '$lib/components/images/+cropper.svelte';  // Import the cropper component
  import CropImageButton from '$lib/components/actions/+crop-image-button.svelte';

  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import Plus from '$lib/core/ui/icons/+plus.svelte';

  function handleFileSelection() {
    fileInput.click();  // Trigger the file input
  }

  let fileInput: HTMLInputElement;

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




<div class="stack expand" style="--align: flex-start; --gap: 1em" >
  <div class="stack" style="--direction: row; --justify: flex-start; --align: center; padding: 2em 2em 0em; width: 100%; ">
    
    <GoBackButton />
    <PageTitle />
    <div class="spacer" />

    <button class="add-image-button" on:click={handleFileSelection}>
      <Plus color="white" size={1.25} />
    </button>
    <input type="file" accept="image/*" bind:this={fileInput} style="display:none" on:change={handleFileChange} />
  </div>
  <div class="stack" style="padding: 0em 2em 0em 2em;">
    <ImagePicker />
  </div>
</div>

<style>
      .add-image-button {
    background-color: var(--blue);
    border-radius: 0.5em;
    padding: 0.5em;
  }
</style>