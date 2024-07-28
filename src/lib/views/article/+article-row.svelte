<script lang="ts">
  import type { ArticleMetadata, User, Category, Status, Keyword } from '@prisma/client';
  import CustomDropdown from './+dropdown.svelte';
  import Title from './+title.svelte';
  import Keywords from './+keywords.svelte';

  export let article: ArticleMetadata;
  export let writerList: User[] = [];
  export let categoryList: Category[] = [];
  export let statusList: Status[] = [];

  interface WriterSelectEvent extends CustomEvent {
    detail: string;
  }

  function handleWriterSelect(event: WriterSelectEvent) {
    const selectedWriterId = event.detail;
    console.log('Selected writer ID:', selectedWriterId);
  }

  interface CategorySelectEvent extends CustomEvent {
    detail: string;
  }

  function handleCategorySelect(event: CategorySelectEvent) {
    const selectedCategoryId = event.detail;
    console.log('Selected category ID:', selectedCategoryId);
  }

  interface StatusSelectEvent extends CustomEvent {
    detail: string;
  }

  function handleStatusSelect(event: StatusSelectEvent) {
    const selectedStatusId = event.detail;
    console.log('Selected status ID:', selectedStatusId);
  }
</script>

<div class="vstack">
  <div class="hstack">
    <Title {article} />
    <CustomDropdown 
      items={writerList.map(writer => ({ id: writer.id, name: writer.name ?? 'Unnamed Writer' }))}
      placeholder="Writer"
      fallbackName="Unnamed"
      on:select={handleWriterSelect} 
    />
    <CustomDropdown 
      items={categoryList.map(category => ({ id: category.id, name: category.name ?? 'Unnamed Category' }))}
      placeholder="Category"
      fallbackName="Unnamed"
      on:select={handleCategorySelect} 
    />
    <CustomDropdown 
      items={statusList.map(status => ({ id: status.id, name: status.status ?? 'Unnamed Status' }))}
      placeholder="Status"
      fallbackName="Unnamed"
      on:select={handleStatusSelect} 
    />
  </div>
  <!-- <Keywords keywords={article.keywords ?? []} articleMetadataId={String(article.id)} /> -->
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
