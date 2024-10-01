<script lang="ts">
  import Toolbar from './+toolbar.svelte'; // Import the toolbar component
  import TextEditor from '$lib/core/advanced-input/editor/+text-editor.svelte'; // Import the TextEditor component

  import { article } from '$lib/stores/data/+articles';
  import { updateArticle } from '$lib/api/article/+update-article';


  function updateArticleContent(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
    updateArticle($article.id, { content: updatedContent });

  }


</script>

<div class="stack expand" style="--direction: column; --gap: 0.5em; max-width: 40%;">
  <Toolbar />

  <TextEditor 
    content={$article.content} 
    onPublishUpdate={updateArticleContent} 

    placeholder="Start writing..."
  />
</div>

