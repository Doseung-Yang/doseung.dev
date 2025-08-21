import { MetadataRoute } from 'next';
import { getPosts } from '@/app/api/lib/get-post';

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
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const posts = await getPosts();
  const postEntries: MetadataRoute.Sitemap = (posts || []).map(p => ({
    url: `${baseUrl}/blog/${p.id}`,
    lastModified: new Date(p.updatedAt || p.createdAt || now.toISOString()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
