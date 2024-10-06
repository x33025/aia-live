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
  import { debounce } from 'lodash-es';
    import { e } from 'mathjs';

  export let article: Article;
  export let categories: Category[];
  export let writers: User[];
  export let statuses: Status[];
  // Convert writers to IdentifiableUser array
  const identifiableWriters = writers.map(toIdentifiableUser);

  $: selectedCategory = article.category ? categories.find(c => c.id === article.category) : null;
  $: selectedWriter = article.author ? identifiableWriters.find(w => w.id === article.author) : null;
  $: selectedStatus = article.status ? statuses.find(s => s.id === article.status) : null;

  // Debounce the title change handler
  const debouncedUpdateArticle = debounce((articleId, newTitle) => {
    console.log(`Title change detected. New title: ${newTitle}`);
    updateArticle(articleId, { title: newTitle });
  }, 300); // Adjust the debounce delay as needed

  function handleTitleChange(event: CustomEvent<string>) {
    const newTitle = event.detail;
    debouncedUpdateArticle(article.id, newTitle);
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
    updateArticle(article.id, { semrush_score: value });
  }

  function updateTargetWordCount(value: number) {
    console.log(`Updating target_word_count to ${value}`);
    updateArticle(article.id, { target_word_count: value });

  }

  function handleStatusSelect(status: Status) {
    selectedStatus = status;
    console.log(`Status change detected. New status: ${status}`);
    updateArticle(article.id, { status: status.id }); // Direct call to updateArticle
  }




</script>

<div class="stack " style="--direction: column; --align: flex-start; --justify: stretch; width: 100%;" >
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
        <svelte:fragment>
          {#each identifiableWriters as writer}
            <button class="picker-item" on:click={() => handleWriterSelect(writer)}>
              {writer.name}
            </button>
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
          <svelte:fragment>
            {#each categories as category}
              <button class="picker-item" on:click={() => handleCategorySelect(category)}>
                {category.name}
              </button>
            {/each}
          </svelte:fragment>
        </DropdownMenu>

          <!-- Dropdown for selecting category -->
          <DropdownMenu 
          id={`status-dropdown-${article.id}`}
          selectedOption={article.status}
        >
          <span class="label" slot="button">
            {selectedStatus ? selectedStatus.name : 'Select a status'}
          </span>
          <svelte:fragment>
            {#each statuses as status}
              <button class="picker-item" on:click={() => handleStatusSelect(status)}>
                {status.name}
              </button>
            {/each}
          </svelte:fragment>
        </DropdownMenu>
    
        <OpenArticleButton articleId={article.id} />


      </div>
    
      <div class="stack" style="--direction: row;">
        <Label name="Semrush Score">
          <NumericInput
            bind:value={article.semrush_score}
            on:update={(e) => updateSemrushScore(e.detail.value)}
   
          />
        </Label>
        
        <Label name="Word Count">
          <NumericTarget
            target={article.target_word_count} 
            current={article.word_count} 
            on:update={(e) => updateTargetWordCount(e.detail.value)}
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
    <Keywords main_keyword={article.expand?.main_keyword} keywords={article.expand?.keywords} article_id={article.id} />
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
