<script lang="ts">
  import DropdownPicker from '$lib/components/actions/+dropdown-picker.svelte'; // Updated import
  import Input from '$lib/components/actions/+input.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType, type Article, type Category, type Identifiable, type Status, type User } from '$lib/types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let article: Article;
  export let writers: User[];
  export let categories: Category[];
  export let statuses: Status[];

  // These now store the entire object (User, Category, Status) instead of just IDs
  $: selectedWriter = article.author ? writers.find(writer => writer === article.author) : null;
  $: selectedCategory = article.category ? categories.find(category => category === article.category) : null;
  $: selectedStatus = article.status ? statuses.find(status => status === article.status) : null;

  // Update the entire object on selection
  function handleWriterSelect(event: CustomEvent<User | null>) {
    selectedWriter = event.detail;
  }

  function handleCategorySelect(event: CustomEvent<Identifiable | null>) {
    selectedCategory = event.detail;
  }

  function handleStatusSelect(event: CustomEvent<Identifiable | null>) {
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

<Stack spacing={0.25} className="article-row">
  <Stack direction={Direction.Horizontal} className="direction-row" spacing={0.25}>
    <Input
      className="title"
      bind:value={article.title}
      placeholder="Title"
    />
    <DropdownPicker 
      options={$page.data.writers}
      selection={selectedWriter}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemsDisplayed={3}
    />
    <DropdownPicker 
      options={$page.data.categories}
      selection={selectedCategory}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemsDisplayed={3}
    />
    <DropdownPicker 
      options={$page.data.statuses}
      selection={selectedStatus}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemsDisplayed={3}
    />
  </Stack>

  <Stack direction={Direction.Horizontal} spacing={0.25}>
    <NumericInput
      value={article.semrush_score} 
      on:update={(event) => updateSemrushScore(event.detail.value)}
    />
    <NumericTarget
      target={article.target_word_count} 
      current={0} 
      update={updateTargetWordCount}
    />
    <button on:click={openArticle} class="open-article-button">
      Open Article
    </button>
  </Stack>
</Stack>

<style>
  :global(.article-row) {
    background-color: red;
    padding: 0.25em;
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  :global(.title) {
    background-color: var(--yellow);
    border-radius: 0.5em;
    padding: 0.5em;
  }

  :global(.direction-row) {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  :global(.open-article-button) {
    background-color: #6c757d;
    border: none;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.5em;
    cursor: pointer;
  }

  :global(.open-article-button:hover) {
    background-color: #5a6268;
  }
</style>
