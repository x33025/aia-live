import { json, error } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';
import type { RequestHandler } from './$types';
import { SortOptions } from '$lib/types'; // Import your SortOptions enum

export const GET: RequestHandler = async ({ url }) => {
  try {
    const sortParam = url.searchParams.get('sort') || SortOptions.DateCreatedAsc;

    // Validate the sortParam by checking if it exists in SortOptions
    if (!Object.values(SortOptions).includes(sortParam as SortOptions)) {
      throw error(400, 'Invalid sort option');
    }

    // Fetch keywords from PocketBase, applying the sort
    const records = await pb.collection('keywords').getFullList({
      sort: sortParam as string, // PocketBase expects a string for sorting
    });

    return json(records);
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

    // Ensure the keyword exists
    await pb.collection('keywords').getOne(id);

    // Update the keyword
    const updatedKeyword = await pb.collection('keywords').update(id, filteredFields);
    
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
