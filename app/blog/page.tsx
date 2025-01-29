import { getNotionPages } from '@/app/api/lib/notion';
import Link from 'next/link';

interface NotionPage {
  id: string;
  title: string;
  description: string;
}

export default async function BlogPage() {
  const posts: NotionPage[] = await getNotionPages();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">블로그</h1>
      <ul className="mt-4 space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <Link href={`/blog/${post.id}`} className="text-blue-500">
              더 보기 →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
