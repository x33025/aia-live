<script lang="ts">
  import TextInput from '$lib/core/actions/+text-input.svelte';
  import ImageComponent from '$lib/core/display/+image.svelte';
  import Label from '$lib/core/display/+label.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Alignment, Direction, type Image } from '$lib/types';
  import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
  import NotesButton from '../../notes/+notes-button.svelte';
  import { debounce } from 'lodash-es';  // Import lodash debounce
  import ActivityDate from '$lib/core/advanced-display/+activity-date.svelte';
  import ObserveIcon from '$lib/core/ui/icons/+observe.svelte';  // Import ObserveIcon
  import Spinner from '$lib/core/display/+spinner.svelte';  // Import the Spinner component


  
  export let image: Image;

  let observePromise: Promise<any> | null = null;  // Track the observe image promise

  // Generate image URL
  $: image_url = image 
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`
    : '';

  // Debounced function to update the description
  const updateDescription = debounce(async (newDescription: string) => {
    if (!image || !image.id) {
      console.error('Image ID is missing');
      return;
    }

    try {
      const response = await fetch('/protected/images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_id: image.id, data: { description: newDescription } })
      });

      if (response.ok) {
        console.log('Description updated successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update description:', errorResponse);
      }
    } catch (err) {
      console.error('Error updating description:', err);
    }
  }, 500);

  function handleDescriptionChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const newValue = textarea.value;
    if (newValue !== undefined) {
      image.description = newValue;
      updateDescription(image.description);
    } else {
      console.error('Failed to read input value from event detail:', event);
    }
  }

  // Delete image function
  async function deleteImage() {
    if (!image || !image.id) {
      console.error('Image ID is missing');
      return;
    }

    try {
      const response = await fetch('/protected/images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_id: image.id })
      });

      if (response.ok) {
        console.log('Image deleted successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to delete image:', errorResponse);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  }
  
  // Observe image function
  async function observeImage() {

    try {

      const response = await fetch('/api/gpt/analyse-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl: image_url })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('GPT Analysis:', data.gptAnalysis);

        const newDescription = data.gptAnalysis.message.content;
        image.description = newDescription;

        // Save the description to the database
        await updateDescription(newDescription);

        // Update the description in the UI
       
      } else {
        const errorResponse = await response.json();
        console.error('Failed to analyze image:', errorResponse);
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
    }
  }

</script>



<Stack direction={Direction.Horizontal} spacing={1.5} style="border-top: 1px solid var(--gray-2); padding-top: 1em;">
  <Stack direction={Direction.Vertical} wrap={true} spacing={1}>
    <div class="image-container">
      <ImageComponent
        image_url={image_url}
        size={20}
        alt_text={image.description || 'No description provided'}
        aspect_ratio={3 / 2}
      />
      <button class="overlay-button" on:click={observeImage}>
        <ObserveIcon size={1.25} />
      </button>
    </div>
    <ActivityDate created={image.created} updated={image.updated} />
    <Label name="Activity">
      {#if image.expand?.activity}
        <ActivityDataView activity={image.expand.activity} />
      {/if}
      <Spacer />
    </Label>
  </Stack>

  <Stack direction={Direction.Vertical}>
    <Label name="Description">
      {#if observePromise}
        <Spinner promise={observePromise} />
      {:else}
        <textarea
          style="background-color: var(--gray-1); padding: 0.5em; border-radius: 0.5em; width: 100%;"
          rows="4"
          value={image.description}  
          on:input={handleDescriptionChange}
          placeholder="Add a description"
        ></textarea>
      {/if}
    </Label>
    <Spacer />
    <Label name="Notes">
      <NotesButton notes={image.expand?.notes || []} />
    </Label>
    <Spacer />
    <Stack direction={Direction.Horizontal} wrap={true}>
      <Spacer />
      <button style="background-color: var(--red); color: white; padding: 0.5em 0.75em; border-radius: 0.5em;" on:click={deleteImage}>Delete</button>
    </Stack>
  </Stack>
</Stack>



<style>
  .overlay-button {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    background-color: var(--gray-1);
    border: none;
    color: white;
    padding: 0.5em;
    border-radius: 0.25em;
    cursor: pointer;
  }

  .image-container {
    position: relative;
    display: inline-block;
  }
</style>