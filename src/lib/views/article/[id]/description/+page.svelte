<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import { article } from '$lib/stores/+article';
  import { generateDescriptionPromise } from '$lib/api/+promises';
  import { patchArticle } from '$lib/api/+article';
  import { generateDescription } from '$lib/api/gpt/+descriptor'; // Import the correct function
  import { get, writable } from 'svelte/store';
  import type { Article, ArticleUpdateData } from '$lib/utils/interfaces/+article';
  import { joinRoom, leaveRoom,  socket } from '$lib/websocket';
  import AtSignIcon from '$lib/icons/+at.svelte';

  const descriptionMain = writable<string>('');
  let hasDescription: boolean = false;
  let promise: Promise<any> | null = get(generateDescriptionPromise);
  let articleId: string = '';

  const unsubscribeArticle = article.subscribe((data) => {
    if (data.description?.main) {
      descriptionMain.set(data.description.main ?? '');
      hasDescription = !!data.description.main;
    }
    articleId = data.article_id;
    joinRoom(`article_${articleId}`);
  });

  const unsubscribePromise = generateDescriptionPromise.subscribe(value => {
    promise = value;
  });

  onDestroy(() => {
    unsubscribeArticle();
    unsubscribePromise();
    leaveRoom(`article_${articleId}`);
  });

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    descriptionMain.set(target.value);
    hasDescription = !!target.value;
    updateArticleDescriptionInStore(target.value);
  }

  function updateArticleDescriptionInStore(newDescriptionMain: string) {
    article.update(current => {
      if (!current.description) {
        current.description = { main: '', alternatives: { alternative_1: null, alternative_2: null, alternative_3: null } };
      }
      return {
        ...current,
        description: {
          ...current.description,
          main: newDescriptionMain,
          alternatives: current.description.alternatives ?? { alternative_1: null, alternative_2: null, alternative_3: null }
        }
      };
    });

    const updateData: ArticleUpdateData = {
      article_id: articleId,
      updates: {
        description: {
          main: newDescriptionMain,
          alternatives: { alternative_1: null, alternative_2: null, alternative_3: null }
        }
      },
      room: `article_${articleId}`
    };
    //updateArticle(updateData);
  }

  async function generateDescriptionHandler() {
    const currentArticle: Article = get(article);
    const prompt = 'Generate a new meta description for the article.';
    const content = currentArticle.content;

    if (!content) {
      console.error('Article content is empty.');
      return;
    }

    const newPromise: Promise<any> = (async () => {
      try {
        const result = await generateDescription(prompt, content);
        if (result && result.mainDescription) {
          descriptionMain.set(result.mainDescription);
          updateArticleDescriptionInStore(result.mainDescription);
          await patchArticle({
            article_id: articleId,
            description: {
              main: result.mainDescription,
              alternatives: result.alternatives ?? { alternative_1: null, alternative_2: null, alternative_3: null }
            }
          }); // Update description in MySQL
        }
      } catch (error) {
        console.error('Error generating description:', error);
        throw error;
      }
    })();

    generateDescriptionPromise.set(newPromise);
    promise = newPromise;

    try {
      await newPromise;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // New button logic
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-bottom: 1em;
  }

  .textarea-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }

  textarea {
    padding: 1em;
    border-radius: 1em;
    width: 100%;
    height: 100%;
    font-size: 1em;
    box-sizing: border-box;
    background-color: white;
    border: none;
    overflow: auto;
    resize: none;
    flex-grow: 1;
  }

  textarea:focus {
    border: none;
  }

  #description-main:focus {
    outline: none;
  }

  .button {
    background-color: var(--blue);
    border: none;
    padding: 1em;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    position: absolute;
    right: 1em;
    top: 1em;
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    transform: translateY(-0.001em); /* Adjust the value to push the icon up */
  }

  .textarea-wrapper:hover .button {
    opacity: 1;
  }
</style>

<div class="container">
  <div class="textarea-wrapper">
    <textarea
      id="description-main"
      placeholder="Meta Description"
      bind:value={$descriptionMain}
      on:input={handleInput}
      required
    ></textarea>
    <button class="button" on:click={handleClick}>
      <div class="icon">
        <AtSignIcon size="1rem" color="#ffffff" />
      </div>
    </button>
  </div>
</div>
