

export async function markDeleted(activity_id: string, user_id: string) {
    if (!activity_id || !user_id) {
      console.error('Activity ID or User ID is missing');
      return;
    }
  
    try {
      const response = await fetch('/api/data/mark-deleted', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity_id: activity_id, user_id: user_id }),
      });
  
      if (response.ok) {
        console.log('Activity marked as deleted');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to mark activity as deleted:', errorResponse);
      }
    } catch (err) {
      console.error('Error marking activity as deleted:', err);
    }
  }
  