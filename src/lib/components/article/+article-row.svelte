<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import DropdownMenu from '$lib/core-components/actions/+dropdown-menu.svelte';
  import TextInput from '$lib/core-components/actions/+text-input.svelte';
  import NumericInput from '$lib/core-components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/core-components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/core-components/layout/+stack.svelte';
  import { Direction, type Article, type Category, type Status, type User, toIdentifiableUser, type IdentifiableUser, Alignment, type Website } from '$lib/types';
  import { goto } from '$app/navigation';
  import Button from '$lib/core-components/actions/+button.svelte';
  import Keywords from '../keyword/+keywords.svelte';
  import Label from '$lib/core-components/display/+label.svelte';
  import Spacer from '$lib/core-components/layout/+spacer.svelte';
  import MainImage from '../images/+main-image.svelte';
  import NotesSidebar from '../notes/+notes-sidebar.svelte';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
    import NotesButton from '../notes/+notes-button.svelte';

  export let article: Article;
  export let categories: Category[];
  export let writers: User[];

  // Convert writers to IdentifiableUser array
  const identifiableWriters = writers.map(toIdentifiableUser);

  const dispatch = createEventDispatcher();

  $: selectedCategory = article.category ? categories.find(c => c.id === article.category) : null;
  $: selectedWriter = (typeof article.author === 'object' && article.author !== null) ? toIdentifiableUser(article.author) : null;


  function handleTitleChange(event: CustomEvent<string>) {
    const newTitle = event.detail;
    dispatch('update', { field: 'title', value: newTitle });
  }

  function handleWriterSelect(writer: IdentifiableUser | null) {
    selectedWriter = writer;
  }

  function handleCategorySelect(category: Category | null) {
    selectedCategory = category;
  }

  function updateSemrushScore(value: number) {
    console.log(`Updating semrush_score to ${value}`);
    // Implement actual update logic here, e.g., making a request to your backend.
  }

  function updateTargetWordCount(value: number) {
    console.log(`Updating target_word_count to ${value}`);
    // Implement actual update logic here, e.g., making a request to your backend.
  }



  function openArticle() {
    if (article.id) {
      goto(`/protected/article/${article.id}`);
    } else {
      console.warn('Article ID is missing');
    }
  }

  function openNotesSidebar() {
    const notes = article.expand?.notes || [];  // Default to an empty array if notes are undefined
    openSidebar(NotesSidebar, { notes });
  }
</script>

<Stack wrap={true} spacing={0.5}>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <MainImage main_image={article.expand?.main_image} />
    <Stack spacing={0.5}>
      <Stack direction={Direction.Horizontal} spacing={0.5}>
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
          <svelte:fragment slot="default" let:selectOption>
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
    
        <Button on:click={openArticle} class="open-article-button">Open Article</Button>
      </Stack>
    
      <Stack direction={Direction.Horizontal} spacing={0.5}>
        <Label name="Semrush Score" class="border-highlight">
          <NumericInput
            value={article.semrush_score} 
            on:update={(event) => updateSemrushScore(event.detail.value)}
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
      />
        </Label>
       
      </Stack>
    
    </Stack>
  </Stack>
  <Label name="Keywords">
    <Keywords main_keyword={article.expand?.main_keyword} keywords={article.expand?.keywords} />
  </Label>
</Stack>

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
   }
   .picker-item:hover {
     background-color: var(--gray-1);
   }
</style>
