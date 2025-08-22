export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
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

export async function getRecentPosts(limit: number = 3): Promise<Post[]> {
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
}

export async function getRecentComments(limit: number = 5): Promise<Comment[]> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL!;
    const url = `${base}/comments`;
    console.log('Fetching comments from:', url);

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      console.error('Failed to fetch comments:', await response.text());
      return [];
    }

    const comments = await response.json();
    console.log('Raw comments from API:', comments);

    const filteredComments = comments
      .filter((comment: Comment) => comment.createdAt)
      .sort((a: Comment, b: Comment) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);

    console.log('Filtered comments:', filteredComments);
    console.log('First comment postId:', filteredComments[0]?.postId);

    return filteredComments;
  } catch (error) {
    console.error('Error fetching recent comments:', error);
    return [];
  }
}
