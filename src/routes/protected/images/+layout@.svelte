<script lang="ts">
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import SearchBar from '$lib/components/search/+search-bar.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';
  import GoBackButton from '$lib/components/navigation/+go-back.svelte';
  import Plus from '$lib/core/ui/icons/+plus.svelte';
  import { page } from '$app/stores';
  import { users, current_user } from '$lib/stores/data/+users';
  import { onMount } from 'svelte';
  import { pb } from '$lib/config/pocketbase';
  import type { Image } from '$lib/types';
  import { images } from '$lib/stores/data/+images';

  let fileInput: HTMLInputElement;

  onMount(() => {
    // Set users and current user
    users.set($page.data.users);
    current_user.set($page.data.user);

    // Subscribe to PocketBase real-time changes for the 'images' collection
    pb.collection('images').subscribe('*', (e) => {
      console.log(`Action: ${e.action}`, e.record);
      
      // Update the images store based on the action type
      if (e.action === 'create') {
        images.update((currentImages) => [...currentImages, e.record as unknown as Image]);
      } else if (e.action === 'update') {
        images.update((currentImages) =>
          currentImages.map((image) => image.id === e.record.id ? e.record as unknown as Image : image)
        );
      } else if (e.action === 'delete') {
        images.update((currentImages) =>
          currentImages.filter((image) => image.id !== e.record.id)
        );
      }
    });
  });

  function handleFileSelection() {
    fileInput.click();  // Programmatically trigger the file input
  }

  async function handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      console.log('File selected:', file.name);  // Log the selected file name
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', $page.data.user.id);
      
      try {
        console.log('Uploading file...');  // Log before uploading
        const response = await fetch('/protected/images', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        console.log('Image uploaded successfully:', result);  // Log success response
      } catch (error) {
        console.error('Error uploading image:', error);  // Log error
      }
    } else {
      console.log('No file selected');  // Log if no file is selected
    }
  }
</script>

<Stack direction={Direction.Vertical} spacing={2} style="padding: 2em;">
  <Stack direction={Direction.Horizontal} wrap={true} spacing={1.5}>
    <GoBackButton />
    <PageTitle />
    <div style="border-left: 1px solid var(--gray-3); height: 80%; width: 1px;" />
    <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Show me images of..." />
    <Spacer />
    <button class="add-image-button" on:click={handleFileSelection}>
      <Plus color="white" size={1.25} />
    </button>
    <input type="file" accept="image/*" bind:this={fileInput} style="display:none" on:change={handleFileChange} />
  </Stack>
  <slot />
</Stack>

<style>
  .add-image-button {
    background-color: var(--blue);
    border-radius: 0.5em;
    padding: 0.5em;
  }
</style>
