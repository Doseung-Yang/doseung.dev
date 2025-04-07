import EditDeleteButtons from '@/app/_components/blog/DeleteButton';
import { getPost } from '@/app/api/lib/get-post';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-10 px-6">
      <header className="mb-8">
        <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          블로그 목록으로
        </Link>
        <EditDeleteButtons postId={id} />
        <h1 className="text-4xl font-bold mt-6 mb-2">{post.title}</h1>

        <div className="flex items-center text-gray-500 text-sm">
          {post.createdAt && (
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </header>
      <div className="prose prose-lg max-w-none">
        {post.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: (() => {
                try {
                  return JSON.parse(post.content);
                } catch (_) {
                  return post.content;
                }
              })(),
            }}
          />
        ) : (
          <p>내용이 없습니다.</p>
        )}
      </div>

      <section className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6">댓글</h2>

        <div className="mb-10 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">댓글 작성</h3>
          <div className="mb-4">
            <input type="text" placeholder="이름 (선택사항)" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="댓글을 입력해주세요"
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">댓글 등록</button>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="mb-2">바람은 왱왱왱 마음은 잉잉잉</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>양관식</span>
              <time>2025년 4월 5일</time>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="mb-2">다같이 오는 소풍인줄 알았는데, 저마다 물때가 달랐다.</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>오애순</span>
              <time>2025년 4월 3일</time>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6">이런 글도 읽어보세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/blog/1" className="block p-4 border rounded-lg hover:shadow-md transition">
            <h3 className="font-medium text-lg mb-1 hover:text-blue-500">첫 번째 추천 게시글</h3>
            <p className="text-gray-600 text-sm">간략한 설명이 들어갑니다...</p>
          </Link>
          <Link href="/blog/2" className="block p-4 border rounded-lg hover:shadow-md transition">
            <h3 className="font-medium text-lg mb-1 hover:text-blue-500">두 번째 추천 게시글</h3>
            <p className="text-gray-600 text-sm">간략한 설명이 들어갑니다...</p>
          </Link>
        </div>
      </section>
    </article>
  );
}
