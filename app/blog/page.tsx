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

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">블로그</h1>
        <Link
          href="/blog/edit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          새 글 작성
        </Link>
      </div>

      <ul className="mt-4 space-y-4">
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <li key={post.id} className="border p-4 rounded-lg hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 line-clamp-2 mt-2">{stripHtml(post.content)}</p>
              {post.createdAt && (
                <p className="text-sm text-gray-500 mt-2">{new Date(post.createdAt).toLocaleDateString('ko-KR')}</p>
              )}
              <Link href={`/blog/${post.id}`} className="text-blue-500 inline-flex items-center mt-2">
                더 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 p-4">게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
