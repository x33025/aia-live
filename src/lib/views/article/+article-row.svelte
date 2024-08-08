<script lang="ts">
  import Picker from '$lib/components/actions/+dropdown-menu.svelte';
  import Title from './+title.svelte';
  import Keywords from './+keywords.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';

  type MenuItem = { id: any; label: string };

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

  function handleWriterSelect(event: CustomEvent<MenuItem | null>) {
    selectedWriterId = event.detail ? event.detail.id : null;
  }

  function handleCategorySelect(event: CustomEvent<MenuItem | null>) {
    selectedCategoryId = event.detail ? event.detail.id : null;
  }

  function handleStatusSelect(event: CustomEvent<MenuItem | null>) {
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
</script>

<Stack direction={Direction.Column} spacing={0.5}>
  <Stack direction={Direction.Row} className="direction-row" spacing={0.5}>
    <Title {article} />
    <Picker 
      options={writerOptions}
      selection={writerOptions.find(option => option.id === selectedWriterId) || null}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemsDisplayed={3}
    >
  
    </Picker>
    <Picker 
      options={categoryOptions}
      selection={categoryOptions.find(option => option.id === selectedCategoryId) || null}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemsDisplayed={3}
    >
    </Picker>
    <Picker 
      options={statusOptions}
      selection={statusOptions.find(option => option.id === selectedStatusId) || null}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemsDisplayed={3}
    >
    </Picker>
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
  </Stack>
  
  <Keywords keywords={article.keywords} mainKeywordId={article.main_keyword_id} />
</Stack>
