<script lang="ts">
  import { article } from '$lib/stores/+article';
  import { onMount, onDestroy } from 'svelte';
  import TextInput from '$lib/components/actions/+text-input.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';
  import Body from '$lib/views/article/[id]/body/+content.svelte';
  import { page } from '$app/stores';
  import NotesSidebar from '$lib/views/notes/+notes-sidebar.svelte';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import Spacer from '$lib/components/layout/+spacer.svelte';
  import { openModal } from '$lib/stores/ui/+modal';
  import ImageChooser from '$lib/views/images/+image-chooser.svelte';
  import DataView from '$lib/views/article/[id]/data/+data-tab.svelte';
    import MainImage from '$lib/views/images/+main-image.svelte';
    import GoBack from '$lib/views/navigation/+go-back.svelte';

  let unsubscribe: () => void; // To track the unsubscribe function

  // Function to handle updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Subscribe to $page data when the component mounts
  onMount(() => {
    unsubscribe = page.subscribe(($page) => {
      if ($page.data.article) {
        article.set($page.data.article); // Set article from $page.data
      }
    });
  });

  // Cleanup subscription when the component is destroyed
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  function openNotesSidebar() {
  if ($article?.expand?.notes) {
    openSidebar(NotesSidebar, { notes: $article.expand.notes });
  } else {
    console.error("Notes are not available.");
  }
}

  function openImageModal() {
    console.log("Opening Image Modal for page: ", 1, "with perPage:", 50);
    openModal(ImageChooser, "Images", { page: 1, perPage: 50 });
  }
</script>

<Stack direction={Direction.Vertical}  spacing={1} style="padding: 1em;">

<Stack direction={Direction.Horizontal} wrap={true}  spacing={1} style="padding-bottom: 1em; border-bottom: 1px solid var(--gray-3);">


  <MainImage main_image={$article?.expand?.main_image} on:click={openImageModal}/>



  <TextInput
    class="article-title border-highlight"
    value={$article?.title}
    placeholder="Title"
    fullWidth={true}
    type={TextType.Headline}
  />




</Stack>

    


  <Stack direction={Direction.Horizontal} spacing={1} >
 <DataView />
<Stack direction={Direction.Vertical} spacing={1} >
  {#if $article}
 
  <Body 
    content={$article.content} 
    onPublishUpdate={publishUpdate} 
    onSelectionChange={(selection) => console.log("Selection changed:", selection)} 
  />
{/if}
</Stack>
<Spacer />

  </Stack>

  

</Stack>


<style>
  :global(.article-title) {
    padding: 0.5em;
    background-color: white;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>