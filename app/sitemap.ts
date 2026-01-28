import { MetadataRoute } from 'next';
import { getPosts as getGuestbookPosts } from '@/app/api/lib/get-post';
import { getPosts as getBlogPosts, getPostUrl } from '@/app/api/lib/notion';
import { SITE_URL } from '@/app/constants/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/post`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const [guestbookPosts, { posts: blogPosts }] = await Promise.all([
    getGuestbookPosts(),
    getBlogPosts({ pageSize: 50 }),
  ]);

  const guestbookEntries: MetadataRoute.Sitemap = (guestbookPosts || []).map(p => ({
    url: `${SITE_URL}/post/${p.id}`,
    lastModified: new Date(p.updatedAt || p.createdAt || now.toISOString()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = (blogPosts || []).map(post => ({
    url: `${SITE_URL}${getPostUrl(post.slug)}`,
    lastModified: new Date(post.lastEditedTime || post.date || now.toISOString()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...guestbookEntries];
}
