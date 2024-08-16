import { json, error } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';
import type { RequestHandler } from './$types';

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
