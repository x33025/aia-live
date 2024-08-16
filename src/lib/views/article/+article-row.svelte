<script lang="ts">
  import DropdownPicker from '$lib/components/actions/+dropdown-picker.svelte'; // Updated import
  import Input from '$lib/components/actions/+input.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType, type Article, type Category, type Identifiable, type Status, type User } from '$lib/types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
    import Button from '$lib/components/actions/+button.svelte';

  export let article: Article;
  export let categories: Category[];
  export let statuses: Status[];


  $: selectedCategory = article.category ? categories.find(category => category === article.category) : null;
  $: selectedStatus = article.status ? statuses.find(status => status === article.status) : null;


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


<Stack spacing={0.5} wrap={false}>
  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <Input
      className="title"
      bind:value={article.title}
      placeholder="Title"
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
    <Button on:click={openArticle}>Open Article</Button>
  </Stack>
</Stack>

<style>
  .article-row {
    border: 1px solid #ddd;
    padding: 1em;
    border-radius: 0.5em;
    background-color: #f9f9f9;
  }

  :global(.title) {
    background-color: var(--yellow);
    border-radius: 0.5em;
    padding: 0.5em;
    max-width: 300px; /* Set max-width */
  }

  /* Adjust spacing */
  .divider {
    height: 1px;
    background-color: #ddd;
    margin: 1em 0;
  }
</style>
