<script lang="ts">
  import DropdownPicker from '$lib/components/actions/+dropdown-picker.svelte'; // Updated import
  import Input from '$lib/components/actions/+input.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType, type Article, type Category, type Identifiable, type Status, type User, type IdentifiableUser, toIdentifiableUser } from '$lib/types';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/actions/+button.svelte';

  export let article: Article;
  export let categories: Category[];
  export let statuses: Status[];
  export let writers: User[];

  // Convert writers to IdentifiableUser array
  const identifiableWriters = writers.map(toIdentifiableUser);

  $: selectedCategory = article.category ? categories.find(category => category === article.category) : null;
  $: selectedStatus = article.status ? statuses.find(status => status === article.status) : null;

  // Check if article.author is a User object and then convert to IdentifiableUser
  $: selectedWriter = (typeof article.author === 'object' && article.author !== null) ? toIdentifiableUser(article.author) : null;

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
      className="article-title"
      bind:value={article.title}
      placeholder="Title"
      fullWidth={true}
    />
    <DropdownPicker 
      options={identifiableWriters}
      selection={selectedWriter}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemsDisplayed={3}
    />
    <DropdownPicker 
      options={categories}
      selection={selectedCategory}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemsDisplayed={3}
    />
    <DropdownPicker 
      options={statuses}
      selection={selectedStatus}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemsDisplayed={3}
    />
    <Button on:click={openArticle} className="open-article-button">Open Article</Button>
  </Stack>

  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <NumericInput
      value={article.semrush_score} 
      on:update={(event) => updateSemrushScore(event.detail.value)}
    />
    <NumericTarget
      target={article.target_word_count} 
      current={0} 
      update={updateTargetWordCount}
    />
  </Stack>
</Stack>


<style>

  :global(.article-title) {
    background-color: rgba(var(--yellow-rgb), 0.4);
    border-radius: 0.5em;
    padding: 0.5em;
    width: 100%; /* Set max-width */
  }

  :global(.open-article-button) {
    background-color: var(--blue);
    padding: 0.5em;
    border-radius: 0.5em;
  
  }

</style>
