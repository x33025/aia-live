<script lang="ts">
  import {DropdownMenu} from '@x33025/components';


  import { NumericTarget } from '@x33025/components';


  import { type Article, type Category, type Status, type User, toIdentifiableUser, type IdentifiableUser, type Website } from '$lib/types';
  import Keywords from '../keyword/+keywords.svelte';

  import MainImage from '../images/display/+main-image.svelte';
  import NotesButton from '../notes/+notes-button.svelte';
  import OpenArticleButton from '$lib/components/actions/+open-article-button.svelte';
  import { updateArticle } from '$lib/api/article/+update-article';
  import { debounce } from 'lodash-es';


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

  function handleTitleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTitle = input.value;
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
        <input
        type="text"
          class="article-row-title"
          value={article.title}
          on:input={handleTitleChange}
          placeholder="Title"

        />
        

        <!-- Dropdown for selecting writer -->
        <DropdownMenu 
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
        <div>
          {"Semrush Score"}
          <!-- <input
            type="number"
            bind:value={article.semrush_score}
            on:input={(e) => updateSemrushScore((e.target as HTMLInputElement).value)}
   
          /> -->
        </div>
        
        <div >
          {"Word Count"}
          <NumericTarget
            target={article.target_word_count} 
            current={article.word_count} 
            on:update={(e) => updateTargetWordCount(e.detail.value)}
          />
        </div>
        <div>
          {"Notes"}
          <NotesButton
            notes={article.expand?.notes}
            activity={article.expand?.activity}
            parent={article}
            parent_collection="articles"
      />
        </div>
       
      </div>
    
    </div>
    
  </div>
  <div>
    {"Keywords"}
    <Keywords main_keyword={article.expand?.main_keyword} keywords={article.expand?.keywords} article_id={article.id} />
  </div>
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

