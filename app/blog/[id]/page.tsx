'use client';

import { usePathname } from 'next/navigation';
import { getNotionPages } from '@/app/api/lib/notion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  description: string;
}

export default function BlogDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const id = usePathname().split('/').pop();

  useEffect(() => {
    if (!id) return;

    (async () => {
      const posts = await getNotionPages();
      setPost(posts.find(p => p.id === id) || null);
    })();
  }, [id]);

  if (!post) {
    return <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.description}</p>
      <Link href="/blog" className="mt-4 inline-block text-blue-500 hover:underline">
        ← 블로그 목록으로
      </Link>
    </div>
  );
}
