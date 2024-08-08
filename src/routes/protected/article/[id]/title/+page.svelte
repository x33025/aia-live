<script lang="ts">
  import { onDestroy } from 'svelte';
  import { article } from '$lib/stores/+article';
  import { generateTitlePromise } from '$lib/api/+promises';
  import { patchArticle } from '$lib/api/+article';
  import { generateTitle } from '$lib/api/gpt/+title';
  import Spinner from '$lib/components/+spinner.svelte';
  import GenerateButton from '$lib/components/+generate-button.svelte';
  import { get } from 'svelte/store';
  import type { Article } from '$lib/utils/interfaces/+article';

  let titleMain: string = '';
  let hasTitle: boolean = false;
  let lintedContent: string = '';
  let promise: Promise<any> | null = get(generateTitlePromise);
  let articleId: string = '';
  let wordCount: number = 0;
  let isButtonEnabled: boolean = false;

  const unsubscribeArticle = article.subscribe((data) => {
    if (data.title) {
      titleMain = data.title.main ?? '';
      hasTitle = !!data.title.main;
    }
    articleId = data.article_id;
    lintedContent = data.content ?? '';
  });

  const unsubscribePromise = generateTitlePromise.subscribe(value => {
    promise = value;
  });

  onDestroy(() => {
    unsubscribeArticle();
    unsubscribePromise();
  });

  $: wordCount = lintedContent.split(/\s+/).filter(word => word.length > 0).length;
  $: isButtonEnabled = wordCount >= 300;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    titleMain = target.value;
    hasTitle = !!titleMain;
    updateArticleTitleInStore();
  }

  function updateArticleTitleInStore() {
    article.update(current => {
      if (!current.title) {
        current.title = { main: '', alternatives: { alternative_1: null, alternative_2: null, alternative_3: null } };
      }
      return {
        ...current,
        title: {
          ...current.title,
          main: titleMain
        }
      };
    });
  }

  async function generateTitleHandler() {
    const currentArticle: Article = get(article);
    const prompt = 'Generate a new title for the article.';
    const content = currentArticle.content;

    if (!content) {
      console.error('Article content is empty.');
      return;
    }

    console.log('Generating title with prompt:', prompt);
    console.log('Article content:', content);

    const newPromise: Promise<any> = (async () => {
      let result;
      try {
        result = await generateTitle(prompt, content);
        if (result && result.main) {
          titleMain = result.main;
          updateArticleTitleInStore();
        }
      } catch (error) {
        console.error('Error generating title:', error);
        throw error;
      }

      try {
        if (result && result.main) {
          const updatedArticle = {
            article_id: articleId,
            title: {
              main: titleMain,
              alternatives: result.alternatives
            }
          };
          console.log('Patching Article', updatedArticle);
          await patchArticle(updatedArticle);
        }
      } catch (error) {
        console.error('Error patching article:', error);
        throw error;
      }
    })();

    generateTitlePromise.set(newPromise);
    promise = newPromise;

    try {
      await newPromise;
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<div class="title-container">
  <div class="input-wrapper">
    <input
      type="text"
      id="title-main"
      bind:value={titleMain}
      on:input={handleInput}
      placeholder="Title"
      required
    />
    <div class="generate-button-wrapper">
      {#if promise}
        <Spinner {promise} color="#07d" />
      {/if}
      <GenerateButton on:click={generateTitleHandler} isDisabled={!isButtonEnabled} />
    </div>
  </div>
</div>

<style>
  .title-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  input {
    padding: 1em;
    border: none;
    width: 100%;
    font-size: 1em;
    box-sizing: border-box;
    background-color: white;
    border-radius: 1em;
    outline: none;
    color: black;
  }

  input::-webkit-scrollbar {
    height: 0.5em;
  }

  input::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.25em;
  }

  .generate-button-wrapper {
    position: absolute;
    right: -3em;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.5em;
    z-index: 1;
    border-radius: 50%;
    padding: 0.5em;
    box-sizing: border-box;
  }

  .generate-button-wrapper :global(button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
