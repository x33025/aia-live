<script lang="ts">
  import type { User, Category, Status } from '@prisma/client';

  import CustomDropdown from '$lib/components/actions/+dropdown.svelte';
  import Title from './+title.svelte';
  import Keywords from './+keywords.svelte';

  export let article: ArticleMetadataWithRelated;
  export let writerList: User[] = [];
  export let categoryList: Category[] = [];
  export let statusList: Status[] = [];

  let selectedWriterId: string | null = article.author_id ?? null;
  let selectedCategoryId: string | null = article.category_id ?? null;
  let selectedStatusId: string | null = article.status_id ?? null;

  function handleWriterSelect(event: CustomEvent<string | number>) {
    selectedWriterId = event.detail as string;
  }

  function handleCategorySelect(event: CustomEvent<string | number>) {
    selectedCategoryId = event.detail as string;
  }

  function handleStatusSelect(event: CustomEvent<string | number>) {
    selectedStatusId = event.detail as string;
  }

  const writerOptions: DropdownOption[] = writerList.map(writer => ({ id: writer.id, name: writer.name }));
  const categoryOptions: DropdownOption[] = categoryList.map(category => ({ id: category.id, name: category.name }));
  const statusOptions: DropdownOption[] = statusList.map(status => ({ id: status.id, name: status.status }));
</script>

<div class="vstack">
  <div class="hstack">
    <Title {article} />
    <CustomDropdown 
      options={writerOptions}
      selectedOptionId={selectedWriterId}
      placeholder="Select a writer" 
      on:select={handleWriterSelect}
      menuWidth={150}
      buttonHeight={50}
      maxItemDisplayed={3}
      dropdownId="writer-dropdown"
    />
    <CustomDropdown 
      options={categoryOptions}
      selectedOptionId={selectedCategoryId}
      placeholder="Select a category" 
      on:select={handleCategorySelect}
      menuWidth={150}
      buttonHeight={50}
      maxItemDisplayed={3}
      dropdownId="category-dropdown"
    />
    <CustomDropdown 
      options={statusOptions}
      selectedOptionId={selectedStatusId}
      placeholder="Select a status" 
      on:select={handleStatusSelect}
      menuWidth={150}
      buttonHeight={50}
      maxItemDisplayed={3}
      dropdownId="status-dropdown"
    />
  </div>
  <Keywords keywords={article.keywords} mainKeywordId={article.main_keyword_id} />
</div>

<style>
  .vstack {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    background-color: #fff;
    width: 100%;
  }

  .hstack {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    width: 100%;
  }
</style>
