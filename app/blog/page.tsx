import { getPosts, Post } from '@/app/api/lib/get-post';
import Link from 'next/link';

function stripHtml(html: string | undefined): string {
  if (!html) return '';

  let result = html.replace(/<[^>]+>/g, ' ');

  result = result
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/');

  return result.replace(/\s+/g, ' ').trim();
}
export const metadata = {
  title: '양도승 | 기술 블로그',
  description: '양도승 기술 블로그',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-6 text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">블로그</h1>
        <Link
          href="/blog/edit"
          className="bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
        >
          새 글 작성
        </Link>
      </div>

      <ul className="mt-4 space-y-4">
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <li
              key={post.id}
              className="border border-border bg-card text-card-foreground p-4 rounded-lg hover:shadow-md transition"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-muted-foreground line-clamp-2 mt-2">{stripHtml(post.content)}</p>
                {post.createdAt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                )}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-center text-muted-foreground p-4">게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
