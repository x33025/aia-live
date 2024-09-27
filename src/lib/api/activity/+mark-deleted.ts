

export async function markDeleted(id: string, user_id: string) {
    if (!id || !user_id) {
      console.error('Image ID or User ID is missing');
      return;
    }
  
    try {
      const response = await fetch('/api/data/mark-deleted', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, user_id: user_id }),
      });
  
      if (response.ok) {
        console.log('Image marked as deleted');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to delete image:', errorResponse);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  }
  