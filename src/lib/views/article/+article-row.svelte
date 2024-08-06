<script lang="ts">
  import Picker from '$lib/components/actions/picker/+picker.svelte';
  import Title from './+title.svelte';
  import Keywords from './+keywords.svelte';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import NumericTarget from '$lib/components/advanced-input/+numeric-target.svelte';
  import VStack from '$lib/components/layout/+v-stack.svelte';
  import HStack from '$lib/components/layout/+h-stack.svelte';

  export let article: ArticleMetadataWithRelations;
  export let writers: User[];
  export let categories: Category[];
  export let statuses: Status[];

  $: selectedWriterId = article.author_id ?? null;
  $: selectedCategoryId = article.category_id ?? null;
  $: selectedStatusId = article.status_id ?? null;

  $: writerOptions = writers.map((writer) => ({ id: writer.id, label: writer.name }));
  $: categoryOptions = categories.map((category) => ({ id: category.id, label: category.name }));
  $: statusOptions = statuses.map((status) => ({ id: status.id, label: status.name }));

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

<VStack spacing={0.5}>
  <HStack spacing={0.5}>
    <Title {article} />
    <Picker 
      options={writerOptions}
      selectedOption={writerOptions.find(option => option.id === selectedWriterId) || null}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemDisplayed={3}
    />
    <Picker 
      options={categoryOptions}
      selectedOption={categoryOptions.find(option => option.id === selectedCategoryId) || null}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemDisplayed={3}
    />
    <Picker 
      options={statusOptions}
      selectedOption={statusOptions.find(option => option.id === selectedStatusId) || null}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemDisplayed={3}
    />
  </HStack>

  <HStack spacing={0.5}>
    <NumericInput
      value={article.semrush_score} 
      on:update={(event) => updateSemrushScore(event.detail.value)}
    />
    <NumericTarget
      target={article.target_word_count} 
      current={0} 
      update={updateTargetWordCount}
    />
  </HStack>
  <Keywords keywords={article.keywords} mainKeywordId={article.main_keyword_id} />
</VStack>
