export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch posts:', await response.text());
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch post ${id}:`, await response.text());
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}
