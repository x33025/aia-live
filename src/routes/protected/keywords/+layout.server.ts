// import type { LayoutServerLoad } from './$types';
// import { prisma } from '$lib/server/config/prisma';
// import type { Country, Keyword } from '@prisma/client';

// export const load: LayoutServerLoad = async ({ url }) => {
//   const take = 20;
//   const skip = Number(url.searchParams.get('skip')) || 0;

//   try {
//     const [countries, keywords, total] = await Promise.all([
//       prisma.country.findMany(),
//       prisma.keyword.findMany({
//         include: {
//           country: true,
//           get_info: true,
//         },
//         orderBy: {
//           get_info: {
//             date_created: 'desc',
//           },
//         },
//         skip,
//         take,
//       }),
//       prisma.keyword.count(),
//     ]);

//     return {
//       countries,
//       keywords,
//       total,
//       skip,
//       take,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw new Error('Failed to load data');
//   }
// };
