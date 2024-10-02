<script lang="ts">
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
  import NotesButton from '$lib/components/notes/+notes-button.svelte';
  import Avatar from '$lib/components/user/+avatar.svelte';
  import type { Article } from "$lib/types";
  import { updateArticle } from '$lib/api/article/+update-article'; // Import the update function
  import { debounce } from 'lodash-es'; // Import debounce from lodash-es

  export let article: Article;
  
  // Add a function to handle input changes
  async function handleTitleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    article.title = input.value;
    
    // Call the update function
    try {
      await updateArticle(article.id, { title: article.title });
    } catch (error) {
      console.error('Failed to update article title:', error);
    }
  }

  // Debounce the handleTitleChange function
  const debouncedHandleTitleChange = debounce(handleTitleChange, 300);
</script>

<div class="stack" style="--direction: column; --gap: 0.5em; width: 100%;">
    <div class="stack" style="--direction: row; --align: center; --justify: space-between; padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; width: 100%;">
    
    <!-- Replace static title with input and add placeholder -->
    <input type="text" bind:value={article.title} on:input={debouncedHandleTitleChange} placeholder="Enter article title" />

     <div class="spacer"  />

     <a href={`/protected/article/${article.id}`} class="open-article-button">
      Open 
    </a>

    

  </div>



  <div class="stack" style="--direction: row; --justify: space-between; --align: center;  width: 100%;">
    <NotesButton notes={article.expand?.notes ?? []} parent={article} parent_collection="articles" />
  
  </div>
</div>

<style>
.open-article-button {
    background-color: var(--gray-2);
    padding: var(--small-padding);
    border-radius: 0.25em;
    color: black;
    user-select: none; /* Prevent text selection */
    white-space: nowrap; /* Ensure the button stays on one line */
   
  }
</style>