import { MetadataRoute } from 'next';
import { getPosts as getGuestbookPosts } from '@/app/api/lib/get-post';
import { getPosts as getBlogPosts, getPostUrl } from '@/app/api/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://do-seung.com';
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/post`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const guestbookPosts = await getGuestbookPosts();
  const guestbookEntries: MetadataRoute.Sitemap = (guestbookPosts || []).map(p => ({
    url: `${baseUrl}/post/${p.id}`,
    lastModified: new Date(p.updatedAt || p.createdAt || now.toISOString()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const { posts: blogPosts } = await getBlogPosts({ pageSize: 50 });
  const blogEntries: MetadataRoute.Sitemap = (blogPosts || []).map(post => ({
    url: `${baseUrl}${getPostUrl(post.slug)}`,
    lastModified: new Date(post.date || now.toISOString()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...guestbookEntries];
}
