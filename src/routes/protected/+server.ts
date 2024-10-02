// src/routes/api/user/update-last-active/+server.ts

import { json } from '@sveltejs/kit';
import { userService } from '$lib/services/+user-service';

export async function POST({ request }: { request: Request }) {

  
  const { userId } = await request.json();

  if (!userId) {
    return json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch the user by ID
    const user = await userService.getOne(userId);

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's last_active field
    await userService.update(userId, {
      last_active: new Date()
    });

    return json({ success: true });
  } catch (error) {
    console.error('Error updating last active:', error);
    return json({ error: 'Failed to update last active' }, { status: 500 });
  }
}
