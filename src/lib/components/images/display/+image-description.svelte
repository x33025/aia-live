<script lang="ts">
  import ImageComponent from '$lib/core/display/+image.svelte';
  import Label from '$lib/core/display/+label.svelte';
  import { type Image } from '$lib/types';
  import ActivityDataView from '$lib/components/activity/+activity-data.svelte';
  import NotesButton from '../../notes/+notes-button.svelte';
  import { debounce } from 'lodash-es';
  import ActivityDate from '$lib/core/advanced-display/+activity-date.svelte';
  import ObserveIcon from '$lib/core/ui/icons/+observe.svelte';
  import Spinner from '$lib/core/display/+spinner.svelte';
    import { selected_image } from '$lib/stores/data/+images';
    import { current_user } from '$lib/stores/data/+users';
    import { markDeleted } from '$lib/api/activity/+mark-deleted';

  export let image: Image;

  let observePromise: Promise<any> | null = null; // Track the observe image promise

  let error: string | null = null; // Error message

  // Generate image URL
  $: image_url = image
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/images/${image.id}/${image.file}`
    : '';

  // Debounced function to update the description in the backend
  const updateDescription = debounce(async (newDescription: string) => {
    if (!image || !image.id) {
      console.error('Image ID is missing');
      return;
    }

    try {
      const response = await fetch('/protected/images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_id: image.id, data: { description: newDescription } }),
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

  // Handle description changes from the textarea
  function handleDescriptionChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const newValue = textarea.value;
    if (newValue !== undefined) {
      image.description = newValue;
      updateDescription(image.description);
    } else {
      console.error('Failed to read input value from event:', event);
    }
  }



  // Handle success from the Spinner component
  function handleSuccess(event: any) {
    const result = event.detail.result;
    image.description = result; // Update the image object
    updateDescription(image.description || ''); // Save to backend
    observePromise = null; // Reset promise to hide Spinner
  }

  // Handle error from the Spinner component
  function handleError(event: any) {
    const err = event.detail.error;
    error = err.message || 'Failed to analyze image';
    console.error('Error analyzing image:', error);
    observePromise = null; // Reset promise to hide Spinner
  }

  async function handleDelete() {
    if (!image || !image.expand?.activity) {
      console.error('Cannot delete image: Missing necessary data');
      return;
    }
    
    await markDeleted(image.expand.activity.id, $current_user.id);
    selected_image.set(null); // Clear the selected image
  }

  // Function to initiate image observation
  function observeImage() {
    error = null; // Reset error message
    observePromise = fetch('/api/gpt/analyse-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: image_url }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Failed to analyze image');
          });
        }
        return response.json();
      })
      .then(data => {
        return data.gptAnalysis.message.content; // Return the description
      });
  }
</script>

<div class="stack expand" style="--direction: row; --align: flex-start; --gap: 1em; --border-top: 1px solid var(--gray-2); padding: 2em; position: relative;">
  <div class="stack" style="--direction: column; --gap: 0.5em; align-items: flex-start;">
    <div class="image-container">
      <ImageComponent
        image_url={image_url}
        size={20}
        alt_text={image.description || 'No description provided'}
        aspect_ratio={3 / 2}
      />
      <button class="overlay-button" on:click={observeImage} disabled={observePromise !== null}>
        <ObserveIcon size={1.25} />
      </button>
    </div>
    <ActivityDate created={image.created} updated={image.updated} />
    <Label name="Activity">
      {#if image.expand?.activity}
        <ActivityDataView activity={image.expand.activity} />
      {/if}
   
    </Label>
  </div>

  <div class="stack expand" style="--direction: column; --gap: 0.5em; align-items: flex-start width: 100%;">
    <Label name="Description">
      {#if observePromise}
        <Spinner
          promise={observePromise}
          loadingText="Analyzing image..."
          errorText="Failed to analyze image"
          on:success={handleSuccess}
          on:error={handleError}
        />
      {:else}
        {#if error}
          <p style="color: var(--red);">{error}</p>
        {/if}
        <textarea
          style="background-color: var(--gray-1); padding: 0.5em; border-radius: 0.5em; width: 100%;"
          rows="4"
          bind:value={image.description}
          on:input={handleDescriptionChange}
          placeholder="Add a description"
        ></textarea>
      {/if}
    </Label>

    <Label name="Notes">
      <NotesButton notes={image.expand?.notes || []} parent={image} parent_collection="images" />
    </Label>
    

  </div>

    <button
      class="delete-button"
      on:click={handleDelete}
    >
      Delete
    </button>

</div>

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

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Optional: Style the error message */
  p[style*='color: var(--red);'] {
    margin-top: 0.5em;
  }

  .delete-button {
    position: absolute;
    bottom: 1.5em;
    right:1.5em;
    background-color: var(--red);
    color: white;
    padding: 0.5em 0.75em;
    border-radius: 0.5em;
  }
</style>
