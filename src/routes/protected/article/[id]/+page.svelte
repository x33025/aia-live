<script lang="ts">
  import { onMount } from 'svelte';
  import type { Article } from '$lib/utils/interfaces/+article';
  import { initializeArticle } from '$lib/utils/config/+article';
  import BodyView from './body/+page.svelte';
  import DataView from './data/+page.svelte';
  import QuickLookView from './quick-look/+page.svelte';
  import DescriptionView from './description/+page.svelte';
  import NavBar from './navigation-bar/+page.svelte';
  import Modal from '$lib/components/+modal.svelte';

  export let data: { article?: Article };

  onMount(() => {
    initializeArticle(data);
  });
</script>

<main class="container">
  <NavBar />
  <div class="content">
    <div class="column left-column">
      <DataView />
    </div>
    <div class="column center-column">
      <BodyView />
    </div>
    <div class="column right-column">
      <div class="half-height">
        <QuickLookView />
      </div>
      <div class="half-height">
        <DescriptionView />
      </div>
    </div>
  </div>
  <Modal />
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    background-color: var(--gray-1);
  }

  .content {
    display: flex;
    flex: 1;
    gap: 1em;
    padding: 0 1em;
    overflow: hidden;
    justify-content: center;
  }

  .column {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 1em;
  }

  .left-column, .right-column {
    flex: 1;
    height: 100%;
    max-width: 30%;
    min-width: 200px;
    box-sizing: border-box;
  }

  .center-column {
    flex: 2;
    height: 100%;
    max-width: 40%;
    min-width: 300px;
    box-sizing: border-box;
  }

  .half-height {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .column {
      flex: none;
      max-width: none;
      min-width: 0;
    }

    .left-column, .center-column, .right-column {
      padding: 1em;
    }

    .center-column {
      width: auto;
    }
  }
</style>
