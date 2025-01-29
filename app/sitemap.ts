import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://do-seung.com',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://do-seung.com/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://do-seung.com/blog',
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
