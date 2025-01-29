import { getNotionPages } from '@/app/api/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BlogDetailPage({ params }: { params: { id?: string } }) {
  if (!params?.id) {
    notFound(); // params.id가 없으면 404 페이지로 이동
  }

  const posts = await getNotionPages();
  const post = posts.find(p => p.id === params.id);

  if (!post) {
    notFound(); // 페이지를 찾을 수 없으면 404 처리
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.description}</p>
      <Link href="/blog" className="mt-4 inline-block text-blue-500">
        ← 블로그 목록으로
      </Link>
    </div>
  );
}
