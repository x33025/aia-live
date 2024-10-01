<script lang="ts">
  import { Direction } from '$lib/types';
  import TextInput from '$lib/core/actions/+text-input.svelte';
  import { TextType } from '$lib/types';
  import MainImage from '$lib/components/images/display/+main-image.svelte';
  import { article } from '$lib/stores/data/+articles';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from '$lib/components/notes/+notes-sidebar.svelte';
  import Keywords from '$lib/components/keyword/+keywords.svelte';
  import Label from '$lib/core/display/+label.svelte'; 
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import { page } from '$app/stores'; // Import page store
  
  // Function to open notes sidebar
  function openNotesSidebar() {
    if ($article?.expand?.notes) {
      openSidebar(NotesSidebar, { notes: $article.expand.notes });
    } else {
      console.error("Notes are not available.");
    }
  }

  // Dynamically determine the back path based on the current route
  $: backPath = $page.url.pathname.startsWith('/protected/articles') 
    ? '/protected/articles' 
    : '/protected';
</script>

<div class="stack expand" style="padding: 1em;">
  <div class="stack " style="--direction: row; padding-bottom: 1em; --gap: 1em; border-bottom: 1px solid var(--gray-2); width: 100%">
    <!-- Dynamically set the GoBackButton path -->

      <GoBackButton path={backPath} />
 
  
    <MainImage main_image={$article?.expand?.main_image} />
  
    <div class="stack" style="--direction: column;">
      <TextInput
        class="article-title border-highlight"
        value={$article?.title}
        placeholder="Title"
        fullWidth={true}
        type={TextType.Headline}
      />

      <Label name="Keywords">
        <Keywords />
      </Label>
    </div>
  </div>
  <slot />

</div>
