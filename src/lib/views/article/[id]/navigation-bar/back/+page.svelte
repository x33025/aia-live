<!-- <script lang="ts">
    import { patchArticle } from '$lib/api/+article';
    import { get, writable } from 'svelte/store';
    import { article } from '$lib/stores/+article'; 
    import { clearSelection } from '$lib/stores/+data-point';
    import type { Article } from '$lib/utils/interfaces/+article';
    import { goto } from '$app/navigation';
    import ArrowLeft from '$lib/icons/+arrow-left.svelte';
  
    const isSaving = writable(false);
  
    function resetArticleStore() {
        article.set({} as Article);
    }
  
    async function goBack(event: Event): Promise<void> {
        event.preventDefault();
        const currentArticle: Article = get(article);
        console.log('Current article on goBack call:', currentArticle);
  
        if (currentArticle && currentArticle.article_id) {
            console.log('Saving article before going back:', currentArticle);
            isSaving.set(true);
            
            try {
                await patchArticle(currentArticle); // Include content
                console.log('Article saved successfully.');
            } catch (error) {
                console.error('Error saving article:', error);
            }
        } else {
            console.error('Article ID is missing. Cannot save the article.');
        }
        
        clearSelection();
        resetArticleStore();
        isSaving.set(false);
        await goto('/'); 
    }
  </script>
  
  <button class="nav-button" on:click={goBack} disabled={$isSaving}>
     <ArrowLeft size="1.5rem" color="var(--gray-6)"/>
  </button>
  
  <style>
    .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        margin: 1em;
    }    
  </style> -->