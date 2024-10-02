<script lang="ts">

  import { Direction, TextType } from '$lib/types';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import SearchBar from '$lib/components/search/+search-bar.svelte';

  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import Plus from '$lib/core/ui/icons/+plus.svelte';
  import { page } from '$app/stores';
  import { users, current_user } from '$lib/stores/data/+users';
  import { onMount } from 'svelte';
  import { pb } from '$lib/config/pocketbase';
  import type { Image } from '$lib/types';
  import { images } from '$lib/stores/data/+images';
  import { openModal } from '$lib/stores/ui/+modal';  // Import modal handling functions
  import CropperComponent from '$lib/components/images/+cropper.svelte';  // Import the cropper component
  import CropImageButton from '$lib/components/actions/+crop-image-button.svelte';

  let fileInput: HTMLInputElement;

  onMount(() => {
    users.set($page.data.users);
    current_user.set($page.data.user);
    images.set($page.data.images);

    pb.collection('images').subscribe('*', (e) => { 
      console.log(`Action: ${e.action}`, e.record);
      
      if (e.action === 'create') {
        images.update((currentImages) => [...currentImages, e.record as unknown as Image]);
        console.log('Image uploaded successfully:', e.record);
      } else if (e.action === 'update') {
        images.update((currentImages) =>
          currentImages.map((image) => image.id === e.record.id ? e.record as unknown as Image : image)
        );
        console.log('Image updated successfully:', e.record);
      } else if (e.action === 'delete') {
        images.update((currentImages) =>
          currentImages.filter((image) => image.id !== e.record.id)
        );
        console.log('Image deleted successfully:', e.record);
      }
    }, { expand: 'activity,notes' });
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

<div class="stack expand" style="--align: flex-start; --gap: 1em" >
  <div class="stack" style="--direction: row; --justify: flex-start; --align: center; padding: 2em 2em 0em; width: 100%; ">
    <GoBackButton />
    <PageTitle />
  <div class="spacer" />
    <!-- <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Show me images of..." /> -->

    <button class="add-image-button" on:click={handleFileSelection}>
      <Plus color="white" size={1.25} />
    </button>
    <input type="file" accept="image/*" bind:this={fileInput} style="display:none" on:change={handleFileChange} />
  </div>
  <slot />
</div>

<style>
  .add-image-button {
    background-color: var(--blue);
    border-radius: 0.5em;
    padding: 0.5em;
  }
</style>
