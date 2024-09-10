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
  import ImageGrid from '$lib/views/images/+image-grid.svelte';
  import DataView from '$lib/views/article/[id]/data/+data-view.svelte';

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
    openModal(ImageGrid);
  }
</script>

<!-- Layout with the open sidebar button -->
<Stack direction={Direction.Horizontal} alignment={Alignment.Start} spacing={1} style="padding: 1em;">
  <Stack >
<DataView>


</DataView>
    
  </Stack>

  <Stack spacing={1} style="width: 825px;">
    {#if $article}
      <TextInput
        class="article-title border-highlight"
        value={$article.title}
        placeholder="Title"
        fullWidth={true}
        type={TextType.Headline}
      />
      <Body 
        content={$article.content} 
        onPublishUpdate={publishUpdate} 
        onSelectionChange={(selection) => console.log("Selection changed:", selection)} 
      />
    {/if}
  </Stack>

  <Stack>
    <!-- Button to open the notes sidebar -->
    <button on:click={openNotesSidebar}>Open Notes Sidebar</button>
    <button on:click={openImageModal}>View Images</button>
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