<!-- <script lang="ts">
  import { article } from '$lib/stores/+article';
  import { extractDataFromSource } from '$lib/api/gpt/+extractor';
  import { extractionPromise } from '$lib/api/+promises';
  import { onDestroy } from 'svelte';
  import { closeModal } from '$lib/stores/+source-modal';
  import type { Article } from '$lib/utils/interfaces/+article';
  import { v4 as uuidv4 } from 'uuid';

  let currentArticle: Article;

  const unsubscribe = article.subscribe((value: Article) => {
    currentArticle = value;
    console.log('Current article updated:', currentArticle);
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function extractData() {
    if (!currentArticle.source || !currentArticle.source.trim()) {
      alert('Source text is empty.');
      return;
    }

    const sourceText = currentArticle.source.trim();

    const wordCount = sourceText.split(/\s+/).length;
    if (wordCount < 150) {
      alert('The input must be at least 500 words.');
      return;
    }

    closeModal();

    const promise: Promise<any> = (async () => {
      try {
        const { extractedData, additionalText } = await extractDataFromSource(sourceText);
        console.log('Processed data:', { extractedData, additionalText });
        console.log('Additional Text:', additionalText); // Log the additional text

        // Ensure extractedData is an array and has the expected structure
        const formattedExtractedData = Array.isArray(extractedData) ? extractedData : [extractedData];
        const structuredData = formattedExtractedData.map(data => ({
          raw_data_id: uuidv4(),  // Ensure each item has a unique ID
          json_data: data  // Wrap the data in json_data
        }));
        console.log('Structured Data:', structuredData);

        article.update((current) => {
          const updatedRawData = [...current.raw_data, ...structuredData];
          console.log('Updated Raw Data:', updatedRawData); // Debug log

          return {
            ...current,
            raw_data: updatedRawData
          };
        });

      } catch (error) {
        console.error('Error during data extraction:', error);
        throw error;
      }
    })();

    extractionPromise.set(promise);
  }
</script>

<button type="button" on:click={extractData} class="extract-button">Extract</button>

<style>
  .extract-button {
    background: var(--blue);
    border: none;
    color: white;
    font-size: 1em;
    cursor: pointer;
    padding: 0.75em;
    border-radius: 0.5em;
  }
</style> -->
