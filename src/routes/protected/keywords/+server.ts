import { prisma } from '$lib/server/config/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { id, keyword, volume, keyword_density, evergreen, countryId } = await request.json();

  // Create an object to hold the fields to be updated
  const updateData: any = {};
  if (keyword !== undefined) updateData.keyword = keyword;
  if (volume !== undefined) updateData.volume = volume;
  if (keyword_density !== undefined) updateData.keyword_density = keyword_density;
  if (evergreen !== undefined) updateData.evergreen = evergreen;

  if (countryId !== undefined) {
    updateData.country = countryId 
      ? { connect: { id: countryId } } 
      : { disconnect: true };
  }

  try {
    await prisma.keyword.update({
      where: { id },
      data: updateData,
    });
    return json({ success: true });
  } catch (error) {
    console.error('Error updating keyword:', error);
    return json({ success: false }, { status: 500 });
  }
};
