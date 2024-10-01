<script lang="ts">
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import TextInput from '$lib/core/actions/+text-input.svelte';
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/core/advanced-input/+numeric-target.svelte';
  import { Direction, type Article, type Category, type Status, type User, toIdentifiableUser, type IdentifiableUser, Alignment, type Website } from '$lib/types';
  import Keywords from '../keyword/+keywords.svelte';
  import Label from '$lib/core/display/+label.svelte';
  import MainImage from '../images/display/+main-image.svelte';
  import NotesButton from '../notes/+notes-button.svelte';
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
  import { updateArticle } from '$lib/api/article/+update-article';

  export let article: Article;
  export let categories: Category[];
  export let writers: User[];

  // Convert writers to IdentifiableUser array
  const identifiableWriters = writers.map(toIdentifiableUser);

  $: selectedCategory = article.category ? categories.find(c => c.id === article.category) : null;
  $: selectedWriter = article.author ? identifiableWriters.find(w => w.id === article.author) : null;

  function handleTitleChange(event: CustomEvent<string>) {
    const newTitle = event.detail;
    console.log(`Title change detected. New title: ${newTitle}`);
    updateArticle(article.id, { title: newTitle }); // Direct call to updateArticle
  }

  function handleWriterSelect(writer: IdentifiableUser | null) {
    selectedWriter = writer;
    console.log(`Writer change detected. New writer: ${writer?.id ?? null}`);
    updateArticle(article.id, { author: writer?.id ?? null }); // Direct call to updateArticle
  }

  function handleCategorySelect(category: Category | null) {
    selectedCategory = category;
    console.log(`Category change detected. New category: ${category?.id ?? null}`);
    updateArticle(article.id, { category: category?.id ?? null }); // Direct call to updateArticle
  }

  function updateSemrushScore(value: number) {
    console.log(`Updating semrush_score to ${value}`);
    // Implement actual update logic here, e.g., making a request to your backend.
    updateArticle(article.id, { semrush_score: value });
  }

  function updateTargetWordCount(value: number) {
    console.log(`Updating target_word_count to ${value}`);
    // Implement actual update logic here, e.g., making a request to your backend.
    updateArticle(article.id, { target_word_count: value });

  }




</script>

<div class="stack expand" style="--direction: column; --align: flex-start; --justify: stretch; " >
  <div class="stack expand" style="--direction: row;">
    <MainImage main_image={article.expand?.main_image} />
    <div class="stack expand" style="--direction: column;">
      <div class="stack expand" style="--direction: row;">
        <TextInput
          class="article-row-title"
          value={article.title}
          on:input={handleTitleChange}
          placeholder="Title"
          fullWidth={true}
        />
        

        <!-- Dropdown for selecting writer -->
        <DropdownMenu 
          id={`writer-dropdown-${article.id}`}
          selectedOption={selectedWriter?.id}
        >
          <span class="label" slot="button">
            {selectedWriter ? selectedWriter.name : 'Select a writer'}
          </span>
          <svelte:fragment let:selectOption>
            {#each identifiableWriters as writer}
              <p class="picker-item" on:click={() => { selectOption(writer.id); handleWriterSelect(writer); }}>
                {writer.name}
              </p>
            {/each}
          </svelte:fragment>
        </DropdownMenu>
    
        <!-- Dropdown for selecting category -->
        <DropdownMenu 
          id={`category-dropdown-${article.id}`}
          selectedOption={selectedCategory?.id}
        >
          <span class="label" slot="button">
            {selectedCategory ? selectedCategory.name : 'Select a category'}
          </span>
          <svelte:fragment slot="default" let:selectOption>
            {#each categories as category}
              <p class="picker-item" on:click={() => { selectOption(category.id); handleCategorySelect(category); }}>
                {category.name}
              </p>
            {/each}
          </svelte:fragment>
        </DropdownMenu>
    
        <OpenArticleButton articleId={article.id} />


      </div>
    
      <div class="stack" style="--direction: row;">
        <Label name="Semrush Score">
          <NumericInput
            value={article.semrush_score} 
            on:update={(event) => updateSemrushScore(event.detail.value)}
            padding={0}
          />
        </Label>
        
        <Label name="Word Count">
          <NumericTarget
            target={article.target_word_count} 
            current={article.word_count} 
            update={updateTargetWordCount}
          />
        </Label>
        <Label name="Notes">
          <NotesButton
            notes={article.expand?.notes}
            activity={article.expand?.activity}
            parent={article}
            parent_collection="articles"
      />
        </Label>
       
      </div>
    
    </div>
    
  </div>
  <Label name="Keywords">
    <Keywords main_keyword={article.expand?.main_keyword} keywords={article.expand?.keywords} />
  </Label>
</div>

<style>
  :global(.article-row-title) {
    background-color: rgba(var(--yellow-rgb), 0.4);
    border-radius: 0.5em;
    padding: var(--default-padding);
    width: 100%;
  }

  :global(.open-article-button) {
    background-color: var(--blue);
    padding: var(--default-padding);
    border-radius: 0.5em;
    color: white;
  }

  .picker-item {
     padding: 0.5em;
     cursor: pointer;
     border-radius: 0.3em;
     width: 100%;
   }
   .picker-item:hover {
     background-color: var(--gray-1);
   }
</style>
