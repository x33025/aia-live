<script lang="ts">
  import { Direction } from '$lib/types';
  import  TextInput from '$lib/core/actions/+text-input.svelte';
  import { TextType } from '$lib/types';
  import MainImage  from '$lib/components/images/display/+main-image.svelte';
  import { article } from '$lib/stores/data/+articles';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import  NotesSidebar  from '$lib/components/notes/+notes-sidebar.svelte';
  import Keywords from '$lib/components/keyword/+keywords.svelte';
  import Label from '$lib/core/display/+label.svelte'; // Add this import
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  
  function openNotesSidebar() {
    if ($article?.expand?.notes) {
      openSidebar(NotesSidebar, { notes: $article.expand.notes });
    } else {
      console.error("Notes are not available.");
    }
  }

</script>


<div class="stack" style="padding: 1em;"> 
  
<div class="stack" style="padding-bottom: 1em; border-bottom: 1px solid var(--gray-3);">

  
  <GoBackButton path="/protected/articles" />

  <MainImage main_image={$article?.expand?.main_image}/>


<div class="stack">

  <TextInput
    class="article-title border-highlight"
    value={$article?.title}
    placeholder="Title"
    fullWidth={true}
    type={TextType.Headline}
  />

<Label name="Keywords" >
  <Keywords />
  </Label>
</div>
</div>
  <slot />
</div>