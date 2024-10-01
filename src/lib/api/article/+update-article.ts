

export async function updateArticle(article_id: string, data: any) {
    if (!article_id || !data) {
      console.error('Article ID or Data is missing');
      return;
    }
  
    try {
      const response = await fetch('/api/data/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionName: 'articles', id: article_id, data: data }),
      });
  
      if (response.ok) {
        console.log('Article updated');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update article:', errorResponse);
      }
    } catch (err) {
      console.error('Error updating article:', err);
    }
  }
  