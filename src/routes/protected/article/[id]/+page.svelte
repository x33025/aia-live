<script lang="ts">
  import MainImage from '$lib/components/images/display/+main-image.svelte';
  import { article } from '$lib/stores/data/+articles';

  import Keywords from '$lib/components/keyword/+keywords.svelte';
  import Label from '$lib/core/display/+label.svelte'; 
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import { page } from '$app/stores'; 

  import { updateArticle } from '$lib/api/article/+update-article';
  import Body from '$lib/components/article/[id]/body/+content.svelte';
  import { debounce } from 'lodash-es'; // Import debounce from lodash-es


  // Function to update the article title
  function updateArticleTitle(event: Event) {

    const target = event.target as HTMLInputElement;


    updateArticle($article.id, { title: target.value });

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
        <Keywords keywords={$article?.expand?.keywords}  main_keyword={$article?.expand?.main_keyword}/>
      </Label>
    </div>
  </div>
  <div class="stack expand" >
    {#if $article}
      <Body />
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
