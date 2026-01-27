import { cache } from 'react';

export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id?: string;
  author?: string;
  content: string;
  createdAt?: string;
  postId?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = cache(async (): Promise<Post[]> => {
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
});

export const getPost = cache(async (id: string): Promise<Post | null> => {
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
});

export const getRecentPosts = cache(async (limit: number = 3): Promise<Post[]> => {
  try {
    const posts = await getPosts();
    return posts
      .filter(post => post.createdAt)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
});

export const getCommentsByPostId = cache(async (postId: string): Promise<Comment[]> => {
  try {
    const urls = [
      `${API_URL}/posts/${postId}/comments`,
      `${API_URL}/comments?postId=${postId}`,
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          next: { revalidate: 30 },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) continue;

        const data = await response.json();
        if (Array.isArray(data)) {
          return data.sort(
            (a: Comment, b: Comment) =>
              new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );
        }
      } catch {
        continue;
      }
    }

    return [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
});

export const getRecentComments = cache(async (limit: number = 5): Promise<Comment[]> => {
  try {
    const url = `${API_URL}/comments`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch comments:', await response.text());
      return [];
    }

    const comments = await response.json();

    return comments
      .filter((comment: Comment) => comment.createdAt)
      .sort((a: Comment, b: Comment) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent comments:', error);
    return [];
  }
});
