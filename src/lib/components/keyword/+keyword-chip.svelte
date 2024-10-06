<script lang="ts">
    import type { Keyword } from '$lib/types';
    import { openContextMenu } from '$lib/stores/ui/+context-menu';
    import StarFillIcon from '$lib/core/ui/icons/+star-fill.svelte';
    import { updateArticle } from '$lib/api/article/+update-article';

    export let keyword: Keyword;  // Accepting the full Keyword type
    export let keywords: string[] = [];  // Array of keyword IDs (strings)
    export let article_id: string | null = null;
    export let is_main: boolean = false;

    function handleRightClick(event: MouseEvent) {
        if (!article_id) {
            return; // Prevent the right-click action if no article ID
        }

        event.preventDefault();
        openContextMenu(event.clientX, event.clientY, [
          { 
            label: is_main ? 'Remove as main keyword' : 'Set as main keyword', 
            action: async () => {
                if (is_main) {
                    // Remove main keyword
                    const data = { main_keyword: null }; // Assuming your API accepts null to unset
                    await updateArticle(article_id as string, data);
                } else {
                    // Set as main keyword
                    const data = { main_keyword: keyword.id }; // Assuming your API expects `main_keyword`
                    await updateArticle(article_id as string, data);
                }
            } 
          },
          { 
            label: 'Remove from article', 
            action: async () => {
                console.log('Action: Remove from article');
                console.log('Initial keyword IDs:', keywords);
                console.log('Keyword to remove:', keyword.id);

                // Filter out the keyword ID from the keywords array
                const updatedKeywords = keywords.filter((k: string) => k !== keyword.id);
                console.log('Updated keyword IDs after removal:', updatedKeywords);

                // Prepare the data for updating the article
                let data: any = { keywords: updatedKeywords };

                // If the keyword is also the main keyword, unset it
                if (is_main) {
                    data.main_keyword = null;
                    console.log('Keyword was main keyword, unsetting main keyword');
                }

                // Update the article with the new keywords array (and possibly unset main keyword)
                try {
                    await updateArticle(article_id as string, data);
                    console.log('Article updated successfully', article_id, data);
                } catch (error) {
                    console.error('Error updating article:', error);
                }

                console.log('Removed keyword from article', article_id, keyword.id, is_main ? '(Unset as main keyword as well)' : '');
            } 
          }
        ]);
    }
</script>

<div class="stack keyword-chip" style="--direction: row; --align: center;" on:contextmenu={handleRightClick}>
    {#if is_main}
        <StarFillIcon size={1} color="var(--yellow)" />
    {/if}
    
    <p class="callout" style="font-weight: bold;">{keyword.keyword}</p>
</div>

<style>
    .keyword-chip {
        border-radius: 0.5em;
        background-color: var(--gray-1);
        padding: 0.5em;
    }
</style>
