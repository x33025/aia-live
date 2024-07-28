// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/config/prisma';
import type { Country, Keyword } from '@prisma/client';

export const load: LayoutServerLoad = async ({ url }) => {
  const take = 20;
  const skip = Number(url.searchParams.get('skip')) || 0;

  try {
    // Fetch countries and keywords with related data
    const countries: Country[] = await prisma.country.findMany();
    const keywords: Keyword[] = await prisma.keyword.findMany({
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

    const total: number = await prisma.keyword.count();

    // Return data including countries and other details
    return {
      data: {
        countries,
        keywords,
        total,
        skip,
        take,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};
