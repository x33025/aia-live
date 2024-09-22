<script lang="ts">
  import Stack  from '$lib/core/layout/+stack.svelte';
  import { Direction } from '$lib/types';
  import  TextInput from '$lib/core/actions/+text-input.svelte';
  import { TextType } from '$lib/types';
  import MainImage  from '$lib/components/images/+main-image.svelte';
  import { article } from '$lib/stores/data/+articles';
  import { openModal } from '$lib/stores/ui/+modal';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import  NotesSidebar  from '$lib/components/notes/+notes-sidebar.svelte';
  import  ImagePicker  from '$lib/components/images/+image-picker.svelte';

  function openNotesSidebar() {
  if ($article?.expand?.notes) {
    openSidebar(NotesSidebar, { notes: $article.expand.notes });
  } else {
    console.error("Notes are not available.");
  }
}

  function openImageModal() {
    console.log("Opening Image Modal for page: ", 1, "with perPage:", 50);
    openModal(ImagePicker, "Images", { page: 1, perPage: 50 });
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
  <slot />
</Stack>
  