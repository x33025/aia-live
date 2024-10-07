import type { LayoutServerLoad } from './$types';
import { articleService } from '$lib/services/+article-service';


export const load: LayoutServerLoad = async ( ) => {


  
  try {

    

 
    // Use the ArticleService to fetch articles with expanded relations
    const articles = await articleService.getList({
      expand: 'keywords,activity,main_keyword,main_image,notes.activity,author',
      sort: '-created',
      filter: 'activity.deleted=null'
      });

  

    if (!articles || articles.length === 0) {
      throw new Error("No articles returned");
    }

    // Return the fetched articles data including expanded keywords
    return {
      articles,
      title: "Articles",
    };
  } catch (error) {
    throw new Error('Failed to load data');
  }
};
