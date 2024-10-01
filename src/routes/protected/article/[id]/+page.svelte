<script lang="ts">
  import MainImage from '$lib/components/images/display/+main-image.svelte';
  import { article } from '$lib/stores/data/+articles';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from '$lib/components/notes/+notes-sidebar.svelte';
  import Keywords from '$lib/components/keyword/+keywords.svelte';
  import Label from '$lib/core/display/+label.svelte'; 
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import { page } from '$app/stores'; 
  import { onMount } from 'svelte';
  import type { Article } from '$lib/types'; // Import Article type
  import { updateArticle } from '$lib/api/article/+update-article';
  import Body from '$lib/components/article/[id]/body/+content.svelte';
  import { debounce } from 'lodash-es'; // Import debounce from lodash-es

  // Function to publish updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Function to update the article title
  function updateArticleTitle(event: Event) {
    console.log("Updating article title");
    const target = event.target as HTMLInputElement;
    console.log("Article title updated to:", target.value);
    if ($article?.id) {
      updateArticle($article.id, { title: target.value });
    } else {
      console.error("Article ID is undefined");
    }
  }

  // Debounced version of updateArticleTitle
  const debouncedUpdateArticleTitle = debounce(updateArticleTitle, 300);

  // Dynamically determine the back path based on the current route
  $: backPath = $page.url.pathname.startsWith('/protected/articles') 
    ? '/protected/articles' 
    : '/protected';
</script>

<div class="stack expand" style="padding: 1em;">
  <div class="stack" style="--direction: row; padding-bottom: 1em; --gap: 1em; border-bottom: 1px solid var(--gray-2); width: 100%">
    <!-- GoBackButton -->
    <GoBackButton path={backPath} />

    <!-- Main Image -->
    <MainImage main_image={$article?.expand?.main_image} />

    <div class="stack" style="--direction: column;  --align: flex-start; width: 100%;">
      <input
        class="article-title border-highlight"
        value={$article?.title}
        placeholder="Title"
        on:input={debouncedUpdateArticleTitle} 
      />

      <Label name="Keywords">
        <Keywords />
      </Label>
    </div>
  </div>
  <div class="stack expand" >
    {#if $article}
      <Body 
        content={$article.content} 
        onPublishUpdate={publishUpdate} 
        onSelectionChange={(selection) => console.log("Selection changed:", selection)} 
      />
    {/if}
  </div>
</div>

<style>
.article-title {
  padding: 0.5em;
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 70%;
}
</style>
