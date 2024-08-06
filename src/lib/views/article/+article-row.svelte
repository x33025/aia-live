<!-- src/routes/example.svelte -->
<script lang="ts">
  import CustomDropdown from '$lib/components/actions/+picker.svelte';
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

  $: writerOptions = writers.map((writer) => ({ id: writer.id, name: writer.name }));
  $: categoryOptions = categories.map((category) => ({ id: category.id, name: category.name }));
  $: statusOptions = statuses.map((status) => ({ id: status.id, name: status.name }));

  function handleWriterSelect(event: CustomEvent<string | number>) {
    selectedWriterId = event.detail as string;
  }

  function handleCategorySelect(event: CustomEvent<string | number>) {
    selectedCategoryId = event.detail as string;
  }

  function handleStatusSelect(event: CustomEvent<string | number>) {
    selectedStatusId = event.detail as string;
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
    <CustomDropdown 
      options={writerOptions}
      selectedOptionId={selectedWriterId}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      maxItemDisplayed={3}
      dropdownId="writer-dropdown"
    />
    <CustomDropdown 
      options={categoryOptions}
      selectedOptionId={selectedCategoryId}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      maxItemDisplayed={3}
      dropdownId="category-dropdown"
    />
    <CustomDropdown 
      options={statusOptions}
      selectedOptionId={selectedStatusId}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      maxItemDisplayed={3}
      dropdownId="status-dropdown"
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
