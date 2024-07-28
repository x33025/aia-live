import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/config/prisma';
import type { ArticleMetadata, GetInfo, Keyword, User, Category, Status } from '@prisma/client';

export const load: LayoutServerLoad = async ({ url }) => {
  const take = 20;
  const skip = Number(url.searchParams.get('skip')) || 0;

  try {
    console.log('Fetching articles with related data...');

    // Fetch articles with related data
    const articlesPromise = prisma.articleMetadata.findMany({
      include: {
        get_info: true,
        keywords: true,
      },
      orderBy: {
        get_info: {
          date_created: 'desc',
        },
      },
      skip,
      take,
    });

    // Fetch writers, categories, and statuses
    const writersPromise = prisma.user.findMany({
      where: {
        role: {
          name: 'Writer',
        },
      },
      include: {
        role: true,
      },
    });
    const categoriesPromise = prisma.category.findMany();
    const statusesPromise = prisma.status.findMany();

    const [articles, writers, categories, statuses] = await Promise.all([
      articlesPromise,
      writersPromise,
      categoriesPromise,
      statusesPromise,
    ]);

    console.log(`Fetched ${articles.length} articles`);
    console.log(`Fetched ${writers.length} writers`);
    console.log(`Fetched ${categories.length} categories`);
    console.log(`Fetched ${statuses.length} statuses`);

    const total: number = await prisma.articleMetadata.count();
    console.log(`Total number of articles: ${total}`);

    // Return data including articles and other details
    return {
      articles,
      writers,
      categories,
      statuses,
      total,
      skip,
      take,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
