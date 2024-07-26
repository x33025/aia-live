import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/config/prisma';
import type { Keyword, Country, GetInfo } from '@prisma/client';

export type KeywordWithData = Keyword & {
  country: Country | null;
  get_info: GetInfo;
};

export const load: LayoutServerLoad = async ({ url }) => {
  const take = 20;
  const skip = Number(url.searchParams.get('skip')) || 0;

  try {
    const countries = await prisma.country.findMany();
    console.log('Fetched countries:', countries); // Log the countries array

    const keywords: KeywordWithData[] = await prisma.keyword.findMany({
      include: {
        country: true,
        get_info: true,
      },
      orderBy: {
        get_info: {
          date_created: 'desc',
        },
      },
      skip,
      take,
    });

    const total = await prisma.keyword.count();

    return {
      countries,
      keywords,
      total,
      skip,
      take,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
