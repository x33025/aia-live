import { json, error } from '@sveltejs/kit';
import { keywordService } from '$lib/services/+keyword-service';
import type { RequestHandler } from './$types';
import { SortOptions } from '$lib/types'; // Import your SortOptions enum

export const GET: RequestHandler = async ({ url }) => {
  try {
    const sortParam = url.searchParams.get('sort') || SortOptions.DateCreatedAsc;

    // Validate the sortParam by checking if it exists in SortOptions
    if (!Object.values(SortOptions).includes(sortParam as SortOptions)) {
      throw error(400, 'Invalid sort option');
    }

    // Fetch keywords using keywordService, applying the sort
    const keywords = await keywordService.getList({
      page: 1, // Assuming you want the full list, set pagination to 1 and large pageSize
      pageSize: 1000, // Adjust pageSize for full list retrieval
      sort: sortParam as string, // PocketBase expects a string for sorting
    });

    return json(keywords.items); // Return the list of keywords
  } catch (err) {
    console.error('Error fetching keywords:', err);

    // Handle specific errors with status
    if (err instanceof Error && 'status' in err) {
      const statusErr = err as { status: number; message?: string };
      throw error(statusErr.status, statusErr.message || 'Error occurred');
    }

    throw error(500, 'Failed to fetch keywords');
  }
};

export const PATCH: RequestHandler = async ({ request }) => {
  try {
    const { id, ...updatedFields } = await request.json();

    if (!id) {
      throw error(400, 'Keyword ID is required');
    }

    // Log if a field is an empty string
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (value === '') {
        console.log(`Field ${key} is an empty string: ""`);
      }
    });

    // Filter out empty strings and retain nulls
    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, value]) => value !== '')
    );

    if (Object.keys(filteredFields).length === 0) {
      throw error(400, 'No valid fields provided for update');
    }

    // Ensure the keyword exists using keywordService
    await keywordService.getOne(id);

    // Update the keyword using keywordService
    const updatedKeyword = await keywordService.update(id, filteredFields);
    
    return json({ success: true, data: updatedKeyword });
  } catch (err) {
    console.error('Error updating keyword:', err);

    // Safely check if err is an object and contains a 'status' property
    if (typeof err === 'object' && err !== null && 'status' in err) {
      const errorWithStatus = err as { status: number; message?: string };
      throw error(errorWithStatus.status, errorWithStatus.message || 'Error occurred');
    }

    // Default error if no 'status' property is found
    throw error(500, 'Failed to update keyword');
  }
};
