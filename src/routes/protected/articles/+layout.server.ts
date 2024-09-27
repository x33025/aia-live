import type { LayoutServerLoad } from './$types';
import { articleService } from '$lib/services/+article-service';
import type { Article } from '$lib/types';

const PAGE_SIZE = 20;

export const load: LayoutServerLoad = async ({ locals, url }) => {
  try {
    console.log('FETCH_DATA: Starting load function');
    
    // Fetching articles with expanded keywords
    const page = Number(url.searchParams.get('page')) || 1;
    console.log(`FETCH_DATA: Fetching articles page ${page} with page size ${PAGE_SIZE}`);
 
    // Use the ArticleService to fetch articles with expanded relations
    const articles = await articleService.getList({
      page,
      pageSize: PAGE_SIZE,
      expand: 'keywords,main_keyword,main_image,activity_data,notes',
      sort: '-created',
      fields: 'id,title,description,created,updated,main_image,main_keyword,keywords,activity_data,notes,word_count,target_word_count,category,author,raw_data,schedule'
    });

    console.log('Fetched Articles with Expanded Data:', articles);

    if (!articles || articles.length === 0) {
      console.error('FETCH_DATA: No articles found, throwing an error');
      throw new Error("No articles returned");
    }

    const totalArticles = articles.length; // You can customize this based on totalItems if available.

    // Return the fetched articles data including expanded keywords
    return {
      articles,
      totalArticles,
      page,
      title: "Articles",
    };
  } catch (error) {
    console.error('FETCH_DATA: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
