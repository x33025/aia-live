import { json, error } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request }) => {
  try {
    const body = await request.json();
    console.log('UPDATE_KEYWORD: Incoming update request:', body);
    const { id, ...updatedFields } = body;

    if (!id) {
      console.error('UPDATE_KEYWORD: No ID provided in the request');
      throw error(400, 'Keyword ID is required');
    }

    console.log('UPDATE_KEYWORD: Updating keyword with ID:', id);
    console.log('UPDATE_KEYWORD: Updated fields:', updatedFields);

    // Filter out fields that are empty strings or null values
    const filteredFields = Object.entries(updatedFields)
      .filter(([key, value]) => value !== '' && value !== null) // Remove empty and null values
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    console.log('UPDATE_KEYWORD: Filtered updated fields:', filteredFields);

    if (Object.keys(filteredFields).length === 0) {
      console.error('UPDATE_KEYWORD: No valid fields to update');
      throw error(400, 'No valid fields provided for update');
    }

    console.log('UPDATE_KEYWORD: Attempting to fetch existing keyword');
    try {
      const existingKeyword = await pb.collection('keywords').getOne(id);
      console.log('UPDATE_KEYWORD: Existing keyword found:', existingKeyword);
    } catch (fetchError) {
      console.error('UPDATE_KEYWORD: Error fetching existing keyword:', fetchError);
      throw error(404, 'Keyword not found');
    }

    console.log('UPDATE_KEYWORD: Attempting to update keyword');
    const updatedKeyword = await pb.collection('keywords').update(id, filteredFields);
    console.log('UPDATE_KEYWORD: Keyword updated successfully:', updatedKeyword);
    
    return json({ success: true, data: updatedKeyword });
  } catch (err) {
    console.error('UPDATE_KEYWORD: Error updating keyword:', err);
    if (err.status === 404) {
      throw error(404, 'Keyword not found');
    }
    throw error(500, 'Failed to update keyword');
  }
};
