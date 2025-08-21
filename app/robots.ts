export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://do-seung.com/sitemap.xml',
    host: 'https://do-seung.com',
  };
}
