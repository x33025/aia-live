<script lang="ts">
  import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, type Article, type Category, type Status, type User, toIdentifiableUser, type IdentifiableUser } from '$lib/types';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/actions/+button.svelte';
  import Keywords from './+keywords.svelte';

  export let article: Article;
  export let categories: Category[];
  export let statuses: Status[];
  export let writers: User[];

  // Convert writers to IdentifiableUser array
  const identifiableWriters = writers.map(toIdentifiableUser);

  $: selectedCategory = article.category ? categories.find(c => c.id === article.category) : null;
  $: selectedStatus = article.status ? statuses.find(c => c.id === article.status) : null;
  $: selectedWriter = (typeof article.author === 'object' && article.author !== null) ? toIdentifiableUser(article.author) : null;


  function handleTitleChange(event: CustomEvent<string>) {
    const newTitle = event.detail;
    dispatch('update', { field: 'title', value: newTitle });
  }

  function handleWriterSelect(event: CustomEvent<IdentifiableUser | null>) {
    selectedWriter = event.detail;
  }

  function handleCategorySelect(event: CustomEvent<Category | null>) {
    selectedCategory = event.detail;
  }

  function handleStatusSelect(event: CustomEvent<Status | null>) {
    selectedStatus = event.detail;
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
</script>

<Stack spacing={0.5} wrap={true}>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <Input
      className="article-row-title"
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

    <!-- Dropdown for selecting status -->
    <DropdownMenu 
      id={`status-dropdown-${article.id}`}
      selectedOption={selectedStatus?.id}
    >
      <span class="label width" slot="button">
        {selectedStatus ? selectedStatus.name : 'Select a status'}
      </span>
      <svelte:fragment slot="default" let:selectOption>
        {#each statuses as status}
          <p class="picker-item" on:click={() => { selectOption(status.id); handleStatusSelect(status); }}>
            {status.name}
          </p>
        {/each}
      </svelte:fragment>
    </DropdownMenu>

    <Button on:click={openArticle} className="open-article-button">Open Article</Button>
  </Stack>

  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <Keywords main_keyword={article.expand.main_keyword} keywords={article.expand.keywords}/>

    

    <NumericInput
      value={article.semrush_score} 
      on:update={(event) => updateSemrushScore(event.detail.value)}
    />
    
    <NumericTarget
      target={article.target_word_count} 
      current={article.word_count} 
      update={updateTargetWordCount}
    />
  </Stack>
  
</Stack>

<style>
  :global(.article-row-title) {
    background-color: rgba(var(--yellow-rgb), 0.4);
    border-radius: 0.5em;
    padding: 0.5em;
    width: 100%;
  }

  :global(.open-article-button) {
    background-color: var(--blue);
    padding: 0.5em;
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
