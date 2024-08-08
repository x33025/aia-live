// src/routes/[article_id]/+page.server.ts
import type { PageServerLoad } from './$types';
import type { Article } from '$lib/utils/interfaces/+article';

interface LoadResult {
  article: Article | null;
}

export const load: PageServerLoad<LoadResult> = async ({ fetch, params }) => {
  const { id } = params;

  try {
    console.log(`Fetching article with id: ${id}`);

    // Fetch article details
    const articleResponse = await fetch(`http://localhost:3000/api/articles/${id}`);
    if (!articleResponse.ok) {
      throw new Error(`Failed to fetch article: ${articleResponse.statusText}`);
    }
    const article: Article = await articleResponse.json();
    console.log('Fetched article:', article);

    // Fetch raw data
    let raw_data: Record<string, any>[] = [];
    try {
      const rawDataResponse = await fetch(`http://localhost:3000/api/article/${id}/rawdata`);
      if (rawDataResponse.ok) {
        raw_data = await rawDataResponse.json(); // Get the full array of raw data
      } else if (rawDataResponse.status !== 404) {
        throw new Error(`Failed to fetch raw data: ${rawDataResponse.statusText}`);
      }
    } catch (rawDataError) {
      if (rawDataError instanceof Error && rawDataError.message.includes('Not Found')) {
        console.log('No raw data found for article:', id);
      } else {
        throw rawDataError;
      }
    }

    // Fetch prompts
    let prompts: any[] = [];
    try {
      const promptsResponse = await fetch(`http://localhost:3000/api/article/${id}/prompts`);
      if (promptsResponse.ok) {
        prompts = await promptsResponse.json();
      } else if (promptsResponse.status !== 404) {
        throw new Error(`Failed to fetch prompts: ${promptsResponse.statusText}`);
      }
    } catch (promptsError) {
      if (promptsError instanceof Error && promptsError.message.includes('Not Found')) {
        console.log('No prompts found for article:', id);
      } else {
        throw promptsError;
      }
    }

    return {
      article: { ...article, raw_data, prompts }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      article: null
    };
  }
};
