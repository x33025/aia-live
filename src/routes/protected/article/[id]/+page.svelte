<script lang="ts">
  import { article } from '$lib/stores/+article';
  import { onDestroy } from 'svelte';
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


  let unsubscribe: () => void; // To track the unsubscribe function

  // Function to handle updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Subscribe to $page data and set the article store when it changes
  unsubscribe = page.subscribe(($page) => {
    if ($page.data.article) {
      article.set($page.data.article); // Set article from $page.data
    }
  });

  // Cleanup subscription when the component is destroyed
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  function openNotesSidebar() {
    // Cast NotesSidebar to typeof SvelteComponent to match the expected type
    openSidebar(NotesSidebar, { notes: $article.expand.notes });
  }

  function openImageModal() {
    console.log("Opening Image Modal for page: ", 1, "with perPage:", 50);
    openModal(ImageGrid);
  }
</script>

<!-- Layout with the open sidebar button -->
<Stack direction={Direction.Horizontal} alignment={Alignment.Start} spacing={1} style="padding: 1em">
  <Spacer />

  <Stack spacing={1} style="width: 825px;">
    <TextInput
      class="article-title border-highlight"
      bind:value={$article.title}
      placeholder="Title"
      fullWidth={true}
      type={TextType.Headline}
    />
    <!-- Pass down the article content to the Body component -->
    <Body content={$article.content} onPublishUpdate={publishUpdate} />
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
