import type { LayoutServerLoad } from './$types';
import { articleService } from '$lib/services/+article-service';
import type { Article } from '$lib/types';


export const load: LayoutServerLoad = async () => {
  try {
    console.log('FETCH_DATA: Starting load function');
    

 
    // Use the ArticleService to fetch articles with expanded relations
    const articles = await articleService.getList({
      expand: 'keywords,main_keyword,main_image,notes.activity',
      sort: '-created',
      filter: 'activity.deleted=null'
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
      title: "Articles",
    };
  } catch (error) {
    console.error('FETCH_DATA: Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
