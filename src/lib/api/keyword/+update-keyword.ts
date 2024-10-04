

export async function updateKeyword(keyword_id: string, data: any) {
    if (!keyword_id || !data) {
      console.error('Keyword ID or Data is missing');
      return;
    }

    console.log("updateKeyword", keyword_id, data);
  
    try {
      const response = await fetch('/api/data/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collection: 'keywords', id: keyword_id, data: data }),
      });
  
      if (response.ok) {
        console.log('Keyword updated');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update keyword:', errorResponse);
      }
    } catch (err) {
      console.error('Error updating keyword:', err);
    }
  }
  