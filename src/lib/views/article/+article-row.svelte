<script lang="ts">
  import Picker from '$lib/components/actions/+dropdown-menu.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import { goto } from '$app/navigation';

  export let article: ArticleMetadataWithRelations;
  export let writers: User[];
  export let categories: Category[];
  export let statuses: Status[];

  $: selectedWriterId = article.author_id ?? null;
  $: selectedCategoryId = article.category_id ?? null;
  $: selectedStatusId = article.status_id ?? null;

  $: writerOptions = writers.map((writer) => ({ id: writer.id, name: writer.name }));
  $: categoryOptions = categories.map((category) => ({ id: category.id, name: category.name }));
  $: statusOptions = statuses.map((status) => ({ id: status.id, name: status.name }));

  function handleWriterSelect(event: CustomEvent<Identifiable | null>) {
    selectedWriterId = event.detail ? event.detail.id : null;
  }

  function handleCategorySelect(event: CustomEvent<Identifiable | null>) {
    selectedCategoryId = event.detail ? event.detail.id : null;
  }

  function handleStatusSelect(event: CustomEvent<Identifiable | null>) {
    selectedStatusId = event.detail ? event.detail.id : null;
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
    if (article.article_id) {
      goto(`/protected/article/${article.article_id}`);
    } else {
      console.warn('Article ID is missing');
    }
  }
</script>

<Stack direction={Direction.Column} spacing={0.5}>
  <Stack direction={Direction.Row} className="direction-row" spacing={0.5}>
    <Input
      type={TextType.Body}
      className="title"
      bind:value={article.title}
      placeholder="Title"
    />
    <Picker 
      options={writerOptions}
      selection={writerOptions.find(option => option.id === selectedWriterId) || null}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemsDisplayed={3}
    />
    <Picker 
      options={categoryOptions}
      selection={categoryOptions.find(option => option.id === selectedCategoryId) || null}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemsDisplayed={3}
    />
    <Picker 
      options={statusOptions}
      selection={statusOptions.find(option => option.id === selectedStatusId) || null}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemsDisplayed={3}
    />
  </Stack>

  <Stack direction={Direction.Row} spacing={0.5}>
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
  :global(.title) {
    background-color: #ffecb3;
    border-radius: 0.5em;
    padding: 0.5em;
    flex: 1;
    display: block;
    width: 100%;
  }
</style>
