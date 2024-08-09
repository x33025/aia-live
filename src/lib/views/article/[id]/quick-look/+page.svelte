<!-- <script lang="ts">
  import { onDestroy } from 'svelte';

  let bulletPoints: [string, string, string, string, string, string] = ['', '', '', '', '', ''];
  let displayedBulletPoints: [string, string, string] = ['', '', ''];
  let articleContent: string = '';
  let isGenerating: boolean = false;

  function initializeBulletPoints(bulletPoints: (string | null)[]): [string, string, string, string, string, string] {
    return bulletPoints.map(point => point || '') as [string, string, string, string, string, string];
  }

  function getDisplayedBulletPoints(bulletPoints: [string, string, string, string, string, string]): [string, string, string] {
    return bulletPoints.slice(0, 3) as [string, string, string];
  }

  const unsubscribeArticle = article.subscribe((value: Article) => {
    bulletPoints = initializeBulletPoints(value?.quick_look?.bullet_points || ['', '', '', '', '', '']);
    displayedBulletPoints = getDisplayedBulletPoints(bulletPoints);
    articleContent = value?.content || '';
  });

  onDestroy(() => {
    unsubscribeArticle();
  });

  function updateBulletPoint(index: number, newValue: string) {
    article.update((current: Article) => {
      const newBulletPoints = initializeBulletPoints(current.quick_look?.bullet_points || ['', '', '', '', '', '']);
      newBulletPoints[index] = newValue;
      displayedBulletPoints = getDisplayedBulletPoints(newBulletPoints);
      return {
        ...current,
        quick_look: {
          bullet_points: newBulletPoints
        }
      };
    });
  }

  function formatExtractedData(extractedData: any): [string, string, string, string, string, string] {
    return [
      extractedData.bullet_point_1 || '',
      extractedData.bullet_point_2 || '',
      extractedData.bullet_point_3 || '',
      extractedData.bullet_point_4 || '',
      extractedData.bullet_point_5 || '',
      extractedData.bullet_point_6 || ''
    ] as [string, string, string, string, string, string];
  }

  async function generateQuickLookHandler() {
    const prompt = 'Generate a new Quick Look for the article.';
    isGenerating = true;

    try {
      const result = await generateQuickLook(prompt, articleContent);
      if (result && result.extractedData) {
        bulletPoints = formatExtractedData(result.extractedData);
        displayedBulletPoints = getDisplayedBulletPoints(bulletPoints);
        article.update((current: Article) => ({
          ...current,
          quick_look: {
            bullet_points: bulletPoints
          }
        }));
      } else {
        console.error('Invalid result format:', result);
      }
    } catch (error) {
      console.error('Error generating Quick Look:', error);
    } finally {
      await patchArticle({ quick_look: { bullet_points: bulletPoints } });
      isGenerating = false;
    }
  }
</script>

<div class="quick-look-view">
  <span>Quick Look</span>
  <ul class="bullet-points">
    {#each displayedBulletPoints as bulletPoint, index}
      <li>
        <span class="bullet-dot"></span>
        <span class="{bulletPoint === '' ? 'empty-bullet' : ''}">{bulletPoint || `Bullet Point ${index + 1}`}</span>
      </li>
    {/each}
  </ul>
  <div class="generate-button">
    <GenerateButton on:click={generateQuickLookHandler} isDisabled={isGenerating} />
  </div>
</div>

<style>
  .quick-look-view {
    padding: 1em;
    border-radius: 1em;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    height: 100%;
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .bullet-points li {
    display: flex;
    align-items: flex-start;
    padding: 0.3em 0.5em;
    border: 1px solid transparent;
    border-radius: 0.5em;
    margin-left: 1em;
    margin-top: 0.3em;
    width: calc(100% - 1em);
    box-sizing: border-box;
  }

  .bullet-points li:first-child {
    margin-top: 0.5em;
  }

  .bullet-dot {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    background-color: black;
    border-radius: 50%;
    margin-right: 0.5em;
    flex-shrink: 0;
  }

  .empty-bullet {
    color: var(--gray-6);
  }

  .generate-button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    transition: opacity 0.3s ease-in-out;
  }
</style> -->
